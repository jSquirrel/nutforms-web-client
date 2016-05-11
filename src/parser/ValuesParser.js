export default class ValuesParser {

    /**
     * Model values parser.
     */
    constructor() {
    }

    /**
     * Parses model values and calls appropriate methods on ModelBuilder.
     * @param {object} values               Values of the model.
     * @param {ModelBuilder} modelBuilder   ModelBuilder instance.
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
