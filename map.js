/* First, define what constitutes a small screen.
This will affect the zoom parameter for each chapter. */

var smallMedia = window.matchMedia("(max-width: 600px)").matches;

/* Next, create two variables that will hold:
1. The different types of layers available to Mapbox and their
respective opacity attributes.
2. The possible alignments which could be applied to the vignettes.*/


var layerTypes = {
    fill: ["fill-opacity"],
    line: ["line-opacity"],
    circle: ["circle-opacity", "circle-stroke-opacity"],
    symbol: ["icon-opacity", "text-opacity"],
    raster: ["raster-opacity"],
    heatmap: ["heatmap-opacity"],
  };

  var alignments = {
    left: "lefty",
    center: "centered",
    right: "righty",
    full: "fully",
  };

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function(prop) {
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}

// Main 'story', 'features' and 'header' elements
var story = document.getElementById("story");
var features = document.createElement("div");
var header = document.createElement("div");
features.setAttribute("id", "features");

// If the content exists, then assign it to the 'header' element
// Note how each one of these are assigning 'innerHTML'
if (config.topTitle) {
  var topTitle = document.createElement("div");
  topTitle.innerHTML = config.topTitle;
  header.appendChild(topTitle);
}
if (config.title) {
  var titleText = document.createElement("div");
  titleText.innerHTML = config.title;
  header.appendChild(titleText);
}
if (config.subtitle) {
  var subtitleText = document.createElement("div");
  subtitleText.innerHTML = config.subtitle;
  header.appendChild(subtitleText);
}
if (config.byline) {
  var bylineText = document.createElement("div");
  bylineText.innerHTML = config.byline;
  header.appendChild(bylineText);
}
if (config.description) {
  var descriptionText = document.createElement("div");
  descriptionText.innerHTML = config.description;
  header.appendChild(descriptionText);
}

// If after this, the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */

config.chapters.forEach((record, idx) => {
  /* These first two variables will hold each vignette, the chapter
    element will go in the container element */
  var container = document.createElement("div");
  var chapter = document.createElement("div");
  // Adds a class to the vignette
  // chapter.classList.add("br3");
  // Adds all the content to the vignette's div
  chapter.innerHTML = record.chapterDiv;
  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.classList.add("step");
  // If the chapter is the first one, set it to active
  if (idx === 0) {
    container.classList.add("active");
  }
  // Adds the overall theme to the chapter element
  chapter.classList.add(config.theme);
  /* Appends the chapter to the container element and the container element to the features element */
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || "centered");
  if (record.hidden) {
    container.classList.add("hidden");
  }
  features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

// commented this out and added in footer in just HTML because otherwise the second text-container appears below the footer
var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";

    return {
      url: url + suffix
    }
}

var map = new mapboxgl.Map({
    container: 'map', // 确保这里的容器ID与您页面上的元素ID匹配
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom || 3, // 默认值为3，如果没有定义
    bearing: config.chapters[0].location.bearing || 0, // 默认值为0，如果没有定义
    pitch: config.chapters[0].location.pitch || 0, // 默认值为0，如果没有定义
    interactive: false, // 根据需要调整
    transformRequest: transformRequest
});

var marker = new mapboxgl.Marker();
if (config.showMarkers) {
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();

function handleStepProgress(response) {
    let stepProgress;

    if (response.element.id.slice(0,5) === 'drive') {
        let driveSlideNum = parseInt(response.element.id.slice(-2));
        if (driveSlideNum === 0) {
            map.setLayoutProperty('animatedLine', 'visibility', 'visible');
            stepProgress = Math.round(response.progress*driveSmoothness);
        } else {
            stepProgress = Math.round(response.progress*driveSmoothness+driveSmoothness*driveSlideNum);
        }
        changeCenter(stepProgress);
    }
}

map.on("load", function() {

    let w = window.innerWidth;
    let initBounds = routeData.features[0].geometry.coordinates;

    if (followPoint === false) {
        var bounds = initBounds.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(initBounds[0], initBounds[0]));
         
        if (w >= 500) {
            map.fitBounds(bounds, {
                padding: {top: 150, bottom: 150, right: -100, left: 200},
                duration: 0
            });
        } else {
            map.fitBounds(bounds, {
                padding: 20,
                duration: 0
            });
        }
    } else {
        map.setZoom(followZoomLevel);
        map.setBearing(followBearing);
        map.setPitch(followPitch);
    }

    map.addSource('lineSource', {
        "type": "geojson",
        // turn off lineMetrics if not doing gradient colors
        lineMetrics: true,
        "data": geojsonPoint
    });
    
    map.addSource('secondLineSource', {
        "type": "geojson",
        lineMetrics: true,
        "data": "./data/route2.geojson"  
    });

    map.addSource('pointSource', {
        "type": "geojson",
        "data": geojsonPoint
    });

    map.addLayer({
        "id": "animatedLine",
        "type": "line",
        "source": "lineSource",
        'paint': {
        // for static color
            // 'line-color': 'red',
            'line-opacity': 1,
            'line-width': 1,
            'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'red',
            0.5,
            'red',
            1,
            'red',
            ]
       },
       'layout': {
        
       }
    });

    map.addLayer({
        "id": "secondAnimatedLine",
        "type": "line",
        "source": "secondLineSource",
        'paint': {
            // for static color
            'line-color': 'grey',
                'line-opacity': 1,
                'line-width': 1,
                'line-dasharray': [4, 1.5] 
           },
           'layout': {
            
           }
        });

    map.addLayer({
      "id": "animatedPoint",
      "type": "circle",
      "source": "pointSource",
      'paint': {
            'circle-radius': 3,
            'circle-opacity': 1,
            'circle-color': '#e83323'
      },
      'layout': {
    }
    });

    scroller.setup({
        step: '.step', // 确保这个类匹配您页面上的第一个地图的步骤
        offset: 0.75,
        progress: true
    })
    .onStepEnter(response => {
        // 只处理符合特定ID格式的章节
        if (response.element.id.startsWith('drive-slide')) {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.add('active');
            if (config.showMarkers) {
                marker.setLngLat(chapter.location.center);
            }
            if (chapter.onChapterEnter.length > 0) {
                chapter.onChapterEnter.forEach(setLayerOpacity);
            }
        }
    })
    .onStepExit(response => {
        // 同样，只处理符合特定ID格式的章节
        if (response.element.id.startsWith('drive-slide')) {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.remove('active');
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
        }
    })
    .onStepProgress(handleStepProgress); // 这里假设 handleStepProgress 已经定义
    
    // 假设 createLine 是定义好的函数
    createLine();
    
});

// setup resize event
window.addEventListener('resize', scroller.resize);

$(document).ready(function (){
    $.ajax({
      url:"./data/route.geojson",
      dataType: "json",
      success: function (data) {
        console.log('data', data.features[0]);
        routeData = data;
      },
      error: function () {
        console.log('error loading data');
      }
    });
});

var secondRouteData;

$.ajax({
    url: "./data/route2.geojson",
    dataType: "json",
    success: function(data) {
        secondRouteData = data;
        createLine(); // 确保在数据加载后调用 createLine
    },
    error: function(error) {
        console.error("Error loading second route data:", error);
    }
});



var WIDTH = window.innerWidth / 2
var HEIGHT = window.innerHeight

var translate = 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')'

var svg = d3.select("#sticky").append("svg")
	.attr('width', WIDTH)
	.attr('height', HEIGHT)

var currentScrollTop = d3.select('#currentScrollTop')

var panel = 0

var grid = 4
var columns = 20
var padding = 30
var marginTop = 50
var mt = window.innerWidth/6
var ml = window.innerHeight/3
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


///////////////////////////data processing functions
function countSomethingInData(dataset,columnToCount){
	var listOfSomethings = {}
	for(var d in dataset){
		var currentValue = dataset[d][columnToCount]
			if(Object.keys(listOfSomethings).indexOf(currentValue)==-1){
				listOfSomethings[currentValue]=1
			}else{
				listOfSomethings[currentValue]+=1
			}
	}
	//console.log(columnToCount,listOfSomethings)
	return listOfSomethings
}
function dataFormat(dataset){
//THIS TURNS INCIDENT COUNTS INTO PERSONS
	//console.log(dataset)
	var totalMissing = 0
	var totalDead = 0
	var dataByPerson = []
	for(var d in dataset){
		dead = +dataset[d]["Number of Dead"]
		missing = +dataset[d]["Number of Missing"]

		if(isNaN(missing)){missing = 0}
		if(isNaN(dead)){dead = 0}

		var personsInIncident = dead+missing
		//console.log(personsInIncident)

		for(var p =0; p<personsInIncident; p++){
			dataByPerson.push(dataset[d])
		}

		totalDead+=dead
		totalMissing+=missing
	}
	return dataByPerson
	//console.log(dataByPerson)
	console.log(totalMissing,totalDead)

}
function assignTypesToPersonsRandomly(individuals,assignments){
	//WE ARE RANDOMLY ASSIGNING EACH DOT A SET OF CHARACTERISTICS, AS A RESULT THEY CANNOT HAVE ROLLOVERS BECAUSE THEY ARE INACCURATE AS INDIVIDUALS. AS GROUPS THEY FUNCTION ACCURATELY
	//console.log(dataFormat)

	//SETUP A LIST OF INDIVIDUAL OBJECTS
	let individualObjects = []
	for(let i in individuals){
		individualObjects.push({"id":i})
	}
	//console.log(individualObjects)

	//GENERATES A INDIVIDUALS LIST ACCORDING TO EACH KIND OF GROUPING
	for(var a in assignments){
		let assignment = assignments[a]
		let groupType = assignment["groupType"]
		let groupData = assignment["data"]
		let assignmentIndividuals = []
		for(let group in groupData){
			let groupName = group
			let groupCount =groupData[group]
			//console.log(groupCount, groupName)
			for(let c=0;c< groupCount;c++){
				//console.log(group,c)
				let groupDict = {}
				groupDict[groupType]=group
				groupDict[groupType+"_index"]=c
				assignmentIndividuals.push(groupDict)

			}
		}
		//ADD GROUPINGS TOGETHER TO MAKE A MASTER LIST WHERE INDIVIDUALS EACH HAVE ORIGIN, CAUSE, ETC ASSIGNED
		for(let i in individuals){
			individualObjects[i][groupType]=assignmentIndividuals[i]
		}
	}
	console.log(individualObjects)
	return individualObjects
}
///////////////////////////end data processing functions



Promise.all([d3.csv("Missing_Migrants.csv")])
.then(function(data){
	var formattedData = dataFormat(data[0])//by person
	//drawDotsTest(formattedData)

	//shows summary statisticas of data either by incident or by persons
	//countSomethingInData(data[0],"Region of Incident")
	const regionOfIncidentCount = countSomethingInData(formattedData,"Region of Incident")
	const causeCount = countSomethingInData(formattedData,"Cause")
	const countryOfOrigin = countSomethingInData(formattedData,"Country of Origin")

//THIS IS COMBINING ALL THE DIFFERENT CATEGORY COUNTS TOGETHER IN AN ARRAY TO BE ASSEMBELED, NEW CATEGORIES NEED
	const assignments = [{"groupType":"region","data":regionOfIncidentCount}, {"groupType":"cause","data":causeCount},{"groupType":"origin","data":countryOfOrigin}]

	let emptyIndividualsList = Array.from(Array(formattedData.length).keys())
	const assignedIndividuals =assignTypesToPersonsRandomly(emptyIndividualsList,assignments)

function setup(){
    console.log("setup")
	//console.log(assignedIndividuals)
	//var data = {dead:{total:400,Guatemala:{total:200, unknown:100, drowning:100, vehicularAccident:100, harshEnvironment:100 },
	//Mexico:{total:200, unknown:100, drowning:100, vehicularAccident:100, harshEnvironment:100 }},
 //missing:{Guatemala:300}, {Mexico:200}, {UnitedStates:400}}

    svg.selectAll(".dot")
        .data(assignedIndividuals)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return Math.floor(i%250)*grid+grid
        })
        .attr("cy",function(d,i){
        	return Math.floor(i/250)*grid+grid
        })
		.attr("data",function(d,i){return d})
        .attr("r",0)
        .attr("class","dot")
				.style("fill", "rgb(168, 6, 6)")
}

setup()

function start(){
	//console.log(assignedIndividuals)
    console.log("start")
    d3.selectAll(".dot")
    .each(function(d,i){
        d3.select(this).transition().delay(Math.round(i/5))
        .attr("cx",function(d){
			let index =d.id
            return Math.floor(index%93)*grid+grid
        })
        .attr("cy",function(d){
			let index =d.id
        	return Math.floor(index/93)*grid+grid+marginTop
        })
        .attr("r",1.5)
        .attr("opacity",1)
    })

	svg.selectAll(".groupLabels").remove()
	svg.append("text")
			.attr("class","groupLabels")
			.text("Total number of dead and missing migrants in the Americas between 2014 to 2023")
			.attr("x",2)
			.attr("y",30)
			.attr("font-family", "Montserrat, sans-serif")
			.attr("font-weight", "400").style("font-size", "14px")

}
	start()

	function regions(){
	//	console.log("draw regions")
		var regions = Object.keys(regionOfIncidentCount)
	//	console.log(regions)

		svg.selectAll(".groupLabels").remove()
		svg.selectAll(".groupLabels")
		.data(regions)
		.enter()
		.append("text")
		.text(function(d){return d})
		.attr("class","groupLabels")
		.attr("y",30)
		.attr("x",function(d,i){return i*108 + 50})
		.attr("font-family", "Montserrat, sans-serif")
		.style("text-anchor", "middle") // Center the text relative to x position
    .attr("font-weight", "400")
		.style("font-size", "12px")

	    d3.selectAll(".dot")
	    .each(function(d,i){
	        d3.select(this).transition().delay(Math.round(i/5))
	        .attr("cx",function(d){
				//console.log(d)
				let region = d["region"]["region"]
				let regionGroupIndex = regions.indexOf(region)
				let index =d["region"]["region_index"]

				//each dot has a region, and its index within that region
				//each region has a index
				//console.log(region, regionGroup, index)

	             return Math.floor(index % 25) * grid + regionGroupIndex * 100 + grid * regionGroupIndex * 2 + 2;
	        })
	        .attr("cy",function(d){
				let index =d["region"]["region_index"]
	        	return Math.floor(index/25)*grid+grid+marginTop
	        })
	        .attr("opacity",1)
	    })

}

function origins() {
    // 首先排除 'unknown'
    // 首先排除 'unknown', 'Mixed', 和 'Mixed'/Unknown'
// 首先排除 'unknown', 'Mixed', 和 'Mixed/Unknown'
var filteredOrigins = Object.keys(countryOfOrigin)
    .filter(function(origin) {
        // 确保字符串准确无误
        return origin.toLowerCase() !== 'mixed' &&
               origin.toLowerCase() !== 'unknown' &&
               origin.toLowerCase() !== 'Mixed/Unknown'; // 注意字符串的准确性
    });



    // 然后排序并选择数量最多的前十个 origins
    var topOrigins = filteredOrigins
        .sort((a, b) => countryOfOrigin[b] - countryOfOrigin[a])
        .slice(0, 10);
		console.log("Top 10 Origins:", topOrigins);

    // 移除旧标签
    svg.selectAll(".groupLabels").remove();

    // 添加新标签
    svg.selectAll(".groupLabels")
        .data(topOrigins)
        .enter()
        .append("text")
        .text(function(d) { return d; })
        .attr("class", "groupLabels")
        .attr("y", 30)
        .attr("x", function(d, i) { return i * 58 +20; }) // 标签的定位
        .attr("font-family", "Montserrat, sans-serif")
        .style("text-anchor", "middle")
        .attr("font-weight", "400")
        .style("font-size", "10px");

    // 调整点的位置
    d3.selectAll(".dot")
        .each(function(d, i) {
            let origin = d["origin"]["origin"];
            if (topOrigins.includes(origin)) {
                let originGroupIndex = topOrigins.indexOf(origin);
                d3.select(this).transition().delay(Math.round(i / 5))
                    .attr("cx", function(d) {
                        let index = d["origin"]["origin_index"];
                        return Math.floor(index % 10) * grid + originGroupIndex * 50 + grid * originGroupIndex * 2 + 2;
                    })
                    .attr("cy", function(d) {
                        let index = d["origin"]["origin_index"];
                        return Math.floor(index / 25) * grid + grid + marginTop;
                    })
                    .attr("opacity", 1);
            } else {
                d3.select(this).remove(); // 移除不在前十的点
            }
        });
}


	function causes(){
		console.log("draw causes")
		var causes = Object.keys(causeCount)

		svg.selectAll(".groupLabels").remove();

		svg.selectAll(".groupLabels")
		    .data(causes)
		    .enter()
		    .append("text")
		    .attr("class", "groupLabels")
		    .attr("y", 30)
		    .attr("x", function(d, i) {
		        return i * 90 +38;
		    })
		    .attr("font-family", "Montserrat, sans-serif")
		    .attr("font-weight", "400")
            .style("text-anchor", "middle")
		    .style("font-size", "12px")
		    .each(function(d, i) {
		        // Wrap the text using tspans
		        const text = d3.select(this);
		        const words = d.split(/\s+/).reverse(); // Split words and reverse for proper order
		        const lineHeight = 1.1; // Adjust as needed
		        const x = text.attr("x");
		        const y = text.attr("y");
		        let dy = 0; // Initial offset

		        while (word = words.pop()) {
		            text.append("tspan")
		                .attr("x", x)
		                .attr("y", y)
		                .attr("dy", dy + "em")
		                .text(word);

		            dy += lineHeight;
		        }
		    });


	    d3.selectAll(".dot")
	    .each(function(d,i){
	        d3.select(this).transition().delay(Math.round(i/5))
	        .attr("cx",function(d){
				//console.log(d)
				let cause = d["cause"]["cause"]
				let causeGroupIndex = causes.indexOf(cause)
				let index =d["cause"]["cause_index"]

				//each dot has a region, and its index within that region
				//each region has a index
				//console.log(region, regionGroup, index)

	            return Math.floor(index%20)*grid+causeGroupIndex*90+2
	        })
	        .attr("cy",function(d){
				let index =d["cause"]["cause_index"]
	        	return Math.floor(index/20)*grid+grid+marginTop
	        })
	        .attr("opacity",1)
	    })

}

//THIS DETERMINES ORDER OF SORTING
var panels =[setup,start,regions,causes,origins]


var body = d3.select('body').node()
var container = d3.select('#container')
var content = d3.select('#content')

var SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT


var scrollTop = 0
var newScrollTop = 0

	container
	.on("scroll.scroller", function() {
  	newScrollTop = container.node().scrollTop
    });

var setDimensions = function() {
    WIDTH = window.innerWidth / 2
    HEIGHT = window.innerHeight
    SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT

}

var render = function() {
  if (scrollTop !== newScrollTop) {
    scrollTop = newScrollTop
      var panelSize = window.innerHeight
      var panelNumber = Math.round(scrollTop/panelSize)
      if(panel!=panelNumber){
          console.log(panelNumber)
          panel = panelNumber
          panels[panel]()
      }
    currentScrollTop.text(scrollTop)
  }
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
window.onresize = setDimensions

})

window.addEventListener('scroll', function() {
  var stickyDiv = document.getElementById('sticky');
  var newDots = document.getElementById('newDots');
  var windowHeight = window.innerHeight;

  if (window.scrollY > windowHeight) { // 举例：当滚动超过一屏幕高度时
      stickyDiv.classList.add('active');
      
  } else {
      stickyDiv.classList.remove('active');
     
  }
});




var map2 = new mapboxgl.Map({
    container: "map2",
    center: config2.chapters[0].location.center,
    zoom: config2.chapters[0].location.zoom || 3, 
    bearing: config2.chapters[0].location.bearing,
    pitch: config2.chapters[0].location.pitch,
    interactive: false,
    transformRequest: transformRequest,
  });


map.on("load", function() {

    let w = window.innerWidth;
    let initBounds = routeData.features[0].geometry.coordinates;

    if (followPoint === false) {
        var bounds = initBounds.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(initBounds[0], initBounds[0]));
         
        if (w >= 500) {
            map.fitBounds(bounds, {
                padding: {top: 150, bottom: 150, right: -100, left: 200},
                duration: 0
            });
        } else {
            map.fitBounds(bounds, {
                padding: 20,
                duration: 0
            });
        }
    } else {
        map.setZoom(followZoomLevel);
        map.setBearing(followBearing);
        map.setPitch(followPitch);
    }

    map.addLayer({
      id: "imirgantData",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/immigrant.geojson",
      },
      paint: {
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "Number of Dead"],
          0,
          "#e09b94",
          3,
          "#e2867e",
          11,
          "#e4786f",
          28,
          "#e56357",
          56,
          "#e74c3f",
          123,
          "#a90507",
        ],
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["get", "Number of Dead"],
          0,
          1.5, // 最小半径
          123,
          6, // 最大半径
        ],
        "circle-opacity": 0.7, // 透明度
      },
    filter: ['!=', ['get', 'Number of Dead'], null] // 过滤掉 "Number of Dead" 为 null 的要素
    });
})




// 获取故事2的容器
var story2 = document.getElementById("story2");
var features2 = document.createElement("div");
var header2 = document.createElement("div");
features2.setAttribute("id", "features2");


// 循环遍历章节并添加到故事2
config2.chapters.forEach((record, idx) => {
    var container2 = document.createElement("div");
    var chapter2 = document.createElement("div");
    chapter2.innerHTML = record.chapterDiv;
    container2.setAttribute("id", record.id);
    container2.classList.add("step");
    if (idx === 0) {
        container2.classList.add("active");
    }
    chapter2.classList.add(config2.theme);
    container2.appendChild(chapter2);
    container2.classList.add(alignments[record.alignment] || "centered");
    if (record.hidden) {
        container2.classList.add("hidden");
    }
    features2.appendChild(container2);
});

// 添加章节到故事2
story2.appendChild(features2);

// 添加 footer 到故事2
var footer2 = document.createElement("div");
if (config2.footer) {
    var footerText2 = document.createElement("p");
    footerText2.innerHTML = config2.footer;
    footer2.appendChild(footerText2);
}
if (footer2.innerText.length > 0) {
    footer2.classList.add(config2.theme);
    footer2.setAttribute("id", "footer2");
    story2.appendChild(footer2);
}

var scroller2 = scrollama();
scroller2.setup({
    step: '.step', 
    offset: 0.75,
    progress: true
})
.onStepEnter(response => {
    console.log("Entering step:", response.element.id);
    if (!response.element.id.startsWith('drive-slide')) {
        var chapter = config2.chapters.find(chap => chap.id === response.element.id);
        console.log("Chapter data:", chapter); 
        response.element.classList.add('active');
        // 这里是处理 map2 的逻辑
        map2.flyTo({
            center: chapter.location.center,
            zoom: chapter.location.zoom,
            bearing: chapter.location.bearing,
            pitch: chapter.location.pitch
        });
        // 如果有章节进入时的其他操作
        if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }
    }
})
.onStepExit(response => {
    console.log("Exiting step:", response.element.id);
    if (!response.element.id.startsWith('drive-slide')) {
        var chapter = config2.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        // 如果有章节退出时的其他操作
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    }
});

// 设置窗口大小调整事件
window.addEventListener('resize', scroller2.resize);
