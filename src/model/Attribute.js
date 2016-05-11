import Observable from './Observable.js'

export default class Attribute extends Observable {

    /**
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {boolean} primary
     * @param {AttributeLocalization} localization
     * @param {AttributeRenderer} renderer
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
     * Binds to the given Model.
     * @param {Model} model
     * @returns {Attribute}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
