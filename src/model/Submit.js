import * as ModelActions from './../actions/ModelActions.js'

export default class Submit {

    /**
     * Contains handlers for form submission.
     */
    constructor() {
        this.model = null;
    }

    /**
     * Binds to Model instance.
     * @param {Model} model The Model to bind to.
     * @returns {Submit}
     */
    bind(model) {
        this.model = model;
        return this;
    }

    /**
     * Updates values of the model by settings values for each attribute.
     * @param {object} values Object with Attribute names as keys and Attribute values as values.
     * @throws Will throw an error if Attribute with given name does not exist.
     */
    submit(values) {
        Object.keys(values).forEach((key) => {
            if (this.model.attributes.hasOwnProperty(key)) {
                this.model.attributes[key].setValue(values[key]);
            } else if (this.model.relations.hasOwnProperty(key)) {
                this.model.relations[key].setValue(values[key]);
            }
        });
        this.model.trigger(ModelActions.SUBMITTED, this.model);
    }

}
