import Observable from './Observable.js'

export default class Model extends Observable {

    constructor(attributes, relations, localization) {
        super();
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization ? localization.bind(this) : localization;
    }

}
