// Báo
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");
const btnLogin = document.querySelector(".login__signInButton");

// Xử lý sự kiện
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputEmail.value === "" || inputPassword.value === "") {
    alert("vui lòng không để trống");
  } else {
    const user = JSON.parse(localStorage.getItem(inputEmail.value));
    if (
      user.email === inputEmail.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "index.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});