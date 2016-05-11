import Relation from './Relation.js'
import AttributeBuilder from './AttributeBuilder.js'

export default class RelationBuilder extends AttributeBuilder {

    constructor() {
        super();
        this.targetEntity = null;
    }

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
            this.targetEntity
        );
    }

}