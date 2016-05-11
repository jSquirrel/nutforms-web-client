import Attribute from './Attribute.js'

export default class Relation extends Attribute {

    /**
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {boolean} primary
     * @param {AttributeLocalization} localization
     * @param {string} targetEntity
     */
    constructor(name, type, value, primary, localization, relation, targetEntity) {
        super(name, type, value, primary, localization, relation);
        this.targetEntity = targetEntity;
    }

}
