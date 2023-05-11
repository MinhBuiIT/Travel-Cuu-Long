function Validate(options) {
  const form = document.querySelector(options.form);
  function handleValidate(inputElement, arrTestOfSelector, rule) {
    let error;
    let formGroup = inputElement.closest('.form-group');
    let message = formGroup.querySelector('.form-message');
    //Lặp qua và check từng điều kiện
    for (var i = 0; i < arrTestOfSelector.length; i++) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          // console.log(rule.selector);
          let isInputChecked = form.querySelector(rule.selector + ':checked');
          error = arrTestOfSelector[i](isInputChecked);
          break;
        default:
          error = arrTestOfSelector[i](inputElement);
      }
      if (error) break;
    }
    if (error) {
      message.textContent = error;
      formGroup.classList.add('invalid');
    } else {
      message.textContent = '';
      formGroup.classList.remove('invalid');
    }
    return !error;
  }
  //xử lí submit form
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isFormError;
    let isFlat = true;
    options.rules.forEach((rule) => {
      let inputElement = form.querySelector(rule.selector);
      isFormError = handleValidate(inputElement, selectorTest[rule.selector], rule);
      if (!isFormError) {
        isFlat = false;
      }
    });
    if (isFlat) {
      if (typeof options.onSubmit === 'function') {
        let allInput = form.querySelectorAll('[name]');
        let dataInput = [...allInput].reduce(function (values, input) {
          switch (input.type) {
            case 'radio':
            case 'checkbox':
              let inputOptions = form.querySelectorAll(`input[name = ${input.name}]:checked`);
              [...inputOptions].forEach((inputOption) => {
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [inputOption.value];
                } else if (!values[input.name].includes(inputOption.value)) {
                  values[input.name].push(inputOption.value);
                }
              });
              break;
            case 'file':
              values[input.name] = input.files;
              break;
            default:
              values[input.name] = input.value;
          }
          return values;
        }, {});
        options.onSubmit(dataInput);
      } else {
        //Trường hợp mặc định
        form.submit();
      }
    }
  });
  const selectorTest = {};
  options.rules.forEach((rule) => {
    let inputElements = form.querySelectorAll(rule.selector);
    //Logic để thêm các phần tử trùng nhau thành một cái mảnh trong object
    if (Array.isArray(selectorTest[rule.selector])) {
      selectorTest[rule.selector].push(rule.test);
    } else {
      selectorTest[rule.selector] = [rule.test];
    }
    [...inputElements].forEach((inputElement) => {
      //xử lý khi blur ra ngoài
      inputElement.addEventListener('blur', function (e) {
        // let error = rule.test(inputElement);
        handleValidate(inputElement, selectorTest[rule.selector], rule);
      });
      //xử lý khi gõ vào thì xanh
      inputElement.addEventListener('input', function (e) {
        let formGroup = inputElement.closest('.form-group');
        let message = inputElement.closest('.form-group').querySelector('.form-message');
        message.textContent = '';
        formGroup.classList.remove('invalid');
      });
    });
  });
}

// xử lý thành phần
Validate.isRequired = function (selector) {
  return {
    selector,
    test(inputElement) {
      if (inputElement === null) return 'Vui lòng điền thông tin vào';
      return inputElement.value.trim() ? undefined : 'Vui lòng điền thông tin vào';
    }
  };
};

Validate.isEmail = function (selector) {
  return {
    selector,
    test(inputElement) {
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regexEmail.test(inputElement.value) ? undefined : 'Vui lòng nhập đúng Email';
    }
  };
};

Validate.minLength = function (selector, minLength) {
  return {
    selector,
    test(inputElement) {
      return inputElement.value.length >= minLength ? undefined : `Vui lòng nhập ít nhất ${minLength} kí tự`;
    }
  };
};

Validate.isComfired = function (selector, callback, message) {
  return {
    selector,
    test(inputElement) {
      return inputElement.value === callback() ? undefined : message;
    }
  };
};
