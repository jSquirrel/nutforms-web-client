"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import RelationBuilder from '../../src/model/RelationBuilder.js';
import AttributeLocalization from '../../src/model/AttributeLocalization.js';
import AttributeRenderer from '../../src/model/AttributeRenderer.js'


describe('RelationBuilder', () => {
    describe('#build', () => {
        it('creates Relation with given parameters', () => {
            let relationBuilder = new RelationBuilder();
            let name = "name";
            let type = "type";
            let value = "value";
            let primary = false;
            let localization = new AttributeLocalization("label", "placeholder");
            let renderer = new AttributeRenderer();
            let targetEntity = "targetEntity";

            let relation = relationBuilder
                .setName(name)
                .setType(type)
                .setValue(value)
                .setPrimary(primary)
                .addLocalization(localization)
                .addRenderer(renderer)
                .setTargetEntity(targetEntity)
                .build();

            relation.name.should.equal(name);
            relation.type.should.equal(type);
            relation.value.should.equal(value);
            relation.primary.should.equal(primary);
            relation.localization.should.equal(localization);
            localization.attribute.should.equal(relation);
            relation.renderer.should.equal(renderer);
            renderer.attribute.should.equal(relation);
            relation.targetEntity.should.equal(targetEntity);
        });
    });
});
