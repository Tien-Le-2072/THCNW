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

// Get location current
const locationCurrent = document.getElementById("location_current");
//lấy vị trí & Tạo chấm đỏ trên map
locationCurrent.addEventListener("click", function () {
  navigator.geolocation.watchPosition(success, display);
  function success(pos) {
    const lat = pos.coords.latitude; // vĩ độ
    const lng = pos.coords.longitude; // kinh độ
    // const lat = 10.813955;
    // const lng = 106.678634;

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
          // lat: 10.813955,
          // long: 106.678634,
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
    lat: 10.811247,
    long: 106.690779,
    href: "https://maps.app.goo.gl/SZL8hCGFpaAg7ou1A",
  },
  {
    lat: 10.76918,
    long: 106.65218,
    href: "https://maps.app.goo.gl/L187fmKobFRaXCnQA",
  },
  {
    lat: 10.76918,
    long: 106.65218,
    href: "https://maps.app.goo.gl/B9e6gxPThKH8YxBz9",
  },
  {
    lat: 10.76918,
    long: 106.65218,
    href: "https://maps.app.goo.gl/X5m8qBu1pb6WnYKP6",
  },
  {
    lat: 10.76918,
    long: 106.65218,
    href: "https://www.facebook.com/",
  },
];

const render_list = list_history_fake.map(
  (location) => `
    <li>
     <a href="${location.href}" target="_blank">
     [${location.lat},${location.long}]
     </a>
    </li>
 `
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
