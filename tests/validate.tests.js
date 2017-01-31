describe('Validator - login form', function() {
  var validator = null;

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

    validator = new Validator({
      formId: 'login',
      validate: {
        email: {
          validator: 'email'
        }
      }
    });
  });

  afterEach(function() {
    var forms = document.getElementsByTagName('form');

    for (var i = 0; i < forms.length; i++) {
      var form = forms[i]
      form.parentNode.removeChild(form);
    }

    validator = null;
  });

  describe('is valid', function() {
    it('if fields are filled correctly', function () {
      var form = document.getElementById('login');
      form.elements[1].value = 'valid@email.com';

      expect(validator.isValid()).toBe(true);
    });
  });

  describe('is invalid', function() {
    it('if fields are not filled correctly or empty', function () {
      expect(validator.isValid()).toBe(false);
    });

    it('and error will be shown', function () {
      expect(validator.isValid()).toBe(false);

      var emailField = document.getElementsByName('email')[0];
      var emailWrapper = emailField.parentNode;

      expect(emailWrapper).toBeDefined()
      expect(emailWrapper.getAttribute('class')).toBe('error-wrapper');
    });
  });

});
