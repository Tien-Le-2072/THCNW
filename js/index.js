//Tạo bản đồ
var map = L.map("map").setView([10.769189, 106.652139], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Show tọa độ vừa click trên bản đồ
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at:" + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

// var greenIcon = L.icon({
//   iconUrl: "https://static.thenounproject.com/png/218331-200.png",
//   //   shadowUrl: "leaf-shadow.png",

//   iconSize: [38, 95], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

// Get location current
const locationCurrent = document.getElementById("location_current");
//lấy vị trí & Tạo chấm đỏ trên map
locationCurrent.addEventListener("click", function () {
  navigator.geolocation.watchPosition(success, display);
  function success(pos) {
    const lat = pos.coords.latitude; // vĩ độ
    const lng = pos.coords.longitude; // kinh độ
    const accuracy = pos.coords.accuracy;
    let marker = L.marker([lat, lng]).addTo(map);
    let circle = L.circle([lat, lng], { radius: 100 }).addTo(map);
    console.log(lat, lng);
    map.fitBounds(circle.getBounds());
  }

  //Geolocation leaflet
  function display() {
    if (!navigator.geolocation) {
      console.log("Vui long cho phep truy cap vi tri");
    } else {
      console.log("Toa do cua nguoi dung");
      // Console log tọa độ
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        console.log(data);
      });
    }
  }
});
// navigator.geolocation.watchPosition(success, display);
// function success(pos) {
//   const lat = pos.coords.latitude; // vĩ độ
//   const lng = pos.coords.longitude; // kinh độ
//   const accuracy = pos.coords.accuracy;
//   let marker = L.marker([lat, lng]).addTo(map);
//   let circle = L.circle([lat, lng], { radius: 100 }).addTo(map);
//   map.fitBounds(circle.getBounds());
// }

// //Geolocation leaflet
// function display() {
//   if (!navigator.geolocation) {
//     console.log("Vui long cho phep truy cap vi tri");
//   } else {
//     console.log("Toa do cua nguoi dung");
//     // Console log tọa độ
//     navigator.geolocation.getCurrentPosition((position) => {
//       const data = {
//         lat: position.coords.latitude,
//         long: position.coords.longitude,
//       };
//       console.log(data);
//     });
//   }
// }

// lịch sử tọa độ của người dùng
const list_history_fake = [
  {
    lat: 10.76918,
    long: 106.65218,
  },
  {
    lat: 10.794867,
    long: 106.721768,
  },
  {
    lat: 10.76918,
    long: 106.65218,
  },
  {
    lat: 10.76918,
    long: 106.65218,
  },
  {
    lat: 10.76918,
    long: 106.65218,
  },
];
const render_list = list_history_fake.map(
  (location) => `<li>[${location.lat},${location.long}]</li>`
);

// Lấy btn history_location
const btn_history_location = document.getElementById("history_location");
const list_history = document.getElementById("list_history");

const ulElement = document.createElement("ul");
ulElement.innerHTML = render_list.join("");
let isHidden = true;

btn_history_location.addEventListener("click", function () {
  isHidden = !isHidden;
  if (isHidden) {
    list_history.classList.add("hidden");
  } else {
    list_history.classList.remove("hidden");
  }
  document.getElementById("center-id").appendChild(ulElement);
});
// map.on("moveend", function () {
//   // $(".center-id").html(lat_lng_to_string(map.getCenter()));
//   $(".center-id").html(lat_lng_to_string(map.getCenter()));
// });

// function lat_lng_to_string(ll) {
//   return "[" + ll.lat.toFixed(5) + "," + ll.lng.toFixed(5) + "]";
// }
