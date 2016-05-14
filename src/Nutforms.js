import ModelBuilder from './model/ModelBuilder.js'
import ModelRenderer from './model/ModelRenderer.js'
import Layout from './model/Layout.js'
import Submit from './model/Submit.js'
import Observable from './observer/Observable.js'
import ModelStructureParser from './parser/ModelStructureParser.js'
import ValuesParser from './parser/ValuesParser.js'
import LocalizationParser from './parser/LocalizationParser.js'
import * as ModelActions from './actions/ModelActions.js'
import * as NutformsActions from './actions/NutformsActions.js'

export default class Nutforms extends Observable {

    /**
     * Facade for Nutforms form generation subsystem.
     */
    constructor() {
        super();
        this.aspectsSource = null;
    }

    /**
     * Sets AspectsSource implementation to the library.
     * @param source
     */
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
            this.aspectsSource.fetchStructureMetadata(entityName),
            this.aspectsSource.fetchLocalizationData(entityName, locale, context),
            this.aspectsSource.fetchValues(entityName, entityId),
            this.aspectsSource.fetchLayout(layout)
        ]).then((values) => {
            this.trigger(NutformsActions.ASPECTS_FETCHED, values);
            let model = this.buildModel(...values, entityName, locale, widgetMapping, context);
            model.listen(ModelActions.SUBMITTED, (model, values) => {
                this.trigger(NutformsActions.FORM_SUBMITTED, model, values);
            });
            this.trigger(NutformsActions.MODEL_BUILT, model);
            model.renderer.render(htmlElement);
            this.trigger(NutformsActions.FORM_RENDERED, model, htmlElement);
            console.log("Nutforms: form generated successfully!");
        });
    }

    /**
     * Builds the Rich Model from context parameters and aspects definitions.
     *
     * @param {*} structureMetadata
     * @param {*} localizationData
     * @param {*} values
     * @param {string} layout
     * @param {string} entityName
     * @param {string} locale
     * @param {function} widgetMapping
     * @param {string} context
     * @returns {Model}
     */
    buildModel(structureMetadata, localizationData, values, layout, entityName, locale, widgetMapping, context) {
        // Preps the parsers
        let structureParser = new ModelStructureParser();
        let valuesParser = new ValuesParser();
        let localizationParser = new LocalizationParser();

        // Creates builder and sets context parameters
        let builder = new ModelBuilder()
                .setEntityName(entityName)
                .setLocale(locale)
                .addRenderer(new ModelRenderer())
                .addLayout(new Layout(layout))
                .addSubmit(new Submit())
                .addAspectsSource(this.aspectsSource)
                .setWidgetMapping(widgetMapping)
                .setContext(context)
            ;

        // Calls the aspect DSLs parsers, who call appropriate functions on ModelBuilder
        structureParser.parse(structureMetadata, builder);
        valuesParser.parse(values, builder);
        localizationParser.parse(localizationData, builder);

        return builder.build();
    }

}
