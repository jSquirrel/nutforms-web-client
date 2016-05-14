export default class AttributeIterator {

    /**
     * Iterates through Model's Attributes.
     * @param {Model} model The Model instance.
     */
    constructor(model) {
        this.attributes = [];
        this.relations = [];
        Object.keys(model.attributes).forEach((key) => {
            this.attributes.push(model.attributes[key]);
        });
        Object.keys(model.relations).forEach((key) => {
            this.relations.push(model.relations[key]);
        });
    }

    /**
     * Finds out whether there is another Attribute in the iterator.
     * @returns {boolean} True if there is next Attribute in the iterator, false if not.
     */
    hasNext() {
        return this.attributes.length + this.relations.length > 0;
    }

    /**
     * Returns next Attribute and removes it from the Iterator.
     * @returns {Attribute|null} The Attribute or null if there is none left.
     */
    getNext() {
        if (this.attributes.length > 0) {
            return this.attributes.shift();
        } else if (this.relations.length > 0) {
            return this.relations.shift();
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
        let result = null;
        for (let i = 0; i < this.attributes.length; ++i) {
            if (this.attributes[i].name === name) {
                result = this.attributes[i];
                this.attributes = this.removeFromArray(this.attributes, result);
                break;
            }
        }
        for (let i = 0; i < this.relations.length && result == null; ++i) {
            if (this.relations[i].name === name) {
                result = this.relations[i];
                this.relations = this.removeFromArray(this.relations, result);
                break;
            }
        }
        return result;
    }

    /**
     * Removes item by its value from array.
     * @param {array} array The array
     * @returns {array}
     */
    removeFromArray(array) {
        let what, args = arguments, length = args.length, auxillary;
        while (length > 1 && array.length) {
            what = args[--length];
            while ((auxillary = array.indexOf(what)) !== -1) {
                array.splice(auxillary, 1);
            }
        }
        return array;
    };

}
