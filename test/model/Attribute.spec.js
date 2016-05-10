"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import Attribute from '../../src/model/Attribute.js';
import AttributeLocalization from '../../src/model/AttributeLocalization.js';

describe('Attribute', () => {

    describe('#constructor', () => {
        it('initializes the parameters and binds the components', () => {
            let name = "name";
            let type = "type";
            let value = "value";
            let primary = false;
            let localization = new AttributeLocalization("label", "placeholder");
            let attribute = new Attribute(name, type, value, primary, localization);
            attribute.name.should.equal(name);
            attribute.type.should.equal(type);
            attribute.value.should.equal(value);
            attribute.primary.should.equal(primary);
            attribute.localization.should.equal(localization);
            localization.attribute.should.equal(attribute);
        });
    });
});
