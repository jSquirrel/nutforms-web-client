
export default class ModelRenderer {

    constructor() {
        this.model = null;
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
