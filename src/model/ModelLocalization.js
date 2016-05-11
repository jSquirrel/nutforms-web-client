export default class ModelLocalization {

    /**
     * Holds localization aspect data for Model.
     * @param {string} formLabel        Label of the form.
     * @param {string} submitLabel      Label of form's submit button.
     */
    constructor(formLabel, submitLabel) {
        this.formLabel = formLabel;
        this.submitLabel = submitLabel;
    }

    /**
     * Binds to Model instance.
     * @param {Model} model The Model to bind to.
     * @returns {ModelLocalization}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
