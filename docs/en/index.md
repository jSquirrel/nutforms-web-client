# Nutforms Web Client Documentation

## Usage

### Importing library

First, you must import the Nutforms client library.

```html
<script src="../../dist/nutforms.js"></script>
```

### Using library

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

### Extending the library

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

## Architecture

### Rich Model

Before the form is generated, Rich Model is built. This model is mirroring the model on the server
and supports aspects weaving and propagates user inputs into its values at runtime.

Rich Model is made up of these classes:
- [Model](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Model.js) represents class from the server model.
- [Attribute](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Attribute.js) represents field of class.
- [Relation](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Relation.js) extends Attribute and represents a relation between classes.
- [ModelLocalization](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/ModelLocalization.js) holds localization aspect data for Model.
- [AttributeLocalization](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/AttributeLocalization.js) holds localization aspect data for Attribute.
- [ModelRenderer](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/ModelRenderer.js) is responsible for rendering the whole model.
- [AttributeRenderer](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/AttributeRenderer.js) is responsible for rendering widget for its attribute.
- [Layout](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Layout.js) holds layout aspect data for Model.

### Rich Model Building

The model is build using these builders:
- [AttributeBuilder](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/AttributeBuilder.js) builts `Attribute` class.
- [ModelBuilder](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/ModelBuilder.js) builds the `Model` class and contains set of `AttributeBuilder`s.

The builders are directed by the
[Nutforms](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/Nutforms.js) class
and by the aspect definition parsers:
- [ModelStructureParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/ModelStructureParser.js) parses model structure metadata and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s
- [LocalizationParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/LocalizationParser.js) parses localization aspect data and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s
- [ValuesParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/ValuesParser.js) parses values aspect data and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s

### Aspects Definitions Retrieval

The aspects definitions are retrieved from `AspectsSource` interface.

The library provies default [NutformsApiAspectsSource](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/aspectsSource/NutformsApiAspectsSource.js)
implementation, which provides the aspects from remote Nutforms Server API via HTTP requests.

### Observers

The `Model`, `Attribute` and `Nutforms` classes all extend [Observable](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/observer/Observable.js)
class, which allows them to be listened to by observers and to trigger events which notify the observers.
