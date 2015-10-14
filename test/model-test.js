'use strict';
let createModel = require('../scripts/model.js');
const assert = require('assert');

describe('model', () => {
    describe('get', () => {
        it('gets the model from localStorage', () => {
            const storage = {
                model: '{}'
            };

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, {});
        });

        it('doesn\'t throw if unparsable model sotred', () => {
            const storage = {
                model: '{5^'
            };

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, { properties: []});
        });

        it('doesn\'t throw if no storage', () => {
            const storage = null;

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, { properties: []});
        });
    });

    describe('save', () => {
        it('persists to storage', () => {
            const storage = {};
            const model = createModel(storage);
            const state = { a: 'bc'};

            model.save(state);
            assert.deepEqual(storage.model, '{"a":"bc"}');
        });

        it('doesn\'t throw if no storage', () => {
            const storage = null;
            const model = createModel(storage);
            const state = { a: 'bc'};

            assert.doesNotThrow( () => {model.save(state);});
        });
    });

    describe('add property', () => {
        it('adds a new property', () => {
            let storage = {
                model: '{ "properties": [ {} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.addProperty({});
            let model = modelRepo.get();
            assert.equal(model.properties.length, 2);
        });
    });
});
