const dataLogin = {
  users: [{ email: 'join@gmail.com', password: '456789' }],
  admin: [{ email: 'admin1@gmail.com', password: 'abc1234' }]
};

const formRegis = document.querySelector('#form-login');
const adminCheck = formRegis.querySelector('#adminConfirm');
function CancelForm() {
  if (formRegis) {
    formRegis.reset();
  }
}
Validate({
  form: '#form-login',
  rules: [Validate.isRequired('#email'), Validate.isEmail('#email'), Validate.minLength('#password', 6)],
  onSubmit(data) {
    //có onsubmit để lấy dữ liệu nếu ko sẽ hành vi mặc định submit
    // Call API
    if (adminCheck.checked) {
      let isLoginAdmin = CheckLogin(dataLogin['admin'], data);
      //   console.log('Admin', isLoginAdmin);
      if (isLoginAdmin) {
        alert('Đăng nhập Admin thành công');
        window.location = 'admin_book.html';
        localStorage.setItem('admin', data.email);
      } else alert('Đăng nhập thất bại');
    } else {
      let isLoginUser = CheckLogin(dataLogin['users'], data);
      //   console.log('User', isLoginUser);

      if (isLoginUser) {
        alert('Đăng nhập User thành công');
        localStorage.setItem('user', data.email);
        window.location = '../index.html';
        localStorage.setItem('user', data.email);
      } else alert('Đăng nhập thất bại');
    }
  }
});

function CheckLogin(dataPersons, dataCheck) {
  if (Array.isArray(dataPersons)) {
    for (let i = 0; i < dataPersons.length; i++) {
      if (dataPersons[i].email === dataCheck.email && dataPersons[i].password === dataCheck.password) return true;
    }
    return false;
  }
}
