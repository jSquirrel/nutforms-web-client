import Model from './Model.js'
import AttributeBuilder from './AttributeBuilder.js'
import RelationBuilder from './RelationBuilder.js'

export default class ModelBuilder {

    constructor() {
        this.attributeBuilders = {};
        this.relationBuilders = {};
        this.localization = null;
        this.renderer = null;
        this.layout = null;
        this.aspectsSource = null;
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

    addLocalization(localization) {
        this.localization = localization;
        return this;
    }

    addRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    addLayout(layout) {
        this.layout = layout;
        return this;
    }

    addAspectsSource(aspectsSource) {
        this.aspectsSource = aspectsSource;
        return this;
    }

    build() {
        return new Model(
            this.buildAttributes(),
            this.buildRelations(),
            this.localization,
            this.renderer,
            this.layout,
            this.aspectsSource
        );
    }

    /**
     * @private
     * @returns {Object}
     */
    buildAttributes() {
        let attributes = {};
        Object.keys(this.attributeBuilders).forEach((key) => {
            let attributeBuilder = this.attributeBuilders[key];
            attributes[key] = attributeBuilder.build();
        });
        return attributes;
    }

    /**
     * @private
     * @returns {Object}
     */
    buildRelations() {
        let relations = {};
        Object.keys(this.relationBuilders).forEach((key) => {
            let relationBuilder = this.relationBuilders[key];
            relations[key] = relationBuilder.build();
        });
        return relations;
    }

}
