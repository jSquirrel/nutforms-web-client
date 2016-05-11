export default class AttributeIterator {

    /**
     * Iterates through Model's Attributes.
     * @param {Model} model The Model instance.
     */
    constructor(model) {
        this.attributes = model.attributes;
        this.relations = model.relations;
    }

    /**
     * Finds out whether there is another Attribute in the iterator.
     * @returns {boolean} True if there is next Attribute in the iterator, false if not.
     */
    hasNext() {
        return Object.keys(this.attributes).length + Object.keys(this.relations).length > 0;
    }

    /**
     * Returns next Attribute and removes it from the Iterator.
     * @returns {Attribute|null} The Attribute or null if there is none left.
     */
    getNext() {
        if (Object.keys(this.attributes).length > 0) {
            let attributeName = Object.keys(this.attributes).shift();
            let attribute = this.attributes[attributeName];
            delete this.attributes[attributeName];
            return attribute;
        } else if (Object.keys(this.relations).length > 0) {
            let relationName = Object.keys(this.relations).shift();
            let relation = this.relations[relationName];
            delete this.relations[relationName];
            return relation;
        } else {
            return null;
        }
    }

    /**
     * Returns Attribute with given name and removes it from the Iterator.
     * @param {string} name The name of the Attribute.
     * @returns {Attribute}
     */
    getByName(name) {
        if (this.attributes.hasOwnProperty(name)) {
            let attribute = this.attributes[name];
            delete this.attributes[name];
            return attribute;
        } else if (this.relations.hasOwnProperty(name)) {
            let relation = this.relations[name];
            delete this.relations[name];
            return relation;
        } else {
            return null;
        }
    }

}
