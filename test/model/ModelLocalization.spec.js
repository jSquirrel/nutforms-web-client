"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import ModelLocalization from '../../src/model/ModelLocalization.js';

describe('ModelLocalization', () => {

    describe('#constructor', () => {
        it('initializes the parameters', () => {
            let formLabel = "form label";
            let submitLabel = "submit label";
            let modelLocalization = new ModelLocalization(formLabel, submitLabel);
            modelLocalization.formLabel.should.equal(formLabel);
            modelLocalization.submitLabel.should.equal(submitLabel);
        });
    });

    describe('#bind', () => {
        let modelLocalization;

        beforeEach(() => {
            modelLocalization = new ModelLocalization("form label", "submit label");
        });

        it('returns itself', () => {
            let model = "model";
            modelLocalization.bind(model).should.equal(modelLocalization);
        });

        it('binds to given model', () => {
            let model = "model";
            modelLocalization.bind(model);
            modelLocalization.model.should.equal(model);
        });
    });
});
