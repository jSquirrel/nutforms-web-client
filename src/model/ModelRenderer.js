import AttributeIterator from './AttributeIterator.js'
import DOMHelper from './../helper/DOMHelper.js'
import * as ModelActions from './../actions/ModelActions.js'

export default class ModelRenderer {

    /**
     * Renderer for Model.
     */
    constructor() {
        this.model = null;
    }

    /**
     * Bins to Model instance.
     * @param {Model} model The Model to bind to.
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
        let parser = new DOMParser();
        let layoutDOM = parser.parseFromString(this.model.layout.layoutString, "text/html");
        let attributeIterator = new AttributeIterator(this.model);

        // Add form label
        DOMHelper.findElementsWithAttribute(layoutDOM, "nf-form-label").forEach((formLabel) => {
            formLabel.innerHTML = this.model.localization.formLabel;
        });

        // Add explicit first
        DOMHelper.findElementsWithAttribute(layoutDOM, "nf-field-widget").forEach((field) => {
            let attributeName = field.getAttribute("nf-field-widget");
            let attribute = attributeIterator.getByName(attributeName);
            if (attribute) {
                attribute.renderer.render(field);
            }
        });

        // Add implicit
        while (attributeIterator.hasNext()) {
            let attribute = attributeIterator.getNext();
            let element = document.createElement("div");
            attribute.renderer.render(element);
            let forms = layoutDOM.getElementsByTagName("form");
            for (let i = 0; i < forms.length; i++) {
                forms[i].appendChild(element);
            }
        }

        // Add form submit
        // TODO: load users definition?
        let submit =
            "<div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\" nf-submit=\"submit\" value=\""
            + this.model.localization.submitLabel
            + "\" /></div>";

        htmlElement.innerHTML = new XMLSerializer().serializeToString(layoutDOM) + submit;
        this.bindListeners(htmlElement);
    }

    /**
     * Binds listeners to the generated form.
     * @param {HTMLElement} htmlElement The HTML element containing the form.
     */
    bindListeners(htmlElement) {
        let values = DOMHelper.findElementsWithAttribute(htmlElement, "nf-field-widget-value");
        for (var k = 0, o = values.length; k < o; k++) {
            let value = values[k];
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attribute = this.model.attributes[attributeName];

            // Adding event listeners to attributes
            value.addEventListener("keyup", () => {
                console.log("keyup", value);
                attribute.setValue(value.value);
            }, false);
            value.addEventListener("change", () => {
                console.log("change", value);
                attribute.setValue(value.value);
            }, false);
            value.addEventListener("blur", () => {
                console.log("blur", value);
                attribute.setValue(value.value);
            }, false);

            // Set unique id
            value.setAttribute("id", this.model.entityName + "[" + attributeName + "]");
        }

        let submits = DOMHelper.findElementsWithAttribute(htmlElement, "nf-submit");
        let model = this.model;
        if (submits.length > 0) {
            let submit = submits.shift(); // TODO: Improvement: what about other submits?
            submit.addEventListener("click", (e) => {
                e.preventDefault();

                // Transform values from model into simple object
                let valuesObject = {};
                for (var k = 0, o = values.length; k < o; k++) {
                    let value = values[k];
                    let attributeName = value.getAttribute("nf-field-widget-value");
                    valuesObject[attributeName] = value.value;
                }

                this.model.trigger(ModelActions.SUBMITTED, model, valuesObject);
            });
        }
    }

}
