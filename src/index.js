function throwError(error) {
  throw new Error(error);
}

function message(message) {
  console.log(message);
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

function checkFieldsInForm(filedsNames, form) {
  var formElementsNames = getNames(form.elements);
  var formId = form.getAttribute('id');

  for (var i = 0; i < filedsNames.length; i++) {
    if (formElementsNames.indexOf(filedsNames[i]) === -1) {
      message('There is no ' + filedsNames[i] + ' field in form #' + formId);
    }
  }
}

function Validator(options) {
  if (options.formId) {
    this.form = document.getElementById(options.formId);
  } else {
    throwError('Missed formId option');
  }

  if (options.validate && typeof options.validate === 'object') {
    this.validate = options.validate;

    var filedsNames = getKeys(options.validate);

    if (filedsNames.length === 0) {
      throwError('Validate fields can not be empty');
    }

    checkFieldsInForm(filedsNames, this.form);

  } else {
    throwError('Missed validate option');
  }


  return this;
}

window.Validator = Validator;
