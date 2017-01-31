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

  afterEach(function() {
    var forms = document.getElementsByTagName('form');

    for (var i = 0; i < forms.length; i++) {
      var form = forms[i]
      form.parentNode.removeChild(form);
    }
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

      expect(validator.isValid()).toBe(false);
    });

    xit('error will be shown in case of error', function () {
      var validator = new Validator({
        formId: 'login',
        validate: {
          email: {
            validator: 'email'
          }
        }
      });

      validator.isValid();

      var a = document.getElementsByTagName('form')[0]

      // var email = document.getElementsByName('email');

      console.log(a);

      expect(false).toBe(true);

    });
  });

});
