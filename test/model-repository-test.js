'use strict';
const createModel = require('../scripts/model-repository');
const assert = require('assert');

describe('model', () => {
    describe('get', () => {
        it('gets the model from localStorage', () => {
            const storage = {
                model: '{"assets": []}'
            };

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, {assets: []});
        });

        it('doesn\'t throw if unparsable model sotred', () => {
            const storage = {
                model: '{5^'
            };

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, { assets: []});
        });

        it('returns a new model if no assets property exists', () => {
            const storage = {
                model: '{"property": "some-old-schema"}'
            };

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, { assets: []});
        });

        it('doesn\'t throw if no storage', () => {
            const storage = null;

            const model = createModel(storage);
            const actual = model.get();
            assert.deepEqual(actual, { assets: []});
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

    describe('add asset', () => {
        it('adds a new asset', () => {
            let storage = {
                model: '{ "assets": [ { "id": 1} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.addAsset({});
            let model = modelRepo.get();
            assert.equal(model.assets.length, 2);
            assert.notEqual(model.assets[1].id, 1);
            assert.notEqual(model.assets[1].id, undefined);
        });

        it('updates when asset already exists', () => {
            const storage = { model: '{"assets": [{"id": 1, "value":100}]}'};
            const model = createModel(storage);
            const state = { value: 500, id: 1};

            model.addAsset(state);
            assert.deepEqual(storage.model, '{"assets":[{"value":500,"id":1}]}');
        });
    });

    describe('delete asset', () => {
        it('deletes a new asset', () => {
            let storage = {
                model: '{ "assets": [ { "id": 1}, {"id": 2} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.deleteAsset(1);
            let model = modelRepo.get();
            assert.equal(model.assets.length, 1);
            assert.equal(model.assets[0].id, 2);
        });

        it('can delete all assets', () => {
            let storage = {
                model: '{ "assets": [ { "id": 1}, {"id": 2} ] }'
            };
            const modelRepo = createModel(storage);
            modelRepo.deleteAsset(1);
            modelRepo.deleteAsset(2);
            let model = modelRepo.get();
            assert.equal(model.assets.length, 0);
        });
    });
});
