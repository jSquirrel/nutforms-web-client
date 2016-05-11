
export default class Layout {

    /**
     * @param {string} layoutString
     */
    constructor(layoutString) {
        this.layoutString = layoutString;
        this.model = null;
    }

    /**
     * @param {Model} model
     * @returns {Layout}
     */
    bind(model) {
        this.model = model;
        return this;
    }

}
