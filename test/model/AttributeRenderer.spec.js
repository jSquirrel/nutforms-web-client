"use strict";

let chai = require('chai');

chai.should();

import AttributeRenderer from '../../src/model/AttributeRenderer.js';

describe('AttributeRenderer', () => {
    describe('#bind', () => {
        let attributeRenderer;

        beforeEach(() => {
            attributeRenderer = new AttributeRenderer();
        });

        it('returns itself', () => {
            let attribute = "attribute";
            attributeRenderer.bind(attribute).should.equal(attributeRenderer);
        });

        it('binds to given attribute', () => {
            let attribute = "attribute";
            attributeRenderer.bind(attribute);
            attributeRenderer.attribute.should.equal(attribute);
        });
    });
});
