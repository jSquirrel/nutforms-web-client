"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import AttributeLocalization from '../../src/model/AttributeLocalization.js';

describe('AttributeLocalization', () => {

    describe('#constructor', () => {
        it('initializes the parameters', () => {
            let label = "label";
            let placeholder = "placeholder";
            let attributeLocalization = new AttributeLocalization(label, placeholder);
            attributeLocalization.label.should.equal(label);
            attributeLocalization.placeholder.should.equal(placeholder);
        });
    });

    describe('#bind', () => {
        let attributeLocalization;

        beforeEach(() => {
            attributeLocalization = new AttributeLocalization("label", "placeholder");
        });

        it('returns itself', () => {
            let attribute = "attribute";
            attributeLocalization.bind(attribute).should.equal(attributeLocalization);
        });

        it('binds to given attribute', () => {
            let attribute = "attribute";
            attributeLocalization.bind(attribute);
            attributeLocalization.attribute.should.equal(attribute);
        });
    });
});
