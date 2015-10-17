'use strict';
const createModel = require('../scripts/model-repository');
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
                model: '{ "properties": [ { "id": 1} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.addProperty({});
            let model = modelRepo.get();
            assert.equal(model.properties.length, 2);
            assert.equal(model.properties[1].id, 2);
        });

        it('updates when property already exists', () => {
            const storage = { model: '{"properties": [{"id": 1, "value":100}]}'};
            const model = createModel(storage);
            const state = { value: 500, id: 1};

            model.addProperty(state);
            assert.deepEqual(storage.model, '{"properties":[{"value":500,"id":1}]}');
        });
    });

    describe('delete property', () => {
        it('deletes a new property', () => {
            let storage = {
                model: '{ "properties": [ { "id": 1}, {"id": 2} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.deleteProperty(1);
            let model = modelRepo.get();
            assert.equal(model.properties.length, 1);
            assert.equal(model.properties[0].id, 2);
        });

        it('can delete all properties', () => {
            let storage = {
                model: '{ "properties": [ { "id": 1}, {"id": 2} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.deleteProperty(1);
            modelRepo.deleteProperty(2);
            let model = modelRepo.get();
            assert.equal(model.properties.length, 0);
        });
    });
});
