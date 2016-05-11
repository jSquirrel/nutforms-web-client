export default class AttributeRenderer {

    constructor() {
        this.attribute = null;
    }

    /**
     * @param {Attribute} attribute
     * @returns {AttributeRenderer}
     */
    bind(attribute) {
        this.attribute = attribute;
        return this;
    }

    render(htmlElement) {
        htmlElement.innerHTML = "input"; // TODO: add widget
    }

}
