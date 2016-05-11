"use strict";

let chai = require('chai')
    , path = require('path')
    , expect = require('chai').expect;

chai.should();
chai.expect();

import LocalizationParser from '../../src/parser/LocalizationParser.js';
import ModelBuilder from '../../src/model/ModelBuilder.js'

describe('ValuesParser', () => {
    describe('#parse', () => {
        let parser;

        beforeEach(() => {
            parser = new LocalizationParser();
        });

        it('parses JSON adds localization to ModelBuilder and its AttributeBuilders', () => {

            let modelBuilder = new ModelBuilder();
            modelBuilder.getAttributeBuilder("id");
            modelBuilder.getAttributeBuilder("description");
            modelBuilder.getAttributeBuilder("log");
            modelBuilder.getRelationBuilder("project");

            // parser.parse(
            //     '{' +
            //     '"form.label": "form label",' +
            //     '"form.submit.value": "form submit label",' +
            //     '"form.id.label": "id",' +
            //     '"form.description.label": "description",' +
            //     '"form.log.label": "log",' +
            //     '"form.project.label": "project"' +
            //     '}',
            //     modelBuilder
            // );

            parser.parse(
                {
                    "form.label": "form label",
                    "form.submit.value": "form submit label",
                    "form.id.label": "id",
                    "form.description.label": "description",
                    "form.log.label": "log",
                    "form.project.label": "project"
                },
                modelBuilder
            );

            modelBuilder.localization.formLabel.should.equal("form label");
            modelBuilder.localization.submitLabel.should.equal("form submit label");

            let attributeBuilders = modelBuilder.attributeBuilders;

            expect(attributeBuilders).to.have.property('id');
            attributeBuilders.id.localization.label.should.equal("id");

            expect(attributeBuilders).to.have.property('description');
            attributeBuilders.description.localization.label.should.equal("description");

            expect(attributeBuilders).to.have.property('log');
            attributeBuilders.log.localization.label.should.equal("log");

            let relationBuilders = modelBuilder.relationBuilders;

            expect(relationBuilders).to.have.property('project');
            relationBuilders.project.localization.label.should.equal("project");
        });
    });
});
