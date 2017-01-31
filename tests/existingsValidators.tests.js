xdescribe('Validator - existingsValidators', function() {
  it('should include url and email validators', function () {
    expect(Validator.existingsValidators.url).toBeDefined();
    expect(Validator.existingsValidators.email).toBeDefined();
  });

  it('can be extended', function () {
    Validator.existingsValidators.isExist = function (value) {
      return value ? true : false;
    };

    var form = document.createElement('form');
    var emailField = document.createElement('input');
    var body = document.getElementsByTagName('body')[0];

    emailField.setAttribute('name', 'email');
    form.setAttribute('id', 'form');

    form.appendChild(emailField);
    body.appendChild(form);

    var validator = new Validator({
      formId: 'form',
      validate: {
        email: {
          validator: 'isExist'
        }
      }
    });

    expect(validator).toBeDefined();

    form.parentNode.removeChild(form);
  });

  describe('url validator', function() {
    it('should return true for valid URL', function () {
      var validURL = 'https://www.abc.com';

      expect(Validator.existingsValidators.url(validURL)).toBe(true);
    });

    it('should return false for invalid URL', function () {
      var invalidURL = 'invalid';

      expect(Validator.existingsValidators.url(invalidURL)).toBe(false);
    });

    it('should return false for empty URL', function () {
      var invalidURL = '';

      expect(Validator.existingsValidators.url(invalidURL)).toBe(false);
    });
  });

  describe('email validator', function() {
    it('should return true for valid email address', function () {
      var validEmail = 'valid@email.com';

      expect(Validator.existingsValidators.email(validEmail)).toBe(true);
    });

    it('should return false for invalid email', function () {
      var invalidEmail = 'invalid';

      expect(Validator.existingsValidators.email(invalidEmail)).toBe(false);
    });

    it('should return false for empty email', function () {
      var invalidEmail = '';

      expect(Validator.existingsValidators.email(invalidEmail)).toBe(false);
    });
  });
});
