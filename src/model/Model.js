import Observable from './../observer/Observable.js'
import * as ModelActions from './../actions/ModelActions.js'

export default class Model extends Observable {

    /**
     * Represents a Model and holds all its components and contextual parameters.
     * @param {string} entityName               Name of the represented entity-
     * @param {object} attributes               Map of Model's Attributes.
     * @param {object} relations                Map of Model's Relations.
     * @param {ModelLocalization} localization  Localization of the Model.
     * @param {ModelRenderer} renderer          Renderer of the Model.
     * @param {Layout} layout                   Layout of the Model.
     * @param {object} aspectsSource            AspectsResource instance.
     * @param {function} widgetMapping          Widget mapping function.
     * @param {string} context                  Business operation identifier.
     */
    constructor(entityName, attributes, relations, localization, renderer, layout, aspectsSource, widgetMapping, context) {
        super();
        this.entityName = entityName;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization ? localization.bind(this) : localization;
        this.renderer = renderer ? renderer.bind(this) : renderer;
        this.layout = layout ? layout.bind(this) : layout;
        this.aspectsSource = aspectsSource;
        this.widgetMapping = widgetMapping;
        this.context = context;

        Object.keys(attributes).forEach((key) => {
            this.attributes[key].bind(this);
        });
        Object.keys(relations).forEach((key) => {
            this.relations[key].bind(this);
        });
    }

    /**
     * Updates values of the model by settings values for each attribute.
     * @param {object} values Object with Attribute names as keys and Attribute values as values.
     * @throws Will throw an error if Attribute with given name does not exist.
     */
    formSubmitted(values) {
        Object.keys(values).forEach((key) => {
            if (this.attributes.hasOwnProperty(key)) {
                this.attributes[key].setValue(values[key]);
            } else if (this.relations.hasOwnProperty(key)) {
                this.relations[key].setValue(values[key]);
            }
        });
        this.trigger(ModelActions.SUBMITTED, this);
    }

}
