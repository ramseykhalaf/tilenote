Tiles = new Meteor.Collection('tiles');

Tiles.allow({
    insert: function(userId, doc) {
        return !!Floors.findOne({ _id: doc.floorId, ownerId: userId });
    },
    update: function(userId, doc) {
        return !!Floors.findOne({ _id: doc.floorId, ownerId: userId });
    }
});
