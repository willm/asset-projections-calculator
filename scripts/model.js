'use strict';

function createModel (strg) {
    var storage = strg || localStorage;
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

    function addProperty(property) {
        var model = get();
        model.properties.push(property);
        save(model);
    }

    function save(model) {
        if(!storage) { return; }
        storage.model = JSON.stringify(model);
    }
    return {
        get: get,
        save: save,
        addProperty: addProperty
    };
}
module.exports = createModel;
