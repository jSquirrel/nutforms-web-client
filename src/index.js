import NutformsApiAspectsSource from './aspectsSource/NutformsApiAspectsSource.js';

import ModelBuilder from './model/ModelBuilder.js'
import ModelRenderer from './model/ModelRenderer.js'
import Layout from './model/Layout.js'


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

    /**
     * Dynamically generates the form, weaves all the aspects in and binds it to the given HTML Element.
     *
     * @param {HTMLElement} htmlElement     Element to bind the form to.
     * @param {string} entityName           Unique name of the entity.
     * @param {string} locale               Unique name of the locale.
     * @param {number} entityId             ID of the entity.
     * @param {string} layout               Unique name of the layout.
     * @param {function} widgetMapping      Widget mapping function.
     * @param {string} context              Unique name of the business operation.
     */
    generateForm(htmlElement, entityName, locale, entityId, layout, widgetMapping, context) {
        Promise.all([
            this.aspectsSource.getStructureMetadata(entityName),
            this.aspectsSource.getLocalizationData(entityName, locale),
            this.aspectsSource.getValues(entityName, entityId),
            this.aspectsSource.getLayout(layout)
        ]).then((values) => {
            let model = this.buildModel(...values, widgetMapping, context);
            model.renderer.render(htmlElement);
        });
    }

    buildModel(structureMetadata, localizationData, values, layout, widgetMapping, context) {

        console.log(structureMetadata, localizationData, values);

        let structureParser = new ModelStructureParser();
        let valuesParser = new ValuesParser();
        let localizationParser = new LocalizationParser();

        let builder = new ModelBuilder();

        structureParser.parse(structureMetadata, builder);
        valuesParser.parse(values, builder);
        localizationParser.parse(localizationData, builder);

        builder
            .addRenderer(new ModelRenderer())
            .addLayout(new Layout(layout))
            .addAspectsSource(this.aspectsSource)
            .setWidgetMapping(widgetMapping)
            .setContext(context)
        ;

        return builder.build();
    }

}

window.Nutforms = new Nutforms();
window.NutformsApiAspectsSource = NutformsApiAspectsSource;
