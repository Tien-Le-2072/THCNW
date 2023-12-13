//Tạo bản đồ
var map = L.map("map").setView([10.7921636, 106.6506489], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Random 5 vị trí
var randomLocationCheckbox = document.getElementById("randomLocation");
var nearbyPoints = [];

randomLocationCheckbox.addEventListener("change", function () {
  if (this.checked) {
    var lat = sessionStorage.getItem("lat").toString();
    var lng = sessionStorage.getItem("lng").toString();

    if (lat && lng === "") return alert("Bạn chưa set vị trí hiện tại");
    getNearbyPoints(lat, lng);
  } else {
    // Xóa tất cả các điểm xung quanh khi checkbox được bỏ chọn
    nearbyPoints.forEach((point) => map.removeLayer(point));
  }
});

function getNearbyPoints(lat, lng) {
  nearbyPoints.forEach((point) => map.removeLayer(point));

  nearbyPoints = [];

  // Tạo 5 điểm xung quanh vị trí hiện tại
  for (let i = 0; i < 5; i++) {
    let newLat = Number(lat) + (Math.random() - 0.5) * 0.01;
    let newLng = Number(lng) + (Math.random() - 0.5) * 0.01;

    var marker = L.marker([newLat, newLng]).addTo(map);
    nearbyPoints.push(marker);
  }
}

// Cố định 5 vị trí
var showCafesCheckbox = document.getElementById("showCafes");
var cafeMarkers = [];
showCafesCheckbox.addEventListener("change", function () {
  var cafes = [
    { name: "The coffe house", location: [10.803963, 106.639861] },
    { name: "Highland", location: [10.803246, 106.64257] },
    { name: "Cá tra", location: [10.802862, 106.639738] },
    { name: "Cộng Coffe", location: [10.802182, 106.641267] },
    { name: "Three O'Clock", location: [10.802182, 106.641267] },
  ];

  if (this.checked) {
    // Hiển thị các địa điểm (quán cafe)
    cafes.forEach((caf) => {
      var marker = L.marker(caf.location).addTo(map);
      marker.bindPopup("<b>" + caf.name + "</b>");
      cafeMarkers.push(marker);
    });
  } else {
    // Xóa tất cả các địa điểm (quán cafe)
    cafeMarkers.forEach((marker) => map.removeLayer(marker));
    cafeMarkers = [];
  }
});

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
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lng", lng);
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

//test

