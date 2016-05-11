import Attribute from './Attribute.js'
import AttributeRenderer from './AttributeRenderer.js'

export default class AttributeBuilder {

    /**
     * Contains logic for building Attribute instance.
     */
    constructor() {
        this.name = null;
        this.type = null;
        this.value = null;
        this.primary = false;
        this.localization = null;
    }

    /**
     * Sets name of the Attribute.
     * @param {string} name  Name of the Attribute.
     * @returns {AttributeBuilder}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Sets type of the Attribute.
     * @param {string} type  Type of the Attribute.
     * @returns {AttributeBuilder}
     */
    setType(type) {
        this.type = type;
        return this;
    }

    /**
     * Sets value of the Attribute.
     * @param {*} value Value of the Attribute.
     * @returns {AttributeBuilder}
     */
    setValue(value) {
        this.value = value;
        return this;
    }


    /**
     * Sets primary flag of the Attribute.
     * @param {boolean} primary The primary flag.
     * @returns {AttributeBuilder}
     */
    setPrimary(primary) {
        this.primary = primary;
        return this;
    }

    /**
     * Adds AttributeRenderer to the Attribute.
     * @param {AttributeRenderer} renderer The renderer.
     * @returns {AttributeBuilder}
     */
    addRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    /**
     * Adds AttributeLocalization to the Attribute.
     * @param {AttributeLocalization} localization The localization.
     * @returns {AttributeBuilder}
     */
    addLocalization(localization) {
        this.localization = localization;
        return this;
    }

    /**
     * Builds and returns the Attribute.
     * @returns {Attribute}
     */
    build() {
        return new Attribute(
            this.name,
            this.type,
            this.value,
            this.primary,
            this.localization,
            this.renderer ? this.renderer : new AttributeRenderer() // TODO: remove wired instantiation
        );
    }

}
