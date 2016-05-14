"use strict";

let chai = require('chai')
    , path = require('path')
    , expect = require('chai').expect;

chai.should();
chai.expect();

import AttributeIterator from '../../src/model/AttributeIterator.js';

describe('AttributeIterator', () => {
    describe('#constructor', () => {
        it('initializes the parameters', () => {
            let model = {
                attributes: {
                    id: {},
                    description: {},
                    log: {}
                },
                relations: {
                    project: {}
                }
            };
            let attributeIterator = new AttributeIterator(model);
            attributeIterator.attributes.length.should.equal(3);
            attributeIterator.relations.length.should.equal(1);
        });
    });

    describe('#hasNext', () => {
        let model = {
            attributes: {},
            relations: {}
        };
        let attributeIterator;

        beforeEach(() => {
            attributeIterator = new AttributeIterator(model);
        });

        it('returns true if there are attributes left', () => {
            attributeIterator.attributes.push({});
            attributeIterator.hasNext().should.equal(true);
        });

        it('returns true if there are relations left', () => {
            attributeIterator.relations.push({});
            attributeIterator.hasNext().should.equal(true);
        });

        it('returns false if there no attributes nor relations left', () => {
            attributeIterator.hasNext().should.equal(false);
        });
    });

    describe('#getNext', () => {
        let attributeIterator;
        let model = {
            attributes: {},
            relations: {}
        };

        beforeEach(() => {
            attributeIterator = new AttributeIterator(model);
        });

        it('should return the next attribute if there are some left and remove it from the list', () => {
            let attribute = {name: "id"};
            attributeIterator.attributes.push(attribute);
            attributeIterator.getNext().should.equal(attribute);
            attributeIterator.attributes.length.should.equal(0);
        });

        it('should return the next relation if there are no attributes left and remove it from the list', () => {
            let relation = {name: "project"};
            attributeIterator.relations.push(relation);
            attributeIterator.getNext().should.equal(relation);
            attributeIterator.relations.length.should.equal(0);
        });

        it('should return null if there are no attributes nor relations left', () => {
            expect(attributeIterator.getNext()).to.be.null;
        });
    });

    describe('#getByName', () => {
        let attributeIterator;
        let model = {
            attributes: {},
            relations: {}
        };

        beforeEach(() => {
            attributeIterator = new AttributeIterator(model);
        });

        it('should return the attribute if it exists and remove it from the list', () => {
            let attribute = {name: "id"};
            attributeIterator.attributes.push(attribute);
            attributeIterator.getByName("id").should.equal(attribute);
            attributeIterator.attributes.length.should.equal(0);
        });

        it('should return the relation if it exists and remove it from the list', () => {
            let relation = {name: "project"};
            attributeIterator.relations.push(relation);
            attributeIterator.getByName("project").should.equal(relation);
            attributeIterator.relations.length.should.equal(0);
        });

        it('should return null if the attribute nor the relation exists', () => {
            expect(attributeIterator.getByName("unknown")).to.be.null;
        });
    });


});
