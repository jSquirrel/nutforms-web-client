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
        htmlElement.innerHTML = this.attribute.model.widgetMapping(
            this.attribute.model.entityName,
            this.attribute.model.context,
            this.attribute.name,
            this.attribute.type,
            this.attribute.primary
        ); // TODO: add widget
    }

}
