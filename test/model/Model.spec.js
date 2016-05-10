"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import Model from '../../src/model/Model.js';
import ModelLocalization from '../../src/model/ModelLocalization.js';
import ModelRenderer from '../../src/model/ModelRenderer.js';

describe('Model', () => {
    describe('#constructor', () => {
        it('initializes the parameters and binds the components', () => {
            let attributes = ["attr1", "attr2"];
            let relations = ["rel1", "rel2"];
            let primary = false;

            let localization = new ModelLocalization("form label", "submit label");
            let renderer = new ModelRenderer();
            let model = new Model(attributes, relations, localization, renderer);

            model.attributes.should.equal(attributes);
            model.relations.should.equal(relations);
            model.localization.should.equal(localization);
            model.renderer.should.equal(renderer);
            localization.model.should.equal(model);
            renderer.model.should.equal(model);
        });
    });
});
