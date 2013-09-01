Meteor.publish('floors', function() {
    return Floors.find({});
});

Meteor.publish('tilesByFloorId', function(floorId) {
    return Tiles.find({floorId: floorId});
});
