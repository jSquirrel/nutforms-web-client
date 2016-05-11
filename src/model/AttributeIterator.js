

export default class AttributeIterator {

    constructor(model) {
        this.attributes = model.attributes;
        this.relations = model.relations;
    }

    /**
     * @returns {boolean}
     */
    hasNext() {
        return Object.keys(this.attributes).length + Object.keys(this.relations).length > 0;
    }

    /**
     * @returns {Attribute|null}
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

    getByName(name) {
        if (this.attributes.hasOwnProperty(name)) {
            let attribute = this.attributes[name];
            delete this.attributes[name];
            return attribute;
        } else if (this.relations.hasOwnProperty(name)) {
            let relation = this.relations[name];
            delete this.relations[name];
            return relation;
        }
    }

}
