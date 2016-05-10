import ModelLocalization from './../model/ModelLocalization.js'
import AttributeLocalization from './../model/AttributeLocalization'

export default class LocalizationParser {

    /**
     * @param {string} rawLocalizationData
     * @param {ModelBuilder} modelBuilder
     */
    parse(rawLocalizationData, modelBuilder) {
        let localizationData = JSON.parse(rawLocalizationData);

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
