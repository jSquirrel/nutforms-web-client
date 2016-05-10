import AttributeBuilder from './../model/AttributeBuilder.js'
import RelationBuilder from './../model/RelationBuilder.js'

/**
 * Parses model structure metadata from JSON and calls appropriate methods on given builder.
 */
export default class ModelStructureParser {

    /**
     *
     * @param {string} rawMetadata
     * @returns {{attributeBuilders: AttributeBuilder[], relationBuilders: RelationBuilder[]}}
     */
    parse(rawMetadata) {
        let metadata = JSON.parse(rawMetadata);
        let attributeBuilders = [];
        let relationBuilders = [];

        if (metadata.hasOwnProperty("attributes")) {
            metadata.attributes.forEach((attribute) => {
                let attributeBuilder = new AttributeBuilder();
                attributeBuilder
                    .setName(attribute.name)
                    .setType(attribute.type)
                    .setPrimary(attribute.is_primary);

                attributeBuilders[attribute.name] = attributeBuilder;
            });
        }

        // TODO: relations

        return {
            attributeBuilders: attributeBuilders,
            relationBuilders: relationBuilders
        };
    }

}
