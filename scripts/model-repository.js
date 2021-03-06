'use strict';

function findAsset(model, id) {
    let found = model.assets.filter(function (p) {
        return p.id === id;
    });
    if(found.length) {
        return found[0];
    }
    return null;
}

function remove(assets, id) {
    return assets.filter(function (p) {
        return p.id != id;
    });
}

function createModel (storage) {
    function get() {
        let model = {
            assets: []
        };
        if (storage && storage.model) {
            try {
                var parsed = JSON.parse(storage.model);
                if (parsed.assets !== undefined) {
                    return parsed;
                }
                return model;
            } catch (error) {
                return model;
            }
        }
        return model;
    }

    function addAsset(asset) {
        const id = asset.id;
        let model = get();
        if(id && findAsset(model, id)) {
            model.assets = remove(model.assets, id);
        } else {
            asset.id = Date.now();
        }
        model.assets.push(asset);
        save(model);
    }


    function deleteAsset (id) {
        let model = get();
        model.assets = remove(model.assets, id);
        save(model);
    }

    function save(model) {
        if(!storage) { return; }
        storage.model = JSON.stringify(model);
    }
    return {
        get: get,
        save: save,
        addAsset: addAsset,
        deleteAsset: deleteAsset
    };

}
module.exports = createModel;
