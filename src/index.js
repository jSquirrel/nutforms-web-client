import NutformsApiAspectsSource from './aspectsSource/NutformsApiAspectsSource.js';

import ModelBuilder from './model/ModelBuilder.js'
import ModelRenderer from './model/ModelRenderer.js'


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

    generateForm(htmlElement, entityName, locale, entityId, layout, widgetMapping) {
        Promise.all([
            this.aspectsSource.getStructureMetadata(entityName),
            this.aspectsSource.getLocalizationData(entityName, locale),
            this.aspectsSource.getValues(entityName, entityId)
            // TODO: layout, widgets?
        ]).then((values) => {
            let model = this.buildModel(
                values.shift(),
                values.shift(),
                values.shift()
            );
            model.renderer = new ModelRenderer();
            model.renderer.bind(model);
            model.renderer.render(htmlElement);
        });
    }

    buildModel(structureMetadata, localizationData, values) {

        console.log(structureMetadata, localizationData, values);

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
window.NutformsApiAspectsSource = NutformsApiAspectsSource;
