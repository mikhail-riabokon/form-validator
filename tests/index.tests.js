describe('Validator', function () {
  it('should be defined', function () {
    expect(Validator).toBeDefined();
  });

  it('should be a constructor function', function () {
    expect(typeof Validator).toBe('function');
  });

  describe('init', function() {
    beforeEach(function () {
      var form = document.createElement('form');
      var emailField = document.createElement('input');
      var div = document.createElement('div');
      var body = document.getElementsByTagName('body')[0];

      emailField.setAttribute('name', 'email');
      form.setAttribute('id', 'form');

      div.appendChild(emailField);
      form.appendChild(div);
      body.appendChild(form);
    });

    it('options should be passed correctly', function () {
      var correctValidateObject = {
        email: {
          validator: 'email',
          errorMessage: 'Fail'
        }
      };
      var validator = new Validator({
        formId: 'form',
        validate: correctValidateObject
      });

      expect(validator.form).not.toBe(null);
      expect(validator.form).toBeDefined();
      expect(validator.validate).toBeDefined()
    });
  });
});
