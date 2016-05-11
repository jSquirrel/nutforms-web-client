export default class ValuesParser {

    /**
     * @param {object} rawValues
     * @param {ModelBuilder} modelBuilder
     */
    parse(rawValues, modelBuilder) {
        // let values = JSON.parse(rawValues);
        let values = rawValues;

        Object.keys(values).forEach((key) => {
            if (modelBuilder.hasAttributeBuilder(key)) {
                modelBuilder.getAttributeBuilder(key).setValue(values[key]);
            } else if (modelBuilder.hasRelationBuilder(key)) {
                modelBuilder.getRelationBuilder(key).setValue(values[key]);
            }
        });
    }

}
