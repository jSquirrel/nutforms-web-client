"use strict";

let chai = require('chai')
    , path = require('path')
    , expect = require('chai').expect;

chai.should();
chai.expect();

import ModelStructureParser from '../../src/parser/ModelStructureParser.js';
import ModelBuilder from '../../src/model/ModelBuilder.js'

describe('ModelStructureParser', () => {
    describe('#parse', () => {
        let parser;

        beforeEach(() => {
            parser = new ModelStructureParser();
        });

        it('parses JSON and creates array of AttributeBuilders and RelationBuilders', () => {

            let modelBuilder = new ModelBuilder();

            let builders = parser.parse(
                '{' +
                '"attributes": [' +
                '{' +
                '"name": "description",' +
                '"type": "java.lang.String",' +
                '"is_primary": false' +
                '},' +
                '{' +
                '"name": "log",' +
                '"type": "java.lang.String",' +
                '"is_primary": false' +
                '},' +
                '{' +
                '"name": "id",' +
                '"type": "java.lang.Long",' +
                '"is_primary": true' +
                '}' +
                '],' +
                '"relationships": [' +
                '{' +
                '"name": "project",' +
                '"type": "ToOne",' +
                '"target_entity": "cz. cvut.fel.nutforms.example.model.Project"' +
                '}' +
                ']' +
                '}',
                modelBuilder
            );

            let attributeBuilders = modelBuilder.attributeBuilders;

            expect(attributeBuilders).to.have.property('id');
            attributeBuilders.id.name.should.equal("id");
            attributeBuilders.id.type.should.equal("java.lang.Long");

            expect(attributeBuilders).to.have.property('description');
            attributeBuilders.description.name.should.equal("description");
            attributeBuilders.description.type.should.equal("java.lang.String");

            expect(attributeBuilders).to.have.property('log');
            attributeBuilders.log.name.should.equal("log");
            attributeBuilders.log.type.should.equal("java.lang.String");

            // TODO: relation builders
        });
    });
});
