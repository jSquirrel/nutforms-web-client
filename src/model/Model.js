import Observable from './Observable.js'

export default class Model extends Observable {

    constructor(entityName, attributes, relations, localization, renderer, layout, aspectsSource, widgetMapping, context) {
        super();
        this.entityName = entityName;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization ? localization.bind(this) : localization;
        this.renderer = renderer ? renderer.bind(this) : renderer;
        this.layout = layout ? layout.bind(this) : layout;
        this.aspectsSource = aspectsSource;
        this.widgetMapping = widgetMapping;
        this.context = context;

        Object.keys(attributes).forEach((key) => {
            this.attributes[key].bind(this);
        });
        Object.keys(relations).forEach((key) => {
            this.relations[key].bind(this);
        });
    }

}
