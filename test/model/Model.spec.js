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
            let attributes = [
                {
                    name: "attr1",
                    _bindCalled: false,
                    bind: function(model) {
                        this._bindCalled = true;
                    }
                },
                {
                    name: "attr2",
                    _bindCalled: false,
                    bind: function(model) {
                        this._bindCalled = true;
                    }
                }
            ];
            let relations = [
                {
                    name: "rel1",
                    _bindCalled: false,
                    bind: function(model) {
                        this._bindCalled = true;
                    }
                }];
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

            attributes[0]._bindCalled.should.equal(true);
            attributes[1]._bindCalled.should.equal(true);
            relations[0]._bindCalled.should.equal(true);
        });
    });
});
