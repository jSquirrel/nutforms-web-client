import Model from './Model.js'

export default class ModelBuilder {

    constructor() {
        this.attributes = [];
        this.relations = [];
        this.localization = null;
        this.renderer = null;
    }

    addAttribute(attribute) {
        this.attributes.push(attribute);
        return this;
    }

    addRelation(relation) {
        this.relations.push(relation);
        return this;
    }

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
            this.attributes,
            this.relations,
            this.localization,
            this.renderer
        );
    }

}
