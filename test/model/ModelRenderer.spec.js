"use strict";

let chai = require('chai');

chai.should();

import ModelRenderer from '../../src/model/ModelRenderer.js';

describe('ModelRenderer', () => {
    describe('#bind', () => {
        let modelRenderer;

        beforeEach(() => {
            modelRenderer = new ModelRenderer();
        });

        it('returns itself', () => {
            let model = "model";
            modelRenderer.bind(model).should.equal(modelRenderer);
        });

        it('binds to given model', () => {
            let model = "model";
            modelRenderer.bind(model);
            modelRenderer.model.should.equal(model);
        });
    });
});
