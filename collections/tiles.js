Tiles = new Meteor.Collection2('tiles', {
    schema: {
        floorId: {
            type: String
        },
        title: {
            type: String
        },
        url: {
            type: String,
            label: 'URL'
        },
        thumbnailLink: {
            type: String
        }
    }
});

ownFloorOfTile = function(userId, tile) {
    if(userId && tile) {
        return !!Floors.findOne({ _id: tile.floorId, ownerId: userId });
    }
    return false;
};

var allowedUpdateFields = ['title', 'url', 'thumbnailLink'];

Tiles.allow({
    insert: ownFloorOfTile,
    update: ownFloorOfTile,
    remove: ownFloorOfTile
});

Tiles.deny({
    update: function(userId, doc, fieldNames, modifier) {
        return _.difference(fieldNames, allowedUpdateFields).length;
    }
});

//Client code
Tiles.beforeInsert = function tilesBeforeInsert(formDoc) {
    formDoc.thumbnailLink = generateThumbnailLink(formDoc.url);
    console.log(formDoc);
    return formDoc;
};

Tiles.beforeUpdate = function tilesBeforeUpdate(tileId, modifier) {
    if (modifier.$set.url) {
        modifier.$set.thumbnailLink = generateThumbnailLink(modifier.$set.url);
    }
    return modifier;
};

Tiles.callbacks({
    insert: function(error, tileId) {
        console.log(arguments);
        if (tileId) {
            Router.go('showFloor', {_id: Tiles.findOne(tileId).floorId});
        }
    },
    update: function(error) {
        if (error) {
            console.log(error);
        }
    }
});