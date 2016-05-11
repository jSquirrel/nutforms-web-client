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
                    bind: function (model) {
                        this._bindCalled = true;
                    }
                },
                {
                    name: "attr2",
                    _bindCalled: false,
                    bind: function (model) {
                        this._bindCalled = true;
                    }
                }
            ];
            let relations = [
                {
                    name: "rel1",
                    _bindCalled: false,
                    bind: function (model) {
                        this._bindCalled = true;
                    }
                }
            ];


            let localization = new ModelLocalization("form label", "submit label");
            let renderer = new ModelRenderer();
            let layout = {
                layoutString: "layout1",
                _bindCalled: false,
                bind: function (model) {
                    this._bindCalled = true;
                    return this;
                }
            };
            let aspectsSource = {"name": "NutformsApiAspectsSource"};

            let model = new Model(attributes, relations, localization, renderer, layout, aspectsSource);

            model.attributes.should.equal(attributes);
            model.relations.should.equal(relations);
            model.localization.should.equal(localization);
            localization.model.should.equal(model);
            model.renderer.should.equal(renderer);
            renderer.model.should.equal(model);
            model.layout.should.equal(layout);
            model.aspectsSource.should.equal(aspectsSource);

            attributes[0]._bindCalled.should.equal(true);
            attributes[1]._bindCalled.should.equal(true);
            relations[0]._bindCalled.should.equal(true);

            layout._bindCalled.should.equal(true);
        });
    });
});
