export default class ModelStructureParser {

    /**
     * Model structure aspect parser.
     */
    constructor() {
    }

    /**
     * Parses model structure metadata and calls appropriate methods on ModelBuilder.
     * @param {string} metadata             Model structure metadata.
     * @param {ModelBuilder} modelBuilder   ModelBuilder instance.
     */
    parse(metadata, modelBuilder) {
        if (metadata.hasOwnProperty("attributes")) {
            metadata.attributes.forEach((attribute) => {
                let attributeBuilder = modelBuilder.getAttributeBuilder(attribute.name);
                attributeBuilder
                    .setName(attribute.name)
                    .setType(attribute.type)
                    .setPrimary(attribute.is_primary);
            });
        }
        if (metadata.hasOwnProperty("relationships")) {
            metadata.relationships.forEach((relation) => {
                let attributeBuilder = modelBuilder.getRelationBuilder(relation.name);
                attributeBuilder
                    .setName(relation.name)
                    .setType(relation.type)
                    .setTargetEntity(relation.target_entity);
            });
        }
    }

}
