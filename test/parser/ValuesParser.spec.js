"use strict";

let chai = require('chai')
    , path = require('path')
    , expect = require('chai').expect;

chai.should();
chai.expect();

import ValuesParser from '../../src/parser/ValuesParser.js';
import ModelBuilder from '../../src/model/ModelBuilder.js'

describe('ValuesParser', () => {
    describe('#parse', () => {
        let parser;

        beforeEach(() => {
            parser = new ValuesParser();
        });

        it('parses JSON and creates array of AttributeBuilders and RelationBuilders', () => {

            let modelBuilder = new ModelBuilder();
            modelBuilder.getAttributeBuilder("id");
            modelBuilder.getAttributeBuilder("description");
            modelBuilder.getAttributeBuilder("log");
            modelBuilder.getRelationBuilder("project");

            parser.parse(
                '{' +
                '"id": 1,' +
                '"description": "lorem",' +
                '"log": "ipsum",' +
                '"project": 1' +
                '}',
                modelBuilder
            );

            let attributeBuilders = modelBuilder.attributeBuilders;

            expect(attributeBuilders).to.have.property('id');
            attributeBuilders.id.value.should.equal(1);

            expect(attributeBuilders).to.have.property('description');
            attributeBuilders.description.value.should.equal("lorem");

            expect(attributeBuilders).to.have.property('log');
            attributeBuilders.log.value.should.equal("ipsum");

            let relationBuilders = modelBuilder.relationBuilders;

            expect(relationBuilders).to.have.property("project");
            relationBuilders.project.value.should.equal(1);
        });
    });
});
