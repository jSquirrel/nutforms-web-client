import Observable from './../observer/Observable.js'

export default class Model extends Observable {

    /**
     * Represents a Model and holds all its components and contextual parameters.
     * @param {string} entityName               Name of the represented entity-
     * @param {object} attributes               Map of Model's Attributes.
     * @param {object} relations                Map of Model's Relations.
     * @param {ModelLocalization} localization  Localization of the Model.
     * @param {ModelRenderer} renderer          Renderer of the Model.
     * @param {Layout} layout                   Layout of the Model.
     * @param {Submit} submit                   Submit of the Model.
     * @param {object} aspectsSource            AspectsResource instance.
     * @param {function} widgetMapping          Widget mapping function.
     * @param {string} context                  Business operation identifier.
     */
    constructor(entityName, attributes, relations, localization, renderer, layout, submit, aspectsSource, widgetMapping, context) {
        super();
        this.entityName = entityName;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization ? localization.bind(this) : localization;
        this.renderer = renderer ? renderer.bind(this) : renderer;
        this.layout = layout ? layout.bind(this) : layout;
        this.submit = submit ? submit.bind(this) : submit;
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

}
