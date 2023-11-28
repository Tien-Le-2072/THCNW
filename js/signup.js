// Báo
const inputUsernameRegister = document.querySelector(".username");
const inputEmailRegister = document.querySelector(".email");
const inputPasswordRegister = document.querySelector(".password");
const btnRegister = document.querySelector(".signup__signInButton");

// Xử lý sự kiện

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputEmailRegister.value === "" ||
    inputPasswordRegister.value === ""
  ) {
    alert("vui lòng không để trống");
  } else {
    // mảng người dùng
    const user = {
      email: inputEmailRegister.value,
      password: inputPasswordRegister.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem(inputEmailRegister.value, json);
    alert("Đăng Ký Thành Công");
    // chuyển qua trang login
    window.location.href = "main.html";
  }
});