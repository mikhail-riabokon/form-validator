# Form validator

Simple lightweight form validator without third party dependcencies 

## How to use
```javascript
var validator = new Validator({
  lang: 'en',
  formId: '<formId>',
  validate: {
    '<fieldName1>': {
      validator: 'url'
    },
    '<fieldName2>': {
      validator: 'email',
      errorMessage: 'Incorrect email address'
    },
    '<fieldName3>': {
      validator: function (value) {
        return value ? true: false;
      },
      errorMessage: {
        en: 'Field can not be empty'
      }
    }
  }
});

var isFormValid = validator.isValid(); //true or false
```

### Validator options
#### ```lang<String>``` - If you use different languages for ```errorMessage``` this language will be selected as default.
#### ```formId<String>``` - Existing form id. Required.
#### ```validate<Object>``` - Fields to validate where ```key``` is a field name and ```value``` is ```validateObject```. Required.
#### ```validateObject<Object>``` - Validate rule for form field, which includes ```validator``` and  ```errorMessage``` keys.
#### ```validator<String|Function>``` - Validator which will be called while validating. Can be a selected from exsiting validators, or can be written like custom function. Required.
#### ```errorMessage<String|Object>``` - Message which will be shown if validation error occurred.

### Error format
By default errors are not styled, becase error styles usually depends on project UX. So, if error occured, form field will be wrapped in next way:

```
// Field is valid
<input type="text" name="<fieldName>">


// Field is invalid
<div class="error-wrapper">
  <div class="error"><Validation error message></div>
  <input type="text" name="<fieldName>">
</div>
```

### API
#### ```validator.getForm()``` - returns validation form
#### ```validator.setLang(<String>)``` - set new language for error messages
#### ```validator.isValid()``` - returns form state, can be ```true``` or ```false```

### Existing validators
#### ```url```
#### ```email```


