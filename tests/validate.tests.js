describe('Validator - validate login form', function() {
  beforeEach(function () {
    var body = document.getElementsByTagName('body')[0];
    var passwordField = document.createElement('input');
    var emailField = document.createElement('input');
    var form = document.createElement('form');

    passwordField.setAttribute('name', 'password');
    emailField.setAttribute('name', 'email');
    form.setAttribute('id', 'login');

    form.appendChild(passwordField);
    form.appendChild(emailField);

    body.appendChild(form);
  });

  it('isValid method should be defined', function () {
    var validator = new Validator({
      formId: 'login',
      validate: {
        email: {
          validator: 'email'
        }
      }
    });

    expect(typeof validator.isValid).toBe('function');
  });

  it('is empty and should not be valid', function () {
    var validator = new Validator({
      formId: 'login',
      validate: {
        email: {
          validator: 'email'
        }
      }
    });

    expect(validator.isValid()).toBe(false);
  });

  it('email is filled correctly and form should be valid', function () {
    var validator = new Validator({
      formId: 'login',
      validate: {
        email: {
          validator: 'email'
        }
      }
    });

    var form = document.getElementById('login');
    form.elements[1].value = 'valid@email.com';

    expect(validator.isValid()).toBe(true);
  });

});
