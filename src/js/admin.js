const adminEmail = localStorage.getItem('admin') || '';
if (adminEmail !== '') {
  const navRight = document.querySelector('.nav-right');
  navRight.innerHTML = `<div class="fs-5 pe-3 text-hover">${adminEmail}</div>
              <button class="cu fs-5 text-hover border-0 bg-transparent" onclick="logoutAdmin()">Đăng xuất</button>`;
}
function logoutAdmin() {
  localStorage.removeItem('admin');
  window.location = 'login.html';
}
