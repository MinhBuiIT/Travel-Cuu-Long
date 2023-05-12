let dataBook = JSON.parse(localStorage.getItem('book')) || [];
const btnBookGroup = document.querySelector('.book-btn-group');
const btnBookConfirm = btnBookGroup.querySelector('.book-confirm');
const btnBookRemoveAll = btnBookGroup.querySelector('.book-removeAll');
let isApproval;
let dataBill = JSON.parse(localStorage.getItem('bill')) || [];

const bookWrap = document.querySelector('.book-wrap');
const bookRender = document.querySelector('.book-wrap__table-body');
const userLogin = localStorage.getItem('user') || '';
if (dataBook.length === 0 || userLogin === '') {
  bookWrap.innerHTML = `<img src="../asset/img/cart-empty.png" alt="Cart-empty" class="m-auto" width="40%">`;
  btnBookGroup.style = 'display:none';
} else {
  if (dataBill.length !== 0) {
    checkApproval();
  }
  renderBooking();
  const inputAmount = document.querySelectorAll('.amount');
  const sumBook = document.querySelectorAll('.sum-book');
  const sumMoney = document.querySelector('.sum-money');
  let sumMoneyValue = 0;
  function IncreaseAmount(index) {
    let value = inputAmount[index].value;
    inputAmount[index].value = ++value;
    sumBook[index].textContent = new Intl.NumberFormat('de-DE').format(
      inputAmount[index].value * +inputAmount[index].dataset.price
    );
    dataBook[index] = { ...dataBook[index], amountUser: +inputAmount[index].value };
    console.log(dataBook[index]);
    localStorage.setItem('book', JSON.stringify(dataBook));
    sumMoneyHandle();
    sumMoney.lastElementChild.textContent = new Intl.NumberFormat('de-DE').format(sumMoneyValue);
  }
  function sumMoneyHandle() {
    sumMoneyValue = 0;
    [...inputAmount].forEach((item) => {
      sumMoneyValue += +item.dataset.price * item.value;
    });
  }
  function DecreaseAmount(index) {
    let value = inputAmount[index].value;
    if (value <= 1) return;
    inputAmount[index].value = --value;
    sumBook[index].textContent = new Intl.NumberFormat('de-DE').format(
      inputAmount[index].value * +inputAmount[index].dataset.price
    );
    dataBook[index] = { ...dataBook[index], amountUser: +inputAmount[index].value };
    localStorage.setItem('book', JSON.stringify(dataBook));
    sumMoneyHandle();
    sumMoney.lastElementChild.textContent = new Intl.NumberFormat('de-DE').format(sumMoneyValue);
  }
  function RemoveItem(indexRemove) {
    dataBook.splice(indexRemove, 1);
    renderBooking();
    sumMoneyHandle();
    sumMoney.lastElementChild.textContent = new Intl.NumberFormat('de-DE').format(sumMoneyValue);
    localStorage.setItem('book', JSON.stringify(dataBook));
    if (dataBook.length === 0) {
      bookWrap.innerHTML = `<img src="/asset/img/cart-empty.png" alt="Cart-empty" class="m-auto" width="40%">`;
      btnBookGroup.style = 'display:none';
    }
  }
}

function renderBooking() {
  let sumMoney = 0;
  let html = dataBook
    .map((item, index) => {
      sumMoney = sumMoney + +item.price * item.amountUser;
      return `<tr>
        <td class="book-wrap__table-img">
          <img src=${item.img} alt="" class="w-100 h-100 object-fit-cover">
        </td>
        <td>${item.tour}
            <span class="btn btn-danger btn-remove p-1" onclick="RemoveItem(${index})"><i class="bi bi-trash"></i></span>
        </td>
        <td class="price-book">${new Intl.NumberFormat('de-DE').format(item.price)}</td>
        <td class="text-center">
          <span class="btn btn-light btn-minus" onclick="DecreaseAmount(${index})"><i class="bi bi-dash"></i></span>
          <input type="number" class="border-1 px-2 w-25 amount" value=${item.amountUser}  min="1" data-price=${
        item.price
      }>
          <span class="btn btn-light btn-add" onclick="IncreaseAmount(${index})"><i class="bi bi-plus"></i></span>
        </td>
        <td>${item.phoneUser}</td>
        <td class="sum-book">${new Intl.NumberFormat('de-DE').format(item.amountUser * item.price)}</td>

      </tr>`;
    })
    .join('');
  html =
    html +
    `<tr class="sum-money" data-money="${sumMoney}">
        <td colspan="5">Tổng tiền: </td>
        <td>${new Intl.NumberFormat('de-DE').format(sumMoney)}</td>
  </tr>`;
  bookRender.innerHTML = html;
  if (dataBill.length !== 0) {
    checkApprovalUI();
  }
}
btnBookRemoveAll.addEventListener('click', function (e) {
  localStorage.removeItem('book');
  dataBook = [];
  renderBooking();
  bookWrap.innerHTML = `<img src="/asset/img/cart-empty.png" alt="Cart-empty" class="m-auto" width="40%">`;
  btnBookGroup.style = 'display:none';
});

// Kiểm tra xét duyệt
function checkApprovalUI() {
  if (isApproval) {
    $('.btn-remove').css('display', 'none');
    $('.btn-add').css('display', 'none');
    $('.btn-minus').css('display', 'none');
    $('.btn-minus').next().attr('disabled', true);
  } else {
    $('.btn-remove').css('display', 'inline-block');
    $('.btn-add').css('display', 'inline-block');
    $('.btn-minus').css('display', 'inline-block');
    $('.btn-minus').next().removeAttr('disabled');
  }
}

btnBookConfirm.addEventListener('click', function (e) {
  dataBill = dataBook.map((item) => {
    return { ...item, approval: false };
  });
  localStorage.setItem('bill', JSON.stringify(dataBill));
  checkApproval();
  $('.btn-remove').css('display', 'none');
  $('.btn-add').css('display', 'none');
  $('.btn-minus').css('display', 'none');
  $('.btn-minus').next().attr('disabled', true);
});
function checkApproval() {
  isApproval = true;
  dataBill.forEach((item) => {
    if (!item.approval) isApproval = false;
  });
  if (!isApproval) {
    btnBookConfirm.textContent = '...Đang chờ xét duyệt';
    btnBookConfirm.classList.add('disabled');
    btnBookRemoveAll.classList.add('disabled');
  } else {
    btnBookConfirm.textContent = 'Xác nhận vé thành công';
    btnBookConfirm.classList.add('disabled');
    btnBookRemoveAll.style = 'display:none';
  }
}
