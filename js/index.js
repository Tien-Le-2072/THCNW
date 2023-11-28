//Tạo bản đồ
var map = L.map('map').setView([10.822133, 106.628400], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//lấy vị trí & Tạo chấm đỏ trên map
navigator.geolocation.watchPosition(success,display);
function success(pos) {
    
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    let marker= L.marker([lat, lng]).addTo(map);
    let circle= L.circle([lat, lng], {radius: accuracy}).addTo(map);

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
