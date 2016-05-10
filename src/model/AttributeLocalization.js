
export default class AttributeLocalization {

    /**
     * @param {string} label
     * @param {string} placeholder
     */
    constructor(label, placeholder) {
        this.label = label;
        this.placeholder = placeholder;
    }

    /**
     * @param {Attribute} attribute
     * @returns {AttributeLocalization}
     */
    bind(attribute) {
        this.attribute = attribute;
        return this;
    }

}
