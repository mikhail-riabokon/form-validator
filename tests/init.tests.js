xdescribe('Validator - init', function() {
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
      var validator = null;

      try {
        validator = new Validator();
      } catch (error) {
        expect(error).toBeDefined();
        expect(validator).toBe(null);
      }
    });

    it(' - if formId is skipped', function () {
      var validator = null;

      try {
        validator = new Validator({
          validate: {}
        });
      } catch (error) {
        expect(error.message).toBe('Missed required formId option');
        expect(validator).toBe(null);
      }
    });

    it(' - if form is not in DOM', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'nonexsits'
        });
      } catch (error) {
        expect(error.message).toBe('Form nonexsits is not exists in DOM');
        expect(validator).toBe(null);
      }
    });

    it(' - if validate option is skipped', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form'
        });
      } catch (error) {
        expect(error.message).toBe('Missed required validate option');
        expect(validator).toBe(null);
      }
    });

    it(' - if validate option is an empty object', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form',
          validate: {}
        });
      } catch (error) {
        expect(error.message).toBe('Validate fields can not be empty');
        expect(validator).toBe(null);
      }
    });

    it(' - if validate option includes none existing form fields name', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form',
          validate: {
            email1: {}
          }
        });
      } catch (error) {
        expect(error.message).toBe('All passed fields to validate are not exists in form');
        expect(validator).toBe(null);
      }
    });

    it(' - if validator for validate filed is not string or function', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form',
          validate: {
            email: {
              validator: []
            }
          }
        });
      } catch (error) {
        expect(error.message).toBe('Validator can be string or function');
        expect(validator).toBe(null);
      }
    });

    it(' - if string validator for validate filed is not supportable', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form',
          validate: {
            email: {
              validator: 'doMagic'
            }
          }
        });
      } catch (error) {
        expect(error.message).toBe('We do not support doMagic validator, use custom function instead');
        expect(validator).toBe(null);
      }
    });

    it(' - if validator errorMessage is not string if passed', function () {
      var validator = null;

      try {
        validator = new Validator({
          formId: 'form',
          validate: {
            email: {
              validator: 'url',
              errorMessage: []
            }
          }
        });
      } catch (error) {
        expect(error.message).toBe('errorMessage can be string only');
        expect(validator).toBe(null);
      }
    });
  });
});
