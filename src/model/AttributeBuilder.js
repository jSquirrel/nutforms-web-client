import Attribute from './Attribute.js'
import AttributeRenderer from './AttributeRenderer.js'

export default class AttributeBuilder {

    constructor() {
        this.name = null;
        this.type = null;
        this.value = null;
        this.primary = false;
        this.localization = null;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setPrimary(primary) {
        this.primary = primary;
        return this;
    }

    addRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    /**
     * @param {AttributeLocalization} localization
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
