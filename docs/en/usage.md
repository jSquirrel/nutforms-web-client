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
    var mappingFunction = function (className, context, attributeName, attributeType, isAttributePrimary) {
        var widgetNamespace = "default";
        var widgetName = "";
        switch (attributeType) {
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
