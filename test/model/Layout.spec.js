"use strict";

let chai = require('chai')
    , path = require('path');

chai.should();

import Layout from '../../src/model/Layout.js';

describe('Layout', () => {

    describe('#constructor', () => {
        it('initializes the parameters', () => {
            let layoutString = "layout string";
            let layout = new Layout(layoutString);
            layout.layoutString.should.equal(layoutString);
        });
    });

    describe('#bind', () => {
        let layout;

        beforeEach(() => {
            layout = new Layout("layout string");
        });

        it('returns itself', () => {
            let model = "model";
            layout.bind(model).should.equal(layout);
        });

        it('binds to given model', () => {
            let model = "model";
            layout.bind(model);
            layout.model.should.equal(model);
        });
    });
});
