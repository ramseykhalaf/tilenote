Meteor.publish('floorsPublic', function() {
    return Floors.find({ownerId: null});    
});

Meteor.publish('floorsByOwnerId', function(userId) {
    return Floors.find({ownerId: userId});
});

Meteor.publish('tilesByFloorId', function(floorId) {
    return Tiles.find({floorId: floorId});
});