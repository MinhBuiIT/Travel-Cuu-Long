let indexUpdateTour = -1;
let dataTourList = JSON.parse(localStorage.getItem('tourList')) || [];
const tourListEle = document.querySelector('.tour-list');
const formTour = document.querySelector('#admin-ticket');
if (dataTourList.length === 0) {
  tourListEle.innerHTML = `<p class="fw-normal">Danh sách các tour rỗng</p>`;
} else {
  renderTours(dataTourList);

  formTour.addEventListener('submit', function (e) {
    e.preventDefault();
    if (indexUpdateTour == -1) {
      dataTourList = [
        ...dataTourList,
        {
          id: +dataTourList.length + 1,
          tour: formTour['tourName'].value,
          img: formTour['tourImg'].value,
          loai: formTour['tourType'].value,
          price: formTour['tourPrice'].value,
          date: formTour['tourDate'].value,
          star: +formTour['tourStar'].value
        }
      ];
    } else {
      dataTourList[indexUpdateTour] = {
        ...dataTourList[indexUpdateTour],
        tour: formTour['tourName'].value,
        img: formTour['tourImg'].value,
        loai: formTour['tourType'].value,
        price: formTour['tourPrice'].value,
        date: formTour['tourDate'].value,
        star: +formTour['tourStar'].value
      };
    }
    localStorage.setItem('tourList', JSON.stringify(dataTourList));
    renderTours(dataTourList);
    formTour.reset();
  });
}
function renderTours(data) {
  const html = data
    .map((item, index) => {
      let priceFormat = new Intl.NumberFormat('de-DE').format(item.price);
      return `<div class="col-md-4 col-6 mb-4 position-relative">
        <div class="tour-img">
            <img src=..${item.img} alt="tour">
        </div>
        <div class="tour-content">
            <div class="d-flex justify-content-between align-items-center">
                <h5>${item.tour}</h5>
                <div>&star; <span>${item.star}</span></div>
            </div>
            <p>Ngày đi ${item.date}</p>
            <div class='d-flex justify-content-between align-items-end'>
                <span>${priceFormat}đ</span>
            </div>
        </div>
        <div class="position-absolute top-0">
            <button class="btn btn-warning" onclick="updateTour(${item.id})"><i class="bi bi-pen text-white"></i></button>
            <button class="btn btn-danger" onclick="deleteTour(${item.id})"><i class="bi bi-trash"></i></button>
        </div>
    </div>`;
    })
    .join('');
  tourListEle.innerHTML = html;
}
function cancleTourForm() {
  formTour.reset();
}
function deleteTour(index) {
  dataTourList.splice(index - 1, 1);
  localStorage.setItem('tourList', JSON.stringify(dataTourList));
  renderTours(dataTourList);
}
function updateTour(index) {
  indexUpdateTour = index - 1;
  if (indexUpdateTour >= 0) {
    let { tour, img, loai, price, date, star } = dataTourList[indexUpdateTour];
    formTour['tourName'].value = tour;
    formTour['tourImg'].value = img;
    formTour['tourType'].value = loai;
    formTour['tourPrice'].value = price;
    formTour['tourDate'].value = date;
    formTour['tourStar'].value = star;
  }
}
