let footerDiv2 =
  '<p class="footer-text">This story is based on datasets from interviews with immigrants and <a href="https://missingmigrants.iom.int/downloads">Missing Migrants Project</a> by <a href="https://www.iom.int/">International Organization for Migration (IOM)</a>.</p>' +
  '<p class="footer-text"><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> | <a href="https://www.arch.columbia.edu/">Columbia GSAPP</a></p>';

  let divChapter10 =
  "<h3>DATASETS & METHODOLOGY </h3>" +
  "<p><b>What's included in the dataset?</b></p>" +
  "<p>The Missing Migrants Project meticulously tracks the deaths of migrants at the external borders of states or during their migration to international destinations, irrespective of their legal status. This project includes fatalities resulting from transportation accidents, shipwrecks, violent attacks, or medical complications that occur during migration. Additionally, it counts unidentified corpses found at border crossings, presumed to be migrants based on their belongings or death circumstances.</p>"+
  "<p><b>What's excluded in the dataset?</b></p>" +
  "<p>However, the project does not include deaths occurring in immigration detention facilities, post-deportation, or those loosely connected with migrants’ irregular status, such as deaths resulting from labor exploitation. Deaths in refugee camps, housing, or of internally displaced persons within their own country are also excluded.</p>"+
  "<p><b>What's the source of the dataset?</b></p>" +
  "<p>Data for this project are sourced from various channels including official records from coast guards and medical examiners, media reports, NGOs, and migrant interviews. In the Mediterranean, for example, data is relayed from national authorities to IOM, then to the Missing Migrants Project team. For the US/Mexico border, information is compiled from U.S. county medical examiners, coroners, and sheriff’s offices, supplemented by media reports for incidents on the Mexican side.</p>"+
  "<p><b>What are the challenges?</b></p>" +
  "<p>The challenge in collecting data on migrant fatalities lies in the nature of their travel - often via irregular means and through remote areas. This leads to delayed or non-discovery of bodies and underreporting of deaths. Additionally, fear of reporting among survivors, especially in instances involving criminal actors, further complicates data collection. It's also noted that data tends to over-represent regions with better media coverage and official reporting, leading to gaps in knowledge about migrant deaths in regions with high levels of irregular migration.</p>";


// to add 'driving' slides just make sure to add 'drive to beginning of slide id'
// you also need to add a running Order total to the end of each 'drive-slide', (ex. drive-slide-0, drive-slide-1, drive-slide-2, etc.)
var config2 = {
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
    footer: footerDiv,
    chapters: [
        {
            id: "onMap",
            mapVersion: "map2",
            alignment: "left",
            hidden: true,
            title: "",
            image: "",
            description: "",
            chapterDiv: divChapter9,
            location: {
              center: [-113.762966, 31.414477],
              zoom: 5,
              zoomSmall: 5,
              pitch: 0,
              bearing: 0,
            },
            mapAnimation: "flyTo",
            rotateAnimation: false,
            callback: "",
            onChapterEnter: [
              {
                layer: "imirgantData",
                opacity: 1,
                duration: 300,
              },
              {
                layer: "animatedLine",
                opacity: 0,
                duration: 300,
            },
            {
              layer: "secondAnimatedLine",
              opacity: 0,
              duration: 300,
          },
            ],
            onChapterExit: [
              {
                layer: "imirgantData",
                opacity: 1,
                duration: 300,
              },
              {
                layer: "animatedLine",
                opacity: 0,
                duration: 300,
            },
            {
              layer: "secondAnimatedLine",
              opacity: 0,
              duration: 300,
            }
            ],
          },
          {
            id: "onMap2",
            alignment: "left",
            hidden: false,
            title: "",
            image: "",
            description: "",
            chapterDiv: divChapter9,
            location: {
              center: [ -114.030856, 32.542391], 
              zoom: 6,
              zoomSmall: 5,
              pitch: 0,
              bearing: 0,
            },
            mapAnimation: "flyTo",
            rotateAnimation: false,
            callback: "",
            onChapterEnter: [
              {
                layer: "secondAnimatedLine",
                opacity: 0,
                duration: 300,
              },
              {
                layer: "imirgantData",
                opacity: 1,
                duration: 300,
              },
            ],
            onChapterExit: [
              {
                layer: "secondAnimatedLine",
                opacity: 0,
                duration: 300,
              },
              {
                layer: "animatedPoint",
                opacity: 0,
                duration: 300,
            },
            ],
          },
        //   {
        //     id: "onMap3",
        //     alignment: "full",
        //     hidden: false,
        //     title: "",
        //     image: "",
        //     description: "",
        //     chapterDiv: divChapter10,
        //     location: {
        //       center: [ -114.030856, 32.542391], 
        //       zoom: 6,
        //       zoomSmall: 5,
        //       pitch: 0,
        //       bearing: 0,
        //     },
        //     mapAnimation: "flyTo",
        //     rotateAnimation: false,
        //     callback: "",
        //     onChapterEnter: [
        //       {
        //         layer: "secondAnimatedLine",
        //         opacity: 0,
        //         duration: 300,
        //       },
        //       {
        //         layer: "imirgantData",
        //         opacity: 1,
        //         duration: 300,
        //       },
        //     ],
        //     onChapterExit: [
        //       {
        //         layer: "secondAnimatedLine",
        //         opacity: 0,
        //         duration: 300,
        //       },
        //       {
        //         layer: "animatedPoint",
        //         opacity: 0,
        //         duration: 300,
        //     },
        //     ],
        //   },
    ]
};
