import ModelLocalization from './../model/ModelLocalization.js'
import AttributeLocalization from './../model/AttributeLocalization'

export default class LocalizationParser {

    /**
     * Localization aspect parser.
     */
    constructor() {
    }

    /**
     * Parses localization aspect data and calls appropriate methods on ModelBuilder.
     * @param {string} localizationData     Localization aspect data.
     * @param {ModelBuilder} modelBuilder   ModelBuilder instance.
     */
    parse(localizationData, modelBuilder) {
        modelBuilder.addLocalization(new ModelLocalization(
            localizationData["form.label"],
            localizationData["form.submit.value"]
        ));

        Object.keys(modelBuilder.attributeBuilders).forEach((key) => {
            modelBuilder.getAttributeBuilder(key)
                .addLocalization(new AttributeLocalization(
                    localizationData[`form.${key}.label`],
                    null // TODO: placeholder?
                ));
        });

        Object.keys(modelBuilder.relationBuilders).forEach((key) => {
            modelBuilder.getRelationBuilder(key)
                .addLocalization(new AttributeLocalization(
                    localizationData[`form.${key}.label`],
                    null // TODO: placeholder?
                ));
        });
    }

}
