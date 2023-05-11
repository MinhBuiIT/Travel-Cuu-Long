const data = JSON.parse(localStorage.getItem('tourList')) || [];
const userLogin = localStorage.getItem('user') || '';
const tourList = document.querySelector('.tour-list');

function renderTour(data) {
  const html = data
    .map((item, index) => {
      let priceFormat = new Intl.NumberFormat('de-DE').format(item.price);
      return ` <div class="col-md-4 col-6 mb-4 tour-item">
        <div class="tour-img">
            <img src=${item.img}
                alt="tour">
        </div>
        <div class="tour-content">
            <div class="d-flex justify-content-between align-items-center">
                <h5>${item.tour}</h5>
                <div>&star; <span>${item.star}</span></div>
            </div>
            <p>Ngày đi ${item.date}</p>
            <div class='d-flex justify-content-between align-items-end'>
                <span>${priceFormat}đ</span>
                <button class='btn btn-danger' onclick="showFormBook(${index})">Đặt Vé</button>
            </div>
        </div>
    </div>`;
    })
    .join('');
  tourList.innerHTML = html;
  Pagination(data);
}
renderTour(data);

// show form book ticket
const ticketList = JSON.parse(localStorage.getItem('book')) || [];
const formBookWrap = document.querySelector('#form-book-ticket');
const formBook = formBookWrap.querySelector('form');
let indexData = -1;
function showFormBook(index) {
  if (userLogin === '') window.location = 'login.html';
  else {
    formBookWrap.classList.add('show');
    indexData = index;
  }
}
formBook.onsubmit = (e) => {
  e.preventDefault();
  console.log('adbhj');
  let nameUser = formBook['fullname'].value;
  let phoneUser = formBook['phone'].value;
  let emailUser = formBook['email'].value;
  let amountUser = formBook['amount'].value;
  if (indexData > -1) {
    let objTicket = { ...data[indexData], nameUser, phoneUser, emailUser, amountUser: +amountUser };
    ticketList.push(objTicket);
    localStorage.setItem('book', JSON.stringify(ticketList));
  }
  closeFormBook();
};
formBookWrap.addEventListener('click', function (e) {
  if (e.target.matches('#form-book-ticket')) closeFormBook();
});
function closeFormBook() {
  formBookWrap.classList.remove('show');
  formBook.reset();
}
// Panigation
$(document).ready(function () {
  Pagination(data);
});
function Pagination(data) {
  var items = $('.tour-list .tour-item');
  var numItems = data.length;
  var perPage = 3;

  items.slice(perPage).hide();

  $('#pagination-container').pagination({
    items: numItems,
    itemsOnPage: perPage,
    prevText: '&laquo;',
    nextText: '&raquo;',

    onPageClick: function (pageNumber) {
      var showFrom = perPage * (pageNumber - 1);
      var showTo = showFrom + perPage;
      items.hide().slice(showFrom, showTo).show();
    }
  });
}
