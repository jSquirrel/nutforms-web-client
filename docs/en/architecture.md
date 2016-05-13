# Nutforms Web Client Architecture

## Nutforms facade

The whole form generation subsystem is covered by facade provided
by [Nutforms](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/Nutforms.js) class.

It provides `generateForm()` function, which generates the form and the rich model behind the form
from given context parameters and binds the form to the given HTML element.
The method is made up of these steps
1. First, it fetches the aspects definitions
2. Second, it builds the rich model
3. Third, it renders the form and appends it to the HTML element

## Rich Model

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

## Rich Model Building

The model is build using these builders:
- [AttributeBuilder](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/AttributeBuilder.js) builts `Attribute` class.
- [ModelBuilder](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/model/ModelBuilder.js) builds the `Model` class and contains set of `AttributeBuilder`s.

The builders are directed by the
[Nutforms](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/Nutforms.js) class
and by the aspect definition parsers:
- [ModelStructureParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/ModelStructureParser.js) parses model structure metadata and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s
- [LocalizationParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/LocalizationParser.js) parses localization aspect data and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s
- [ValuesParser](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/parser/ValuesParser.js) parses values aspect data and calls appropriate methods on the `ModelBuilder` and its `AspectBuilder`s

## Aspects Definitions Retrieval

The aspects definitions are retrieved from `AspectsSource` interface.

The library provies default [NutformsApiAspectsSource](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/aspectsSource/NutformsApiAspectsSource.js)
implementation, which provides the aspects from remote Nutforms Server API via HTTP requests.

## Observers

The `Model`, `Attribute` and `Nutforms` classes all extend [Observable](https://github.com/jSquirrel/nutforms-web-client/blob/master/src/observer/Observable.js)
class, which allows them to be listened to by observers and to trigger events which notify the observers.

## Observing events

You can subscribe to events via `listen()`
function. Both objects and functions can be subscribed. The object has to implement method `update()`.
The functions are invoked.

If you wish to unsubscribe from an event, you can use `unsubscribe()` function.

Events can be triggered upon it via `trigger()` function.

```javascript
let observable = new Observable();

let observerFunc = () => {
   // ...
}
observable.listen("change", observerFunc);

let observer = {
    update: () => {
        // ...
    }
}
observable.listen("change", observer)

observable.trigger("change", arg1, arg2);
// Invokes both observerFunc() and observer.update() with arguments arg1 and arg2
```


You can observe all events by subscribing to `all` event. Be careful though, when an event is triggered upon Observable,
the observers registered to all events are passed the triggered event name as the first parameter.

```javascript
let observer = {
    update: () => {
        // ...
    }
}
observable.listen("all", observer)

observable.trigger("change", arg1, arg2);
// Invokes observer.update() with arguments "change", arg1 and arg2
```
