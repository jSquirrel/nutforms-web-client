
export default class ModelRenderer {

    constructor() {
        this.model = null;
    }

    /**
     * @param {Model} model
     * @returns {ModelRenderer}
     */
    bind(model) {
        this.model = model;
        return this;
    }

    /**
     * @param {HTMLElement} htmlElement
     */
    render(htmlElement) {
        var output = "<form>";

        output += "<h2>" + this.model.localization.formLabel + "</h2>";

        Object.keys(this.model.attributes).forEach((key) => {
            let attribute = this.model.attributes[key];
            output += attribute.localization.label + ": <input value=\"" + attribute.value + "\"/>"
        });

        output += "<input type='submit' value='" + this.model.localization.submitLabel + "' />";

        output += "</form>";
        htmlElement.innerHTML = output;
    }

}
