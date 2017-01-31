function createValidator(options) {
  return function () {
    return new Validator(options);
  }
}

describe('Validator - init', function() {
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

  afterEach(function () {
    var forms = document.getElementsByTagName('form');

    for (var i = 0; i < forms.length; i++) {
      var form = forms[i]
      form.parentNode.removeChild(form);
    }
  });


  describe('options should be passed correctly', function() {
    it('if all required fields mentioned and they are correct', function () {
      var validator = new Validator({
        formId: 'form',
        validate: {
          email: {
            validator: 'email',
            errorMessage: 'Fail'
          }
        }
      });

      expect(validator).toBeDefined();
    });

    it('if errorMessage missed', function () {
      var validator = new Validator({
        formId: 'form',
        validate: {
          email: {
            validator: 'email'
          }
        }
      });

      expect(validator).toBeDefined();
      expect(validator.validate.email.errorMessage).toEqual({ en: 'Validation error' });
    });

    it('if lang is mentioned', function () {
      var validator = new Validator({
        formId: 'form',
        lang: 'ua',
        validate: {
          email: {
            validator: 'email',
            errorMessage: {
              ua: 'Помилка'
            }
          }
        }
      });

      expect(validator).toBeDefined();
      expect(validator.validate.email.errorMessage).toEqual({ ua: 'Помилка' });
    });
  });

  describe('options are passed incorrectly', function() {
    it(' - if they skipped', function () {
      expect(createValidator({})).toThrowError();
    });

    it(' - if formId is skipped', function () {
      var options = {};

      expect(createValidator(options)).toThrowError('Missed required formId option');
    });

    it(' - if form is not in DOM', function () {
      var options = {
        formId: 'nonexsits'
      };

      expect(createValidator(options)).toThrowError('Form nonexsits is not exists in DOM');
    });

    it(' - if validate option is skipped', function () {
      var options = {
        formId: 'form'
      };

      expect(createValidator(options)).toThrowError('Missed required validate option');
    });

    it(' - if validate option is an empty object', function () {
      var options = {
        formId: 'form',
        validate: {}
      };

      expect(createValidator(options)).toThrowError('Validate fields can not be empty');
    });

    it(' - if validate option includes none existing form fields name', function () {
      var options = {
        formId: 'form',
        validate: {
          email1: {}
        }
      };

      expect(createValidator(options))
        .toThrowError('All passed fields to validate are not exists in form');
    });

    it(' - if validator for validate filed is not string or function', function () {
      var options = {
        formId: 'form',
        validate: {
          email: {
            validator: []
          }
        }
      };

      expect(createValidator(options)).toThrowError('Validator can be string or function');
    });

    it(' - if string validator for validate filed is not supportable', function () {
      var options = {
        formId: 'form',
        validate: {
          email: {
            validator: 'doMagic'
          }
        }
      };

      expect(createValidator(options))
        .toThrowError('We do not support doMagic validator, use custom function instead');
    });
  });
});
