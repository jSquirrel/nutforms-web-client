import Model from './model/Model.js'
import Attribute from './model/Attribute.js'

import ModelBuilder from './model/ModelBuilder.js'


import ModelStructureParser from './parser/ModelStructureParser.js'
import ValuesParser from './parser/ValuesParser.js'
import LocalizationParser from './parser/LocalizationParser.js'

export default class Nutforms {

    constructor() {
        this.aspectsSource = null;
    }

    setAspectsSource(source) {
        this.aspectsSource = source;
    }

    generateForm() {
        document.write("It works!");
    }

    buildModel(structureMetadata, localizationData, values) {
        let structureParser = new ModelStructureParser();
        let valuesParser = new ValuesParser();
        let localizationParser = new LocalizationParser();

        let builder = new ModelBuilder();

        structureParser.parse(structureMetadata, builder);
        valuesParser.parse(values, builder);
        localizationParser.parse(localizationData, builder);

        return builder.build();
    }

}

window.Nutforms = new Nutforms();
