export default class Layout {

    /**
     * Contains Layout aspect data for Model.
     * @param {string} layoutString
     */
    constructor(layoutString) {
        this.layoutString = layoutString;
        this.model = null;
    }

    /**
     * Binds to Model instance.
     * @param {Model} model The Model to bind to.
     * @returns {Layout}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
