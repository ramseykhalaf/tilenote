Meteor.publish('floorsPublic', function() {
    return Floors.find({userId: null});    
});

Meteor.publish('floorsByUserId', function(userId) {
    return Floors.find({userId: userId});
});

Meteor.publish('tilesByFloorId', function(floorId) {
    return Tiles.find({floorId: floorId});
});
