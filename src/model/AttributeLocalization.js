
export default class AttributeLocalization {

    /**
     * Contains Localization aspect data for Attribute.
     * @param {string} label        Label of the Attribute.
     * @param {string} placeholder  Placeholder of the Attribute.
     */
    constructor(label, placeholder) {
        this.label = label;
        this.placeholder = placeholder;
    }

    /**
     * Binds to Attribute instance.
     * @param {Attribute} attribute The Attribute to bind to.
     * @returns {AttributeLocalization}
     */
    bind(attribute) {
        this.attribute = attribute;
        return this;
    }

}
