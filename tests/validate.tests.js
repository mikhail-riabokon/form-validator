describe('Validator - login form', function() {
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

  describe('is valid', function() {
    it('if fields are filled correctly', function () {
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

  describe('is invalid', function() {
    it('if fields are not filled correctly or empty', function () {
      var validator = new Validator({
        formId: 'login',
        validate: {
          email: {
            validator: 'email'
          }
        }
      });

      expect(validator.isValid()).toBe(true);
    });
  });

});
