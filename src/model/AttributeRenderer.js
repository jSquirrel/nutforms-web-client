export default class AttributeRenderer {

    /**
     * Renderer for Attribute of Rich Model.
     */
    constructor() {
        this.attribute = null;
    }

    /**
     * Binds to Attribute instance.
     * @param {Attribute} attribute The Attribute to bind to.
     * @returns {AttributeRenderer}
     */
    bind(attribute) {
        this.attribute = attribute;
        return this;
    }

    /**
     * Renders the Attribute widget and appends it to HTMLElement.
     * <p>
     * First, the widget is determined by widget mapping function.
     * Then, the values are injected to the widget.
     * Finally, the attribute is bound to the HTMLElement.
     * </p>
     * @param {HTMLElement} htmlElement The HTMLElement to bind the field to.
     */
    render(htmlElement) {
        htmlElement.innerHTML =
            this.injectWidgetValues(
                this.attribute.model.aspectsSource.fetchWidget(
                    this.getWidgetName()
                )
            );
    }

    /**
     * Determines widget name.
     * @returns {string}
     * @private
     */
    getWidgetName() {
        return this.attribute.model.widgetMapping(
            this.attribute.model.entityName,
            this.attribute.model.context,
            this.attribute.name,
            this.attribute.type,
            this.attribute.primary
        );
    }

    /**
     * Injects attribute values by replacing the widget meta instructions.
     * @param {string} widgetString The widget DSL.
     * @returns {string}
     * @private
     */
    injectWidgetValues(widgetString) {
        widgetString = widgetString.replace(new RegExp('{attribute.name}', 'g'), this.attribute.name);
        widgetString = widgetString.replace(new RegExp('{attribute.formLabel}', 'g'), this.attribute.localization.label);
        widgetString = widgetString.replace(new RegExp('{attribute.value}', 'g'), this.attribute.value);
        return widgetString;
    }

}
