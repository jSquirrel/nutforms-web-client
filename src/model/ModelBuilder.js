import Model from './Model.js'
import AttributeBuilder from './AttributeBuilder.js'
import RelationBuilder from './RelationBuilder.js'

export default class ModelBuilder {

    constructor() {
        // this.attributes = [];
        // this.relations = [];
        this.attributeBuilders = [];
        this.relationBuilders = [];
        this.localization = null;
        this.renderer = null;
    }



    getAttributeBuilder(name) {
        if (!this.attributeBuilders.hasOwnProperty(name)) {
            this.attributeBuilders[name] = new AttributeBuilder();
        }
        return this.attributeBuilders[name];
    }

    hasAttributeBuilder(name) {
        return this.attributeBuilders.hasOwnProperty(name);
    }

    getRelationBuilder(name) {
        if (!this.relationBuilders.hasOwnProperty(name)) {
            this.relationBuilders[name] = new RelationBuilder();
        }
        return this.relationBuilders[name];
    }

    hasRelationBuilder(name) {
        return this.relationBuilders.hasOwnProperty(name);
    }


    // addAttribute(attribute) {
    //     this.attributes.push(attribute);
    //     return this;
    // }
    //
    // addRelation(relation) {
    //     this.relations.push(relation);
    //     return this;
    // }

    addLocalization(localization) {
        this.localization = localization;
        return this;
    }

    addRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    build() {
        return new Model(
            this.buildAttributes(),
            this.buildRelations(),
            this.localization,
            this.renderer
        );
    }

    /**
     * @private
     * @returns {Array}
     */
    buildAttributes() {
        let attributes = [];
        this.relationBuilders.forEach((attributeBuilder) => {
            attributes.push(attributeBuilder.build());
        });
        return attributes;
    }

    /**
     * @private
     * @returns {Array}
     */
    buildRelations() {
        let relations = [];
        this.relationBuilders.forEach((attributeBuilder) => {
            relations.push(attributeBuilder.build());
        });
        return relations;
    }

}
