import Observable from './../observer/Observable.js'

export default class Attribute extends Observable {

    /**
     * Represents Attribute of Nutforms Rich Model.
     * @param {string} name                         Unique name of the Attribute. Also servers as identifier.
     * @param {string} type                         Type of the Attribute.
     * @param {*} value                             Value of the Attribute. Can be null.
     * @param {boolean} primary                     Is this the primary Attribute of the Model?
     * @param {AttributeLocalization} localization  Localization of the Attribute.
     * @param {AttributeRenderer} renderer          Renderer of the Attribute.
     */
    constructor(name, type, value, primary, localization, renderer) {
        super();
        this.name = name;
        this.type = type;
        this.value = value;
        this.primary = primary;
        this.localization = localization ? localization.bind(this) : null;
        this.renderer = renderer ? renderer.bind(this) : null;
        this.model = null;
    }

    /**
     * Binds to the given Model instance.
     * @param {Model} model The instance of Model to bind to.
     * @returns {Attribute}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
