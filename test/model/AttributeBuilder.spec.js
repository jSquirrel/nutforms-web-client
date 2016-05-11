"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import AttributeBuilder from '../../src/model/AttributeBuilder.js';
import AttributeLocalization from '../../src/model/AttributeLocalization.js';
import AttributeRenderer from '../../src/model/AttributeRenderer.js'


describe('AttributeBuilder', () => {
    describe('#build', () => {
        it('creates Attribute with given parameters', () => {
            let attributeBuilder = new AttributeBuilder();
            let name = "name";
            let type = "type";
            let value = "value";
            let primary = false;
            let localization = new AttributeLocalization("label", "placeholder");
            let renderer = new AttributeRenderer();

            let attribute = attributeBuilder
                .setName(name)
                .setType(type)
                .setValue(value)
                .setPrimary(primary)
                .addLocalization(localization)
                .addRenderer(renderer)
                .build();

            attribute.name.should.equal(name);
            attribute.type.should.equal(type);
            attribute.value.should.equal(value);
            attribute.primary.should.equal(primary);
            attribute.localization.should.equal(localization);
            localization.attribute.should.equal(attribute);
            attribute.renderer.should.equal(renderer);
            renderer.attribute.should.equal(attribute);
        });
    });
});
