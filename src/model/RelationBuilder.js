import Relation from './Relation.js'
import AttributeBuilder from './AttributeBuilder.js'
import AttributeRenderer from './AttributeRenderer.js'

export default class RelationBuilder extends AttributeBuilder {

    /**
     * Contains logic for building Relation instance.
     */
    constructor() {
        super();
        this.targetEntity = null;
    }

    /**
     * Sets Relation's target entity name.
     * @param {string} targetEntity Identifier of the target entity.
     * @returns {RelationBuilder}
     */
    setTargetEntity(targetEntity) {
        this.targetEntity = targetEntity;
        return this;
    }

    /**
     * Builds and returns the Relation.
     * @returns {Relation}
     */
    build() {
        return new Relation(
            this.name,
            this.type,
            this.value,
            this.primary,
            this.localization,
            this.renderer ? this.renderer : new AttributeRenderer(), // TODO: remove wired dependency
            this.targetEntity
        );
    }

}
