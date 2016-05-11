import Attribute from './Attribute.js'

export default class Relation extends Attribute {

    /**
     * Represents Relation of Model.
     * @param {string} name                         Name of the Relation.
     * @param {string} type                         Type of the Relation.
     * @param {*} value                             Value of the Relation, can be null.
     * @param {boolean} primary                     Is this the primary Relation in the model?
     * @param {AttributeLocalization} localization  Localization of the Relation.
     * @param {string} targetEntity                 Name of relation's target entity.
     */
    constructor(name, type, value, primary, localization, relation, targetEntity) {
        super(name, type, value, primary, localization, relation);
        this.targetEntity = targetEntity;
    }

}
