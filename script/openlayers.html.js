var kmlAllikas = new ol.source.Vector({
    url: 'AnastasiiaRadashevakaart.kml',
    format: new ol.format.KML()
});
var kmlKiht = new ol.layer.Vector({ source: kmlAllikas });

var osmKiht = new ol.layer.Tile({ source: new ol.source.OSM() });

var map = new ol.Map({
    target: 'map',
    layers: [osmKiht, kmlKiht],
    view: new ol.View({
        center: ol.proj.fromLonLat([24.7352, 59.4210]),
        zoom: 14
    })
});

kmlAllikas.once('featuresloadend', function () {
    map.getView().fit(kmlAllikas.getExtent(), { padding: [30, 30, 30, 30] });
});

map.addControl(new ol.control.ScaleLine());

var popupDiv = document.createElement('div');
popupDiv.className = 'info-box';
var popup = new ol.Overlay({ element: popupDiv });
map.addOverlay(popup);

map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (f) { return f; });
    if (feature) {
        popupDiv.innerHTML = feature.get('name') || 'Objekt';
        popup.setPosition(evt.coordinate);
    } else {
        popup.setPosition(undefined);
    }
});