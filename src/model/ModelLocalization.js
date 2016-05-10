
export default class ModelLocalization {

    /**
     * @param {string} formLabel
     * @param {string} submitLabel
     */
    constructor(formLabel, submitLabel) {
        this.formLabel = formLabel;
        this.submitLabel = submitLabel;
    }

    /**
     * @param {Model} model
     * @returns {ModelLocalization}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
