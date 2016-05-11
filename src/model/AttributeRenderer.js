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
        let widgetName = this.attribute.model.widgetMapping(
            this.attribute.model.entityName,
            this.attribute.model.context,
            this.attribute.name,
            this.attribute.type,
            this.attribute.primary
        );

        let widgetString = this.attribute.model.aspectsSource.getWidget(widgetName);
        widgetString = widgetString.replace(new RegExp('{attribute.name}', 'g'), this.attribute.name);
        widgetString = widgetString.replace(new RegExp('{attribute.formLabel}', 'g'), this.attribute.localization.label);
        widgetString = widgetString.replace(new RegExp('{attribute.value}', 'g'), this.attribute.value);

        htmlElement.innerHTML = widgetString;
    }

}
