# Nutforms Web Client Usage

## Importing library

First, you must import the Nutforms client library.

```html
<script src="../../dist/nutforms.js"></script>
```

## Using library

Then, you can use the following properties in your webpage environment:
- `Nutforms`: Facade for the form-generation subsystem
- `NutformsApiAspectsSource`: Default aspects source using Nutforms Server API
- `NutformsActions`: Actions produced by the `Nutforms` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/NutformsActions.js).
- `ModelActions`: Actions produced by the `Model` class. Take a look at [soruce code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/ModelActions.js).
- `AttributeActions`: Actions produced by the `Attribute` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/AttributeActions.js).

Nutforms library can then be used like this:

```html
<script type="text/javascript">
    // Set nutforms aspects source
    Nutforms.setAspectsSource(new NutformsApiAspectsSource(
            "https://nutforms.herokuapp.com/",      // Api URL
            "admin",                                // Api user
            "1234")                                 // Api user's password
    );

    // Define your widget mapping function
    var mappingFunction = function (attribute) {
        var widgetNamespace = "default";
        var widgetName = "";
        switch (attribute.type) {
            case "java.lang.String":
                widgetName = "text-input";
                break;
            case "java.lang.Long":
                widgetName = "number-input";
                break;
        }
        return widgetNamespace + "/" + widgetName;
    };

    // Listen to nutforms events
    Nutforms.listen(NutformsActions.MODEL_BUILT, function (model) {
        console.log("Model built!", model);
    });
    Nutforms.listen(NutformsActions.FORM_SUBMITTED, function (model, values) {
        console.log("Form submitted", model, values);
    });

    // Generate the form
    nutforms = Nutforms.generateForm(
            document.getElementById("form"),                // HTML Element
            "cz.cvut.fel.nutforms.example.model.Bug",       // Entity name
            "cz_CS",                                        // Locale
            1,                                              // Entity id
            "cz.cvut.fel.nutforms.example.model.Bug/new",   // Layout name
            mappingFunction,                                // Mapping function
            "new"                                           // Business context
    );
</script>
```

## Extending the library

The form generation can be extended by listening to the values and modifying or extending the Rich Model.
For example, you can add your own validation module.

```javascript
// Listen to Nutform MODEL_BUILT event
Nutforms.listen(NutformsActions.MODEL_BUILT, function (model) {
    
    // Add listener to "description" attribute
    model.attributes["description"].listen(AttributeActions.VALUE_CHANGED, function() {
        // Do your validation logic here
        // Display validation output here
    });
    
    // Extend rich model
    model.validation = new YourValidatorClass();
});
```

You can even disable some fields based on security preconditions (e.g., user roles)
by listening to MODEL_BUILT action and altering widget mapping function.
**Note:** This example assumes that you have widgets for both enabled and disabled fields. Alternatively, you can
listen to `FORM_RENDERED` event and manually disable all the unwanted fields.

```javascript
Nutforms.listen(NutformsActions.MODEL_BUILT, function (model) {
    // Disable some of the fields based on security rules
    if (!canEditLog) {
        model.attributes["log"].readOnly = true;
        // Then, you can check for disabled value in widget mapping function and force read-only widgets for such fields
    }
    
    // Or even remove attribute based on security rules if you need to
    if (!canViewLog) {
        delete model.attributes["log"];
    }
}
var mappingFunction = function (attribute) {
    var widgetNamespace = "default";
    if (attribute.readOnly) {
        widgetNamespace = "disabled";
    }
    // ...
    return widgetNamespace + "/" + widgetName;
};
```

## Accessing form fields by Tag ID

Each form field has a unique ID `<entityName>[<attributeName>]`.
The `entityName` is the one you provided when calling `Nutforms.generateForm()`,
and the `attributeName` is the unique name of single entity attribute.
Example of such id would be `cz.cvut.fel.nutforms.example.model.Bug[log]` for
entity `cz.cvut.fel.nutforms.example.model.Bug` and attribute `log`.

You can then access each field by its ID:
```javascript
var formField = document.getElementByID("cz.cvut.fel.nutforms.example.model.Bug[log]");
```
