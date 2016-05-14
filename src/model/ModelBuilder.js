import Model from './Model.js'
import AttributeBuilder from './AttributeBuilder.js'
import RelationBuilder from './RelationBuilder.js'

export default class ModelBuilder {

    /**
     * Contains logic for building Model instance.
     */
    constructor() {
        this.entityName = null;
        this.locale = null;
        this.attributeBuilders = {};
        this.relationBuilders = {};
        this.localization = null;
        this.renderer = null;
        this.layout = null;
        this.submit = null;
        this.aspectsSource = null;
        this.widgetMapping = null;
        this.context = null;
    }

    /**
     * Sets name of the represented entity.
     * @param {string} entityName Identifier of the entity.
     * @returns {ModelBuilder}
     */
    setEntityName(entityName) {
        this.entityName = entityName;
        return this;
    }

    /**
     * Sets name of the locale.
     * @param {string} locale Identifier of the locale.
     * @returns {ModelBuilder}
     */
    setLocale(locale) {
        this.locale = locale;
        return this;
    }

    /**
     * Returns AttributeBuilder for Attribute with given name.
     * If there isn't one yet, builds a new one.
     * @param {string} name Name of the Attribute.
     * @returns {AttributeBuilder}
     */
    getAttributeBuilder(name) {
        if (!this.attributeBuilders.hasOwnProperty(name)) {
            this.attributeBuilders[name] = new AttributeBuilder();
        }
        return this.attributeBuilders[name];
    }

    /**
     * Finds out whether AttributeBuilder for Attribute with given name has already been created.
     * Returns true if it was, false if not.
     * @param {string} name Name of the Attribute.
     * @returns {boolean}
     */
    hasAttributeBuilder(name) {
        return this.attributeBuilders.hasOwnProperty(name);
    }

    /**
     * Returns RelationBuilder for Relation with given name.
     * If there isn't one yet, builds a new one.
     * @param {string} name Name of the Relation.
     * @returns {RelationBuilder}
     */
    getRelationBuilder(name) {
        if (!this.relationBuilders.hasOwnProperty(name)) {
            this.relationBuilders[name] = new RelationBuilder();
        }
        return this.relationBuilders[name];
    }

    /**
     * Finds out whether RelationBuilder for Relation with given name has already been created.
     * Returns true if it was, false if not.
     * @param {string} name Name of the Relation.
     * @returns {boolean}
     */
    hasRelationBuilder(name) {
        return this.relationBuilders.hasOwnProperty(name);
    }

    /**
     * Adds ModelLocalization.
     * @param {ModelLocalization} localization The ModelLocalization to add.
     * @returns {ModelBuilder}
     */
    addLocalization(localization) {
        this.localization = localization;
        return this;
    }

    /**
     * Adds ModelRenderer.
     * @param {ModelRenderer} renderer The ModelRenderer to add.
     * @returns {ModelBuilder}
     */
    addRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    /**
     * Adds Layout.
     * @param {Layout} layout The Layout to add.
     * @returns {ModelBuilder}
     */
    addLayout(layout) {
        this.layout = layout;
        return this;
    }

    /**
     * Adds Submit.
     * @param {Submit} submit The Submit to add.
     * @returns {ModelBuilder}
     */
    addSubmit(submit) {
        this.submit = submit;
        return this;
    }

    /**
     * Adds AspectsSource.
     * @param {object} aspectsSource The AspectsSource to add.
     * @returns {ModelBuilder}
     */
    addAspectsSource(aspectsSource) {
        this.aspectsSource = aspectsSource;
        return this;
    }

    /**
     * Sets widget mapping function.
     * @param {function} widgetMapping The function to add.
     * @returns {ModelBuilder}
     */
    setWidgetMapping(widgetMapping) {
        this.widgetMapping = widgetMapping;
        return this;
    }

    /**
     * Sets name of the business operation.
     * @param {string} context Name of the business operation.
     * @returns {ModelBuilder}
     */
    setContext(context) {
        this.context = context;
        return this;
    }

    /**
     * Builds the Model instance with all parameters and returns it.
     * @returns {Model}
     */
    build() {
        return new Model(
            this.entityName,
            this.locale,
            this.buildAttributes(),
            this.buildRelations(),
            this.localization,
            this.renderer,
            this.layout,
            this.submit,
            this.aspectsSource,
            this.widgetMapping,
            this.context
        );
    }

    /**
     * Builds all Attributes by calling the AttributeBuilders.
     * @returns {Object}
     * @private
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
     * Builds all Model's Relations by calling the RelationBuilders.
     * @returns {Object}
     * @private
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
