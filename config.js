let topTitleDiv = "<h4>Data Visualization for Architecture, Urbanism and the Humanities</h4>";

let titleDiv =
  "<h1>illegal immigration and the cost of human lives</h1>";

let bylineDiv = "<p>By Mengyao Chen, Swezya Joshi, Hongqian Li</p>";

let descriptionDiv =
  '<p>This data visualization project focuses on the issue of missing and deceased immigrants across the American continent. Initiated with a series of interviews with immigrants and reinforced with datasets from <a href="https://missingmigrants.iom.int/downloads">Missing Migrants Project</a> by <a href="https://www.iom.int/">International Organization for Migration (IOM)</a>, our work aims to provide a clear and impactful representation of their journeys.</p>' +
  "<p>By visualizing the routes taken, the causes of death, and the locations where these tragedies occurred, we hope to offer a deeper understanding of the immigrants' experiences, bring to life the stories of those who embarked on these perilous journeys, and seek to elevate public awareness and stimulate discussion around this critical issue.</p>"+
  "<p> Our goal is to foster a sense of empathy and urgency, encouraging actions that address and mitigate these tragic losses.</p>" +
  '<img src="./eye.gif" height="160" alt="tear" style="display: block; padding-top: 80px; margin-left: auto; margin-right: auto;">'
  '<p style="text-align:center">Scroll to continue<br>▼</p>';

let footerDiv =
"<h3>DATASETS & METHODOLOGY </h3>" +
'<p>This story is based on datasets from interviews with immigrants and <a href="https://missingmigrants.iom.int/downloads">Missing Migrants Project</a> by <a href="https://www.iom.int/">International Organization for Migration (IOM)</a>.</p>'+
  "<p><b>What's included in the dataset?</b></p>" +
  "<p>The Missing Migrants Project meticulously tracks the deaths of migrants at the external borders of states or during their migration to international destinations, irrespective of their legal status. This project includes fatalities resulting from transportation accidents, shipwrecks, violent attacks, or medical complications that occur during migration. Additionally, it counts unidentified corpses found at border crossings, presumed to be migrants based on their belongings or death circumstances.</p>"+
  "<p><b>What's excluded in the dataset?</b></p>" +
  "<p>However, the project does not include deaths occurring in immigration detention facilities, post-deportation, or those loosely connected with migrants' irregular status, such as deaths resulting from labor exploitation. Deaths in refugee camps, housing, or of internally displaced persons within their own country are also excluded.</p>"+
  "<p><b>What's the source of the dataset?</b></p>" +
  "<p>Data for this project are sourced from various channels including official records from coast guards and medical examiners, media reports, NGOs, and migrant interviews. In the Mediterranean, for example, data is relayed from national authorities to IOM, then to the Missing Migrants Project team. For the US/Mexico border, information is compiled from U.S. county medical examiners, coroners, and sheriff's offices, supplemented by media reports for incidents on the Mexican side.</p>"+
  "<p><b>What are the challenges?</b></p>" +
  "<p>The challenge in collecting data on migrant fatalities lies in the nature of their travel - often via irregular means and through remote areas. This leads to delayed or non-discovery of bodies and underreporting of deaths. Additionally, fear of reporting among survivors, especially in instances involving criminal actors, further complicates data collection. It's also noted that data tends to over-represent regions with better media coverage and official reporting, leading to gaps in knowledge about migrant deaths in regions with high levels of irregular migration.</p>"+
  '<p><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> | <a href="https://www.arch.columbia.edu/">Columbia GSAPP</a></p>';

  let divChapter1 =
  "<h3>Hangzhou --> Shanghai --> Hong Kong</h3>" +
  "<p>They started from the city of Hangzhou in China, took a train to Shanghai, then took a flight to Hong Kong</p>";

  let divChapter2 =
  "<h3>Hong Kong --> Istanbul</h3>" +
  "<p>They left the country through an international flight from Hong Kong</p>";

let divChapter3 =
"<h3>Istanbul --> Quito</h3>" +
"<p>From Istanbul, they took an international flight and arrived in Quito.</p>"+
'<img width="200" height="360" src="data/video_photo/1Transfer from Istanbul to Quito.jpg" style="display: block; margin: auto;">' +
"<h3>Quito --> Colombia</h3>" +
"<p>A bus ride from Quito, Ecuador brought them to Colombia</p>"+
'<div style="display: flex; justify-content: center;"><video width="200" height="360" controls style="margin: 5px;"><source src="data/video_photo/2EcuadorTake the bus to Colombia.mp4" type="video/mp4"></video></div>';

let divChapter4 =
"<h3>Panama Rainforest</h3>" +
"<p>After a boat ride from Nekore into the Panama Rainforest, they camped in the rainforest for the next couple days</p>"+
'<div style="display: flex; justify-content: center;"><video width="200" height="360" controls style="margin: 5px;"><source src="data/video_photo/4Take a boat from Nekore to the Panama border and enter the tropical rainforest.mp4" type="video/mp4"></video></div>';


let divChapter5 =
"<h3>Panama --> Mexico</h3>" +
"<p>They eventually made their way to Mexico City after rafting through the dangerous currents along the Guatemala-Mexico border and taking a motorboat from Tapachula to Oaxaca.</p>"+
'<div style="display: flex; justify-content: center;"><video width="200" height="360" controls style="margin: 5px;"><source src="data/video_photo/22Rafting on the Guatemalan border to Mexico.mp4" type="video/mp4"></video></div>';


let divChapter6=
"<h3>US-Mexico Border</h3>" +
"<p>Once they arrived at Tijuana, they crossed the border wall and made it to San Diego, California.</p>"+
'<div style="display: flex; justify-content: center;"><video width="200" height="360" controls style="margin: 5px;"><source src="data/video_photo/26Border wall visible at Tijuana airport.mp4" type="video/mp4"></video></div>';

let divChapter7=
"<h3>San Diego --> New York</h3>" +
"<p>The family reunited in New York and currently live in Mexico, but few migrants who accompanied them along their journey did not make it to their final destination.</p>";

let divChapter8=
"<h3>The Story of a father and his two children</h3>" +
"<p>This route map is about a story of a father, driven by the fear of political persecution, embarked on a lengthy and perilous journey with his two children to reunite with their mother in the United States. </p>";

let divChapter9=
"<h3>Geolocation of deaths& missing</h3>"+
"<p>A significant number of missing and death cases among migrants have been recorded along the US-Mexico Border. While a large proportion of these incidents occur near Arizona, it's notable that Texas reports a higher number of deaths per case. This alarming trend underscores the extreme dangers faced by individuals in these areas during their attempts to cross the border.</p>"+
'<p>The number of death</p>'+
            '<div id="legend"><span style="background-color: #e74c3f"></span>57-123</div>'+
            '<div id="legend"><span style="background-color: #e56357"></span>29-56</div>'+
            '<div id="legend"><span style="background-color: #e4786f"></span>12-28</div>'+
            '<div id="legend"><span style="background-color: #e2867e"></span>4-11</div>'+
            '<div id="legend"><span style="background-color: #e09b94"></span>0-3</div>';

// Number of slides that will drive (more = smoother)
// If this doesn't match the number of slides named 'drive-slide' in config below you will not complete the full journey
var driveSlides = 10;

// Number of points on drive route (more = higher quality, but slower to process)
var driveSmoothness = 500;

// Value used to drive
var driveTime = driveSlides*driveSmoothness;

// Do you want to follow the point? True = follow
var followPoint = true;

// ...If so, what zoom, pitch, and bearing should be used to follow?
var followZoomLevel = 3;
var followBearing = 0;
var followPitch = 0;

// to add 'driving' slides just make sure to add 'drive to beginning of slide id'
// you also need to add a running Order total to the end of each 'drive-slide', (ex. drive-slide-0, drive-slide-1, drive-slide-2, etc.)
var config = {
    style: 'mapbox://styles/hongqianli/clo4nrj0n00gg01ozcart4qaf',
    accessToken: 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg',
    showMarkers: false,
    theme: 'light',
    alignment: 'left',
    showMarkers: false,
    markerColor: "#3FB1CE",
    theme: "light",
    use3dTerrain: false,
    topTitle: topTitleDiv,
    title: titleDiv,
    subtitle: "",
    byline: bylineDiv,
    description: descriptionDiv,
    // footer: footerDiv,
    chapters: [
        {
            id: 'drive-slide-00',
            alignment: "left",
            hidden: false,
            mapVersion: "map",
            title: '',
            chapterDiv: divChapter8,
            description: '',
                location: { },
                onChapterEnter: [],
                onChapterExit: [
                  {
                    layer: "imirgantData",
                    opacity: 0,
                    duration: 300,
                },
                ]
        },
        {
            id: 'drive-slide-01',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            description: '',
            chapterDiv: divChapter1,
            location: {
            },
            onChapterEnter: [{
                layer: "secondAnimatedLine",
                opacity: 0,
                duration: 300,
            },],
            onChapterExit: []
        },
        {
            id: 'drive-slide-02',
            title: '',
            hidden: true,
            mapVersion: "map",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-03',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            chapterDiv: divChapter2,
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-04',
            title: '',
            hidden: true,
            mapVersion: "map",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-05',
            title: '',
            hidden: true,
            mapVersion: "map",
            alignment: "left",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-06',
            title: '',
            hidden: true,
            mapVersion: "map",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-07',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            chapterDiv: divChapter3,
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-08',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            chapterDiv: divChapter4,
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-09',
            title: '',
            hidden: false,
            mapVersion: "map",
            description: '',
            alignment: "left",
            chapterDiv: divChapter5,
            location: {},
            onChapterEnter: [],
            onChapterExit: [{
                layer: "secondAnimatedLine",
                opacity: 1,
                duration: 300,
            },]
        },
        {
            id: 'drive-slide-10',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            chapterDiv: divChapter6,
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-11',
            title: '',
            hidden: false,
            mapVersion: "map",
            alignment: "left",
            chapterDiv: divChapter7,
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-12',
            title: '',
            hidden: true,
            mapVersion: "map",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-13',
            title: '',
            hidden: true,
            mapVersion: "map",
            description: '',
            location: {},
            onChapterEnter: [],
            onChapterExit: [
              {
                layer: "imirgantData",
                opacity: 0,
                duration: 300,
            },
            ]
        },
    ]
};
