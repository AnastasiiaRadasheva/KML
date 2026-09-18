var map = L.map('map').setView([59.4210, 24.7352], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap kaardistajad'
}).addTo(map);

L.control.scale({ metric: true, imperial: false }).addTo(map);

var kmlLayer = omnivore.kml('AnastasiiaRadashevakaart.kml')
    .on('ready', function () {
        map.fitBounds(kmlLayer.getBounds());
    })
    .addTo(map);

var kmlNahtav = true;
var nupp = L.control({ position: 'topright' });
nupp.onAdd = function () {
    var div = L.DomUtil.create('div', 'info-box');
    div.innerHTML = '<button id="toggle-btn">Peida/näita KML</button>';
    return div;
};
nupp.addTo(map);

document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'toggle-btn') {
        if (kmlNahtav) {
            map.removeLayer(kmlLayer);
        } else {
            map.addLayer(kmlLayer);
        }
        kmlNahtav = !kmlNahtav;
    }
});