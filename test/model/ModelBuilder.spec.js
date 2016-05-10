"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import ModelBuilder from '../../src/model/ModelBuilder.js';
import ModelLocalization from '../../src/model/ModelLocalization.js';
import ModelRenderer from '../../src/model/ModelRenderer.js';


describe('ModelBuilder', () => {
    describe('#build', () => {
        it('creates Model with given parameters', () => {
            let modelBuilder = new ModelBuilder();

            let localization = new ModelLocalization("label", "placeholder");
            let renderer = new ModelRenderer();

            let model = modelBuilder
                .addAttribute("attr1")
                .addAttribute("attr2")
                .addRelation("rel1")
                .addRelation("rel2")
                .addLocalization(localization)
                .addRenderer(renderer)
                .build();

            model.attributes.should.include("attr1");
            model.attributes.should.include("attr2");
            model.relations.should.include("rel1");
            model.relations.should.include("rel2");
            model.localization.should.equal(localization);
            model.renderer.should.equal(renderer);
        });
    });
});
