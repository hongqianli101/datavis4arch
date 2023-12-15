var routeData = [];


var geojsonPoint = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
        
            ]
        }
    }]
};

var secondGeojsonPoint = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    }]
};

function createLine() {

    // get the coordinates of the line you want to highlight
    let extentArray = routeData.features[0].geometry.coordinates;
    
    // create a turf linestring based on the line coordinates
    const line = turf.lineString(extentArray);

    // calculate the total length of the line
    const lineDistance = turf.lineDistance(line);

    // how many points you want along the path (more = smoother animation)
    const rects = driveTime;

    // calculate the distance between each point on the path
    const segments = lineDistance / rects;

    // what units do you want to use?
    const units = 'kilometers';

    // based on the number of points...
    for(let i = 0; i <= rects; i++) {

        // calculate point location for each segment
        const pointonline = turf.along(line, (segments * i));

        // push new x,y
        let newX = pointonline.geometry.coordinates[0];
        let newY = pointonline.geometry.coordinates[1];

        geojsonPoint.features[0].geometry.coordinates.push([newX, newY]);

        // draw our initinal point
        if (i === 0) {
            let initPoint = turf.point([newX, newY]);

            // if you want to follow the point...
            if (followPoint === true) {
            	map.setCenter([newX, newY]);
        	}

            map.getSource('pointSource').setData(initPoint);
        }

        // once 'i' equals the number of points then we're done building our line 
        if (i == rects) {
            map.getSource('lineSource').setData(geojsonPoint);
        }
    }
    let secondExtentArray = secondRouteData.features[0].geometry.coordinates;
    const secondLine = turf.lineString(secondExtentArray);
    const secondLineDistance = turf.lineDistance(secondLine);
    const secondSegments = secondLineDistance / rects;

    for(let i = 0; i <= rects; i++) {
        const secondPointOnLine = turf.along(secondLine, (secondSegments * i));
        let newX = secondPointOnLine.geometry.coordinates[0];
        let newY = secondPointOnLine.geometry.coordinates[1];
        secondGeojsonPoint.features[0].geometry.coordinates.push([newX, newY]);
    }

    map.getSource('secondLineSource').setData(secondGeojsonPoint);

}

function changeCenter(index) {
    let subsampleIndex = 100;
    let firstLineLength = geojsonPoint.features[0].geometry.coordinates.length;

    // 第一条线路的处理
    if (index < firstLineLength) {
        let currentJson = geojsonPoint.features[0].geometry.coordinates.slice(0, index + 1);
        let movingLine = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": currentJson
                }
            }]
        };
        map.getSource('lineSource').setData(movingLine);

        // 更新跟随点的位置
        let movingPointCoordinates = geojsonPoint.features[0].geometry.coordinates[index];
        let movingPoint = turf.point([movingPointCoordinates[0], movingPointCoordinates[1]]);
        map.getSource('pointSource').setData(movingPoint);
    }

    // 第二条线路的处理（仅当第一条线路动画完成后开始）
    if (index >= firstLineLength) {
        let secondLineSpeedFactor = 3; 
        let secondLineIndex = Math.min((index - firstLineLength) * secondLineSpeedFactor, secondGeojsonPoint.features[0].geometry.coordinates.length - 1);
        let secondCurrentJson = secondGeojsonPoint.features[0].geometry.coordinates.slice(0, secondLineIndex + 1);
        let secondMovingLine = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": secondCurrentJson
                }
            }]
        };
        map.getSource('secondLineSource').setData(secondMovingLine);
    }

    // 跟随点的逻辑
    if (followPoint === true && index % subsampleIndex == 0) {
        let center = geojsonPoint.features[0].geometry.coordinates[Math.min(index, firstLineLength - 1)];
        map.jumpTo({ center: [center[0], center[1]] });
    }
}
