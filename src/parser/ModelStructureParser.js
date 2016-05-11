import AttributeBuilder from './../model/AttributeBuilder.js'
import RelationBuilder from './../model/RelationBuilder.js'

/**
 * Parses model structure metadata from JSON and calls appropriate methods on given builder.
 */
export default class ModelStructureParser {

    /**
     * @param {string} rawMetadata
     * @param {ModelBuilder} modelBuilder
     */
    parse(rawMetadata, modelBuilder) {
        // try {
        //     let metadata = JSON.parse(rawMetadata);
        // } catch (e) {
        //     console.error(e);
        // }
        let metadata = rawMetadata;

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
