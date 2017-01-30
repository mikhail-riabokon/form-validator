var existingsValidators = {
  url: function (url) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (url && typeof url === 'string') {
      return regex.test(url);
    } else {
      return false;
    }
  },
  email: function (email) {
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (email && typeof email === 'string') {
      return regex.test(email);
    } else {
      return false;
    }
  }
};


function throwError(error) {
  throw new Error(error);
}

function message(message) {
  if ("console" in window) {
    console.log(message);
  } else {
    alert(message);
  }
}

function copyObject(object) {
  function Temp() {}

  Temp.prototype = object;

  return new Temp();
}

function getKeys(obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
}

function getNames(nodelist) {
  var names = [];

  for (var i = 0; i < nodelist.length; i++) {
    var name = nodelist[i].getAttribute('name');

    names.push(name);
  }

  return names;
}

function getFieldsToValidate(filedsNames, form) {
  var formElementsNames = getNames(form.elements);
  var formId = form.getAttribute('id');
  var existingFields = [];

  for (var i = 0; i < filedsNames.length; i++) {
    if (formElementsNames.indexOf(filedsNames[i]) === -1) {
      message('There is no ' + filedsNames[i] + ' field in form #' + formId);
    } else {
      existingFields.push(filedsNames[i]);
    }
  }

  return existingFields;
}

function checkValidators(fieldsToValidate, validatedFields) {
  for (var i = 0; i < fieldsToValidate.length; i++) {
    var validateObject = validatedFields[fieldsToValidate[i]]

    if (!validateObject.validator) {
      throwError('validator is missed for ' + fieldsToValidate[i] + ' field');
    }

    var isStringValidator = (typeof validateObject.validator === 'string');
    var isFunctionValidator = (typeof validateObject.validator === 'function');

    if (isStringValidator) {
      if (!existingsValidators[validateObject.validator]) {
        throwError('We do not support ' + validateObject.validator + ' validator, use custom function instead');
      }
    }

    if (!isStringValidator && !isFunctionValidator) {
      throwError('Validator can be string or function');
    }

    if (validateObject.errorMessage && typeof validateObject.errorMessage !== 'string') {
      throwError('errorMessage can be string only');
    }

    if (!validateObject.errorMessage) {
      validateObject.errorMessage = 'Validation error';
    }
  }

  return validatedFields;
}

function Validator(options) {
  if (options.formId) {
    this.form = document.getElementById(options.formId);

    if (!this.form) {
      throwError('Form ' + options.formId + ' is not exists in DOM');
    }

  } else {
    throwError('Missed required formId option');
  }

  if (options.validate && typeof options.validate === 'object') {
    this.validate = options.validate;

    var filedsNames = getKeys(options.validate);

    if (filedsNames.length === 0) {
      throwError('Validate fields can not be empty');
    }

    var fieldsToValidate = getFieldsToValidate(filedsNames, this.form);

    if (fieldsToValidate.length > 0) {
      this.validate = checkValidators(fieldsToValidate, this.validate);
    } else {
      throwError('All passed fields to validate are not exists in form');
    }

  } else {
    throwError('Missed required validate option');
  }


  return this;
}

Validator.existingsValidators = existingsValidators;

window.Validator = Validator;
