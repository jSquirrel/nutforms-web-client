"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import Attribute from '../../src/model/Attribute.js';
import AttributeLocalization from '../../src/model/AttributeLocalization.js';
import AttributeRenderer from '../../src/model/AttributeRenderer.js';
import * as AttributeActions from '../../src/actions/AttributeActions.js';

describe('Attribute', () => {
    describe('#constructor', () => {
        it('initializes the parameters and binds the components', () => {
            let name = "name";
            let type = "type";
            let value = "value";
            let primary = false;
            let localization = new AttributeLocalization("label", "placeholder");
            let renderer = new AttributeRenderer();
            let attribute = new Attribute(name, type, value, primary, localization, renderer);
            attribute.name.should.equal(name);
            attribute.type.should.equal(type);
            attribute.value.should.equal(value);
            attribute.primary.should.equal(primary);
            attribute.localization.should.equal(localization);
            localization.attribute.should.equal(attribute);
        });
    });

    describe('#bind', () => {
        let attribute;
        let name = "name";
        let type = "type";
        let value = "value";
        let primary = false;
        let localization = new AttributeLocalization("label", "placeholder");
        let renderer = new AttributeRenderer();

        beforeEach(() => {
            attribute = new Attribute(name, type, value, primary, localization, renderer);
        });

        it('returns itself', () => {
            let model = "model";
            attribute.bind(model).should.equal(attribute);
        });

        it('binds to given model', () => {
            let model = "model";
            attribute.bind(model);
            attribute.model.should.equal(model);
        });
    });

    describe('#setValue', () => {
        let attribute;
        let name = "name";
        let type = "type";
        let value = "value";
        let primary = false;
        let localization = new AttributeLocalization("label", "placeholder");
        let renderer = new AttributeRenderer();

        beforeEach(() => {
            attribute = new Attribute(name, type, value, primary, localization, renderer);
        });

        it('sets value', () => {
            let value = "value";
            attribute.setValue(value);
            attribute.value.should.equal(value);
        });

        it('triggers VALUE_CHANGED event with correct parameters', () => {
            let callbackCalled = false;
            let callback = (parameter) => {
                parameter.should.equal(attribute);
                callbackCalled = true;
            };
            attribute.listen(AttributeActions.VALUE_CHANGED, callback);
            attribute.setValue("value");
            callbackCalled.should.equal(true);
        });
    });
});
