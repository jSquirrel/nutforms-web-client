import Observable from './Observable.js'

export default class Attribute extends Observable {

    constructor(name, type, primary, localization) {
        this.name = name;
        this.type = type;
        this.primary = primary;
        this.localization = localization ? localization.bind(this) : null;
    }

}
