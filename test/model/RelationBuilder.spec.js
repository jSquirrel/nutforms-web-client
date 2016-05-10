"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import RelationBuilder from '../../src/model/RelationBuilder.js';
import AttributeLocalization from '../../src/model/AttributeLocalization.js';


describe('RelationBuilder', () => {
    describe('#build', () => {
        it('creates Relation with given parameters', () => {
            let relationBuilder = new RelationBuilder();
            let name = "name";
            let type = "type";
            let value = "value";
            let primary = false;
            let localization = new AttributeLocalization("label", "placeholder");
            let targetEntity = "targetEntity";

            let relation = relationBuilder
                .setName(name)
                .setType(type)
                .setValue(value)
                .setPrimary(primary)
                .addLocalization(localization)
                .setTargetEntity(targetEntity)
                .build();

            relation.name.should.equal(name);
            relation.type.should.equal(type);
            relation.value.should.equal(value);
            relation.primary.should.equal(primary);
            relation.localization.should.equal(localization);
            relation.targetEntity.should.equal(targetEntity);
            localization.attribute.should.equal(relation);
        });
    });
});
