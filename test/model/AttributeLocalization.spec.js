"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import AttributeLocalization from '../../src/model/AttributeLocalization';

describe('AttributeLocalization', () => {
    describe('#bind', () => {
        let attributeLocalization;

        beforeEach(() => {
            attributeLocalization = new AttributeLocalization("label", "placeholder");
        });

        it('returns itself', () => {
            let attribute = "attribute";
            attributeLocalization.bind(attribute).should.equal(attributeLocalization);
        });
    });
});
