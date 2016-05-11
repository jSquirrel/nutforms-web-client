import AttributeIterator from './AttributeIterator.js'

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
        while(attributeIterator.hasNext()) {
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
    }

}

class DOMHelper {

    /**
     * Finds all elements in the document which have attribute with given name.
     *
     * @param {Element|HTMLDocument} doc
     * @param {string} attribute
     * @returns {Array}
     */
    static findElementsWithAttribute(doc, attribute) {
        let matchingElements = [];
        let allElements = doc.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

}
