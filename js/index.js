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
    lat: 10.757796,
    long: 106.599033,
    href: "https://www.google.com/maps/place/10%C2%B045'28.1%22N+106%C2%B035'56.5%22E/@10.757796,106.597536,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.757796!4d106.599033?entry=ttu",
  },
  {
    lat: 10.766785, 
    long: 106.60408,
    href:"https://www.google.com/maps/place/Chung+c%C6%B0+L%C3%AA+Th%C3%A0nh/@10.7668916,106.6047187,17.92z/data=!4m6!3m5!1s0x31752c4737c977e1:0x9bf428c4d164d98d!8m2!3d10.7667672!4d106.6039283!16s%2Fg%2F11hcdvndrc?entry=ttu",
  },
  {
    lat: 10.808940, 
    long: 106.6337,
    href:"https://www.google.com/maps/place/Big+C+Tr%C6%B0%E1%BB%9Dng+Chinh/@10.7925553,106.6333545,13.35z/data=!4m6!3m5!1s0x3175295916294ecb:0xbf731034fb27c5b8!8m2!3d10.8064862!4d106.6341961!16s%2Fg%2F1hhh728pf?entry=ttu",
  },
  {
    lat: 10.795451, 
    long: 106.7220,
    href:"https://www.google.com/maps/place/T%C3%B2a+nh%C3%A0+The+Landmark+81/@10.8099059,106.7193579,14.13z/data=!4m6!3m5!1s0x317527c2f8f30911:0x36ac5073f8c91acd!8m2!3d10.7949932!4d106.7218215!16s%2Fm%2F012hcpml?entry=ttu",
  },
  {
    lat: 10.829834, 
    long: 106.7210,
    href:"https://www.google.com/maps/place/CGV+Giga+Mall+Th%E1%BB%A7+%C4%90%E1%BB%A9c/@10.8111496,106.7166474,13.81z/data=!4m6!3m5!1s0x31752930d4f0ef63:0xfeffcc189deddb5b!8m2!3d10.8276003!4d106.7212132!16s%2Fg%2F11gy8q_jz6?entry=ttu",
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
// const render_list = list_history_fake.map(
//   (location) => `<li>[${location.lat},${location.long}]</li>`
// );

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
