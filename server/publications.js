Meteor.publish('floorsPublic', function() {
    return Floors.find({isPublic: true});    
});

Meteor.publish('floorsOwned', function() {
    return Floors.find({ownerId: this.userId});
});

Meteor.publish('tilesByFloorId', function(floorId) {
    return Tiles.find({floorId: floorId});
});
