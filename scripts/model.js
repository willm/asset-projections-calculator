'use strict';

function createModel (storage) {
    function get() {
        var model = {
            properties: []
        };
        if (storage && storage.model) {
            try {
                return JSON.parse(storage.model);
            } catch (error) {
                return model;
            }
        }
        return model;
    }

    function save(model) {
        if(storage) {
            storage.model = JSON.stringify(model);
        }
    }
    return {
        get: get,
        save: save
    };
}
module.exports = createModel;
