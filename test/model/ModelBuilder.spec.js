"use strict";

let chai = require('chai')
    , expect = require('chai').expect;

chai.should();

import ModelBuilder from '../../src/model/ModelBuilder.js';
import ModelLocalization from '../../src/model/ModelLocalization.js';
import ModelRenderer from '../../src/model/ModelRenderer.js';
import AttributeBuilder from '../../src/model/AttributeBuilder.js';
import RelationBuilder from '../../src/model/RelationBuilder.js';


describe('ModelBuilder', () => {
    describe('#build', () => {
        it('creates Model with given parameters', () => {
            let modelBuilder = new ModelBuilder();

            let localization = new ModelLocalization("label", "placeholder");
            let renderer = new ModelRenderer();

            let model = modelBuilder
                .addLocalization(localization)
                .addRenderer(renderer)
                .build();

            model.localization.should.equal(localization);
            model.renderer.should.equal(renderer);
        });
    });

    describe('#hasAtributeBuilder', () => {
        let modelBuilder;

        beforeEach(() => {
            modelBuilder = new ModelBuilder();
        });

        it('returns true if it has one', () => {
            let name = "name";
            modelBuilder.attributeBuilders[name] = "sth";
            modelBuilder.hasAttributeBuilder(name).should.equal(true);
        });

        it('returns false if it doesnt have one', () => {
            let name = "name";
            modelBuilder.hasAttributeBuilder(name).should.equal(false);
        });
    });

    describe('#getAtributeBuilder', () => {
        let modelBuilder;

        beforeEach(() => {
            modelBuilder = new ModelBuilder();
        });

        it('returns existing AttributeBuilder if it has one', () => {
            let name = "name";
            let attributeBuilder = "sth";
            modelBuilder.attributeBuilders[name] = attributeBuilder;
            modelBuilder.getAttributeBuilder(name).should.equal(attributeBuilder);
        });

        it('returns new AttributeBuilder if it doesnt have one', () => {
            let name = "name";
            expect(modelBuilder.getAttributeBuilder(name)).to.be.an.instanceof(AttributeBuilder);
        });
    });

    describe('#hasRelationBuilder', () => {
        let modelBuilder;

        beforeEach(() => {
            modelBuilder = new ModelBuilder();
        });

        it('returns true if it has one', () => {
            let name = "name";
            modelBuilder.relationBuilders[name] = "sth";
            modelBuilder.hasRelationBuilder(name).should.equal(true);
        });

        it('returns false if it doesnt have one', () => {
            let name = "name";
            modelBuilder.hasRelationBuilder(name).should.equal(false);
        });
    });

    describe('#getRelationBuilder', () => {
        let modelBuilder;

        beforeEach(() => {
            modelBuilder = new ModelBuilder();
        });

        it('returns existing RelationBuilder if it has one', () => {
            let name = "name";
            let relationBuilder = "sth";
            modelBuilder.relationBuilders[name] = relationBuilder;
            modelBuilder.getRelationBuilder(name).should.equal(relationBuilder);
        });

        it('returns new RelationBuilder if it doesnt have one', () => {
            let name = "name";
            expect(modelBuilder.getRelationBuilder(name)).to.be.an.instanceof(RelationBuilder);
        });
    });
});
