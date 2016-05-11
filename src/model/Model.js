import Observable from './Observable.js'

export default class Model extends Observable {

    constructor(attributes, relations, localization, renderer, layout) {
        super();
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization ? localization.bind(this) : localization;
        this.renderer = renderer ? renderer.bind(this) : renderer;
        this.layout = layout ? layout.bind(this) : layout;
    }

}
