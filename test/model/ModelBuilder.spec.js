"use strict";

let chai = require('chai')
    , expect = require('chai').expect;

chai.should();

import ModelBuilder from '../../src/model/ModelBuilder.js';
import ModelLocalization from '../../src/model/ModelLocalization.js';
import ModelRenderer from '../../src/model/ModelRenderer.js';
import Layout from '../../src/model/Layout.js'
import AttributeBuilder from '../../src/model/AttributeBuilder.js';
import RelationBuilder from '../../src/model/RelationBuilder.js';


describe('ModelBuilder', () => {
    describe('#build', () => {
        it('creates Model with given parameters', () => {
            let modelBuilder = new ModelBuilder();

            let localization = new ModelLocalization("label", "placeholder");
            let renderer = new ModelRenderer();
            let layout = new Layout("layout string");
            let aspectsSource = {"name": "NutformsApiAspectsSource"};
            let widgetMapping = "widget mapping function";
            let context = "business operation name";

            modelBuilder.getAttributeBuilder("attr1").setName("attr1");
            modelBuilder.getAttributeBuilder("attr2").setName("attr2");
            modelBuilder.getRelationBuilder("rel1").setName("rel1");

            let model = modelBuilder
                .addLocalization(localization)
                .addRenderer(renderer)
                .addLayout(layout)
                .addAspectsSource(aspectsSource)
                .setWidgetMapping(widgetMapping)
                .setContext(context)
                .build();

            model.localization.should.equal(localization);
            model.renderer.should.equal(renderer);
            model.layout.should.equal(layout);
            model.aspectsSource.should.equal(aspectsSource);
            model.widgetMapping.should.equal(widgetMapping);
            model.context.should.equal(context);
            expect(model.attributes).to.have.property('attr1');
            expect(model.attributes).to.have.property('attr2');
            expect(model.relations).to.have.property('rel1');
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
            expect(modelBuilder.relationBuilders).to.have.property(name);
            expect(modelBuilder.relationBuilders[name]).to.be.an.instanceof(RelationBuilder);
        });
    });
});
