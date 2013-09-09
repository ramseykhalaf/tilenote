Template.tile_list.helpers({
    tiles: function() {
        return Tiles.find();
    },
    currentFloor: function() {
    	return Session.get('floorId');
    },
    ownCurrentFloor: function () {
    	var currentFloor = Floors.findOne(Session.get('floorId')) || {};
    	console.log(currentFloor);
       	return currentFloor.ownerId === Meteor.userId();
    }
});
