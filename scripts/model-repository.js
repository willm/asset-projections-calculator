'use strict';

function findProperty(model, id) {
    let found = model.properties.filter(function (p) {
        return p.id === id;
    });
    if(found.length) {
        return found[0];
    }
    return null;
}

function remove(properties, id) {
    return properties.filter(function (p) {
        return p.id != id;
    });
}

function createModel (storage) {
    function get() {
        let model = {
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
        const id = property.id;
        let model = get();
        if(id && findProperty(model, id)) {
            model.properties = remove(model.properties, id);
        } else {
            property.id = model.properties.length + 1;
        }
        model.properties.push(property);
        save(model);
    }


    function deleteProperty (id) {
        let model = get();
        model.properties = remove(model.properties, id);
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
