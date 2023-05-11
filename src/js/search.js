const searchBtn = header.querySelector('.search');
const dataSearch = JSON.parse(localStorage.getItem('tourList')) || [];
const modalSearch = document.querySelector('#modal-search');
const formSearch = modalSearch.querySelector('.modal-search__form');
// Search Modal
searchBtn.addEventListener('click', function (e) {
  modalSearch.classList.add('show');
});
modalSearch.addEventListener('click', function (e) {
  if (e.target.matches('.modal-search')) modalSearch.classList.remove('show');
});
// formSearch.addEventListener('submit', function (e) {
//   e.preventDefault();
//   let value = formSearch['search'].value;
//   if (value !== '') {
//     let dataFilter = dataSearch.filter((item) => {
//       let isFilter = item.loai.toLocaleUpperCase().includes(value.toLocaleUpperCase());
//       return isFilter;
//     });
//     modalSearch.classList.remove('show');
//     renderTour(dataFilter);
//   }
// });
function submitSearch(event, renderFunc) {
  event.preventDefault();
  let value = formSearch['search'].value;
  if (value !== '') {
    let dataFilter = dataSearch.filter((item) => {
      let isFilter = item.loai.toLocaleUpperCase().includes(value.toLocaleUpperCase());
      return isFilter;
    });
    modalSearch.classList.remove('show');
    // document.getElementById('pagination-container').style.display = 'none';
    renderFunc(dataFilter);
  }
}
