Tiles = new Meteor.Collection('tiles');

var allowedUpdateFields = ['title', 'url'];

Tiles.allow({
    insert: function(userId, doc) {
        return !!Floors.findOne({ _id: doc.floorId, ownerId: userId });
    },
    update: function(userId, doc, fieldNames, modifier) {
        return (
            Floors.findOne({ _id: doc.floorId, ownerId: userId }) 
            && !_.difference(fieldNames, allowedUpdateFields).length
        );
    },
    remove: function(userId, doc) {
        return !!Floors.findOne({ _id: doc.floorId, ownerId: userId });
    }
});
