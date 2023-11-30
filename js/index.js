//Tạo bản đồ
var map = L.map('map').setView([10.822133, 106.628400], 13 );
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 17,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//lấy vị trí & Tạo chấm đỏ trên map
navigator.geolocation.watchPosition(success,display);
function success(pos) {
    
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    let marker= L.marker([lat, lng]).addTo(map);
    let circle= L.circle([lat, lng], {radius: 100}).addTo(map);

    map.fitBounds(circle.getBounds());
}

//Geolocation leaflet
function display (){
    if(!navigator.geolocation) {
        console.log('Vui long cho phep truy cap vi tri');
    } else {
        console.log('Toa do cua nguoi dung');
        // Console log tọa độ
        navigator.geolocation.getCurrentPosition(position => {
            const data = {
                lat : position.coords.latitude,
                long : position.coords.longitude
            }
            console.log(data);
        })
    }
}
display();

// lịch sử tọa độ của người dùng

map.on('moveend', function () {
    $('.center-id').html(lat_lng_to_string(map.getCenter()));
})


function lat_lng_to_string(ll) {
    return "["+ll.lat.toFixed(5)+","+ll.lng.toFixed(5)+"]";
}