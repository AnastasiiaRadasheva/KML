// Tasuta konto: https://cesium.com/ion/tokens -> Default Access Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Im9TSEFHS1EyTlFhOWVCOHgiLCJqdGkiOiIwZWEzMGEzNS03N2ZlLTQzOWItOWI2YS0yYjZkYzViZGEzMzEiLCJpZCI6NTA0MzY1LCJzdWIiOiJBbmFzdGFzaWlhUmFkYXNoZXZhIiwiaXNzIjoiaHR0cHM6Ly9hcGkuY2VzaXVtLmNvbSIsImF1ZCI6IlVudGl0bGVkIiwiaWF0IjoxNzkwMDY0MDcwfQ.iT601O8uMUNq--zYzk_RsbqMxPksDPB77dOri3napqA';
var viewer;
var kmlDataSource;
var buildingTileset;
var kmlNahtav = true;

async function init() {
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain(),
        baseLayerPicker: false
    });

    buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);

    kmlDataSource = await Cesium.KmlDataSource.load('AnastasiiaRadashevakaart.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas
    });
    viewer.dataSources.add(kmlDataSource);
    viewer.zoomTo(kmlDataSource);
}

init();

// Nupp 1 — ainult KML kihti
document.getElementById('toggle-btn').addEventListener('click', function () {
    if (!kmlDataSource) return;
    if (kmlNahtav) {
        viewer.dataSources.remove(kmlDataSource, false);
    } else {
        viewer.dataSources.add(kmlDataSource);
    }
    kmlNahtav = !kmlNahtav;
});

// Nupp 2 — ainult 3D hooneid
document.getElementById('toggle-buildings-btn').addEventListener('click', function () {
    if (!buildingTileset) return;
    buildingTileset.show = !buildingTileset.show;
});