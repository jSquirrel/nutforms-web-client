import Observable from './Observable.js'

export default class Attribute extends Observable {

    /**
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {boolean} primary
     * @param {AttributeLocalization} localization
     */
    constructor(name, type, value, primary, localization) {
        super();
        this.name = name;
        this.type = type;
        this.value = value;
        this.primary = primary;
        this.localization = localization ? localization.bind(this) : null;
    }

}
