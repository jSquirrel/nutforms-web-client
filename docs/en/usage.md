# Nutforms Web Client Usage

## Defining aspects

Before you use the library, you must define the aspects
of your forms.

### Model structure

Model structure is usually defined in lower layers of your system,
e.g., via your ORM tool. The Nutforms library accepts serialized metadata
of your model in JSON format.

```

```

A good way to provide such data is inspection of your domain model.
[Nutforms Server](https://github.com/jSquirrel/nutforms-server) 
provides such inspection for Java platform, but you can do it manually.

### Layout

Layouts are defined as HTML templates extended by special tag attributes,
which serve as instructions for the renderer, which then inject
concrete widgets to the layout.

You c an use the following tag attributes:
- `nf-form-label` - To denote tag, into which the localized form label is injected
- `nf-field-widget="<attributeName>"` - To denote tag, into which attribute's widget is injected

```html
<form class="form" role="form">
    <h1 nf-form-label="nf-form-label"></h1>
    <div nf-field-widget="id"></div>
    <div nf-field-widget="description"></div>
    <div nf-field-widget="log"></div>
</form>
```

### Widgets

Widgets are defined as HTML templates extended by custom tag attributes
and instructions which are replaced by values from the model.

You can use the following instructions:
- `{atribute.name}` for name of the attribute
- `{attribute.label}` for label of the attribute
- `{attribute.value}` for value of the attribute

And the following tag attributes:
- `nf-field-widget-label` - for element which contains label of the attribute
- `nf-field-widget-value` - for element which contains value of the attribute

```html
<div class="form-group">
    <label nf-field-widget-label="{attribute.name}" for="{attribute.name}">{attribute.formLabel}</label>
    <input nf-field-widget-value="{attribute.name}" class="form-control" id="{attribute.name}" name="{attribute.name}"
           type="text">
</div>
```

### Localization

Localization must be defined separately for each entity and business context
in simple JSON format where the follwing keys are used:
- `form.<attributeName>.label` - for label of each attribute
- `form.submit.value` - for value of the submit button
- `form.label` - for label of the form

```javascript
{
    "form.id.label": "ID",
    "form.description.label": "Description",
    "form.log.label": "Log",
    "form.label": "Create form",
    "form.submit.label": "Create"
}
```

### Values

The values of entity are represented by simple JSON document
with one object, where the keys are names of the attributes
and the values are the values of the attributes.

```javascript
{
    "id": 1,
    "description": "Bug #1",
    "log": "java.lang.NullPointerException ..."
}
```

## Importing library

In order to enable the automatic form generation, you must import the Nutforms client library.

```html
<script src="../../dist/nutforms.js"></script>
```


## Using library

Then, you can use the following properties in your webpage environment:
- `Nutforms`: Facade for the form-generation subsystem
- `NutformsApiAspectsSource`: Default aspects source using Nutforms Server API
- `NutformsActions`: Actions produced by the `Nutforms` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/NutformsActions.js).
- `ModelActions`: Actions produced by the `Model` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/ModelActions.js).
- `AttributeActions`: Actions produced by the `Attribute` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/AttributeActions.js).

### Setting aspects source

To be able to distribute aspects to your form, you must provide them to the Nutforms
library, which does the aspect weaving for you.

You can define your own `AspectsSource` implementation and provide it to the library.
Make sure your object provides the following functions used by the weaver:
- `fetchStructureMetadata(entityName)` for fetching your model structure metadata for given entity
- `fetchValues(entityName, entityId)` for fetching entity values
- `fetchLocalizationData(entityName, locale)` for fetching localization of your entity in concrete locale
- `fetchLayout(layout)` for fetching form layout with given identifier
- `fetchWidget(widget)` for fetching attribute widget with given identifier

Alternatively, you can use default implementations named [NutformsApiAspectsSource](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/aspectsSource/NutformsApiAspectsSource.js),
which distributes the aspects from [Nutforms Server's](https://github.com/jSquirrel/nutforms-server) registries.
It takes URL of the Nutforms Server's REST API and user name and password as constructor parameters.

You must provide implementation of `AspectsSource` before you generate the form.
```javascript
// Your own implementation
Nutforms.setAspectsSource(new MyAspectsSource());

// NutformsApiAspectsSource
Nutforms.setAspectsSource(new NutformsApiAspectsSource(
        "https://nutforms.herokuapp.com/",      // Api URL
        "admin",                                // Api user
        "1234")                                 // Api user's password
);
```

### Defining widget mapping function

Each attribute is represented by a widget in your form. You provide your own widgets
through the `AspectsSource` via widget identifier. The form generator is agnostic
of your widgets, because it doesn't know which widget to use for each attribute.
You must provide your own `widget mapping function`, which is called when
an attribute is about to be rendered and returns identifier for the
widget based on the context. The library provides instance of [Attribute](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Attribute.js)
as a parameter for the function. Through the `Attribute`, you can access the whole Rich Model.

Example of such function:
```javascript
var widgetMappingFunction = function (attribute) {
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
```

### Generating the form

When `AspectsSource` is provided and you have defined your widget mapping function,
you are ready to generate the form. Class [Nutforms](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/Nutforms.js)
provides function `generateForm()` which takes contextual parameters and HTML Element, generates the form
and appends it to the given element.

You must provide the following parameters:
- `htmlElement` - HTML Element to which the form will be appended
- `entityName` - Name of the entity for which the form is rendered
- `locale` - Identifier of the current locale
- `entityId` - ID of the entity, this value can be `null` if you are creating a new one
- `widgetMapping` - The widget mapping function you defined earlier
- `context` - Name of the business operation for which the form is generated

```javascript
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
```

### Submitting the form & listening to events

Finally, you can listen to events of the generation and of the Model and its Attributes.
These events are listed here:
- `NutformsActions`: Actions produced by the `Nutforms` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/NutformsActions.js).
- `ModelActions`: Actions produced by the `Model` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/ModelActions.js).
- `AttributeActions`: Actions produced by the `Attribute` class. Take a look at [source code](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/actions/AttributeActions.js).

The most crucial event is `NutformsAsctions.FORM_SUBMITTED`, which is triggered when
a submit button of the form is clicked by the user and the form is submitted.
For example, you can register your callback functions which sends the form input
data to your server, where you save it. Alternatively, you can validate the
input before sending it to the server, and if the validation fails, you can
display the errors. When the submission is successful, we recommend redirecting
the user so multiple submissions are prevented. Also, a notice or a flash message
is a good way to improve the user experience.

You can listen to the events by calling `listen()` method on the `Nutforms` object.
We recommend subsribing for the events before the form is generated so there are
no blind spots where the user can submit the form without you noticing.
```javascript
Nutforms.listen(NutformsActions.FORM_SUBMITTED, function (model, values) {
    console.log("Form submitted", model, values);
    // Validate your data here
    // Create your HTTP POST/PUT request here
    // Redirect the user and display flash message here
});
```

### Summary

Full example of Nutforms library form generation:

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

Example of such ID is `cz.cvut.fel.nutforms.example.model.Bug[log]` for
entity `cz.cvut.fel.nutforms.example.model.Bug` and attribute `log`.

You can simply access each field by its ID:
```javascript
var formField = document.getElementByID("cz.cvut.fel.nutforms.example.model.Bug[log]");
```
