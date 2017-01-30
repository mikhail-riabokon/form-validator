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
        expect(validator.validate.email.errorMessage).toBe('Validation error');
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

  describe('existingsValidators', function() {
    it('should include url and email validators', function () {
      expect(Validator.existingsValidators.url).toBeDefined();
      expect(Validator.existingsValidators.email).toBeDefined();
    });

    it('can be extended', function () {
      Validator.existingsValidators.isExist = function (value) {
        return value ? true : false;
      };

      var validator = new Validator({
        formId: 'form',
        validate: {
          email: {
            validator: 'isExist'
          }
        }
      });

      expect(validator).toBeDefined();
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
});
