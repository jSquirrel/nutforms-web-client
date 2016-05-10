export default class ValuesParser {

    /**
     * @param {object} values
     * @param {ModelBuilder} modelBuilder
     */
    parse(values, modelBuilder) {
        Object.keys(values).forEach((key) => {
            if (modelBuilder.hasAttributeBuilder(key)) {
                modelBuilder.getAttributeBuilder(key).setValue(values[key]);
            } else if (modelBuilder.hasRelationBuilder(key)) {
                modelBuilder.getRelationBuilder(key).setValue(values[key]);
            }
        });
    }

}
