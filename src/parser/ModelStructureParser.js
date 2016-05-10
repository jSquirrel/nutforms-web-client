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
        let metadata = JSON.parse(rawMetadata);

        if (metadata.hasOwnProperty("attributes")) {
            metadata.attributes.forEach((attribute) => {
                let attributeBuilder = modelBuilder.getAttributeBuilder(attribute.name);
                attributeBuilder
                    .setName(attribute.name)
                    .setType(attribute.type)
                    .setPrimary(attribute.is_primary);

            });
        }

        // TODO: relations
    }

}
