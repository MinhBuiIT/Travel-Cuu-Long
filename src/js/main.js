const dataTour = JSON.parse(localStorage.getItem('tourList')) || [
  {
    id: 1,
    tour: 'Tour du lịch Cần Thơ',
    img: '/asset/img/tour1.jpg',
    loai: 'Cần Thơ',
    price: '1990000',
    date: '2023-05-12',
    star: 5.0
  },
  {
    id: 2,
    tour: 'Tour du lịch An Giang',
    img: '/asset/img/tour2.jpg',
    loai: 'An Giang',
    price: '990000',
    date: '2023-05-15',
    star: 4.5
  },
  {
    id: 3,
    tour: 'Tour du lịch Bạc Liêu',
    img: '/asset/img/tour3.jpg',
    loai: 'Bạc Liêu',
    price: '2450000',
    date: '2023-05-14',
    star: 4
  },
  {
    id: 4,
    tour: 'Tour du lịch Sóc Trăng',
    img: '/asset/img/tour4.jpg',
    loai: 'Sóc Trăng',
    price: '1450000',
    date: '2023-05-10',
    star: 5.0
  },
  {
    id: 5,
    tour: 'Tour du lịch Tiền Giang',
    img: '/asset/img/tour5.jpg',
    loai: 'Tiền Giang',
    price: '1750000',
    date: '2023-05-17',
    star: 4.5
  },
  {
    id: 6,
    tour: 'Tour du lịch Kiên Giang',
    img: '/asset/img/tour6.jpg',
    loai: 'Kiên Giang',
    price: '2750000',
    date: '2023-05-18',
    star: 5
  },
  {
    id: 7,
    tour: 'Tour du lịch Hậu Giang',
    img: '/asset/img/tour7.jpg',
    loai: 'Hậu Giang',
    price: '1450000',
    date: '2023-05-18',
    star: 5
  },
  {
    id: 8,
    tour: 'Tour du lịch Long An',
    img: '/asset/img/tour8.jpg',
    loai: 'Long An',
    price: '1550000',
    date: '2023-05-21',
    star: 4.5
  },
  {
    id: 9,
    tour: 'Tour du lịch Vĩnh Long',
    img: '/asset/img/tour9.jpg',
    loai: 'Vĩnh Long',
    price: '1950000',
    date: '2023-05-22',
    star: 4
  }
];

localStorage.setItem('tourList', JSON.stringify(dataTour));
const header = document.querySelector('#header');

window.addEventListener('scroll', (e) => {
  if (window.scrollY > header.offsetHeight) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
});

const userLoginEmail = localStorage.getItem('user') || '';
if (userLoginEmail !== '') {
  const navRightUser = document.querySelector('.nav-user-right');
  if (navRightUser) {
    navRightUser.innerHTML = `<div class="fs-5 pe-3 text-hover">${userLoginEmail}</div>
    <button class="cu fs-5 text-hover border-0 bg-transparent" onclick="logoutUser()">Đăng xuất</button>`;
  }
}
function logoutUser() {
  localStorage.removeItem('user');
  window.location = 'login.html';
}
