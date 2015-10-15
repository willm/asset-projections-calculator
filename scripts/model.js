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

    function addProperty(property) {
        var model = get();
        property.id = model.properties.length + 1;
        model.properties.push(property);
        save(model);
    }

    function deleteProperty (id) {
        var model = get();
        model.properties = model
            .properties
            .filter(function (p) {
                return p.id != id;
            });
        save(model);
    }

    function save(model) {
        if(!storage) { return; }
        storage.model = JSON.stringify(model);
    }
    return {
        get: get,
        save: save,
        addProperty: addProperty,
        deleteProperty: deleteProperty
    };
}
module.exports = createModel;
