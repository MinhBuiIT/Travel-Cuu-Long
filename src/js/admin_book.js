const adminBookBody = document.querySelector('.book-admin-wrap__table-body');
let dataBill = JSON.parse(localStorage.getItem('bill')) || [];
const btnApprovalAll = document.querySelector('.book-admin-confirmAll');
const btnCancleApproval = document.querySelector('.book-admin-removeAll');
const btnHanldedBill = document.querySelector('.book-admin-handleBill');
// Hanlded Xử lý đơn hàng
if (dataBill.length === 0) {
  btnHanldedBill.style.display = 'none';
} else {
  btnHanldedBill.style.display = 'inline-block';
}
btnHanldedBill.addEventListener('click', function (e) {
  localStorage.removeItem('book');
  localStorage.removeItem('bill');
});
if (adminBookBody) {
  let html = dataBill
    .map((item, index) => {
      return `<tr>
    <td class="book-admin-wrap__table-img">
      <img src=${item.img} alt="" class="w-100 h-100 object-fit-cover">
    </td>
    <td>${item.tour}
    </td>
    <td class="price-book">${new Intl.NumberFormat('de-DE').format(item.price)}</td>
    <td class="text-center">
      <div>${item.amountUser}</div>
    </td>
    <td>${item.phoneUser}</td>
    <td class="sum-book">${new Intl.NumberFormat('de-DE').format(item.amountUser * item.price)}</td>
    <td><input type="checkbox" class="approval"></td>
  </tr>`;
    })
    .join('');
  adminBookBody.innerHTML = html;
  checkInputApprovalUI();
}
btnApprovalAll.addEventListener('click', function (e) {
  let approvalInput = document.querySelectorAll('.approval');
  if (approvalInput) {
    approvalInput.forEach((item) => {
      item.setAttribute('checked', true);
      item.setAttribute('disabled', true);
    });
    dataBill.forEach((item) => {
      item.approval = true;
    });
    localStorage.setItem('bill', JSON.stringify(dataBill));
    alert('Xét duyệt tất cả thành công');
  }
});
function checkInputApprovalUI() {
  let approvalInput = document.querySelectorAll('.approval');
  if (approvalInput) {
    dataBill.forEach((item, index) => {
      if (item.approval) {
        approvalInput[index].setAttribute('checked', true);
        approvalInput[index].setAttribute('disabled', true);
      }
    });
  }
}
function cancleApproval() {
  let approvalInput = document.querySelectorAll('.approval');
  if (approvalInput) {
    approvalInput.forEach((item) => {
      item.removeAttribute('checked');
      item.removeAttribute('disabled');
    });
    dataBill.forEach((item) => {
      item.approval = false;
    });
    localStorage.setItem('bill', JSON.stringify(dataBill));
  }
}
btnCancleApproval.addEventListener('click', cancleApproval);
