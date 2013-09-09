Template.floor_list_item.helpers({
	currentFloor: function() {
		return this._id === Session.get('floorId');
	},
	ownFloor: function() {
		return this.ownerId === Meteor.userId()
	},
	tileCount: function() {
		return Tiles.find().count();
	}
});

Template.floor_list_item.events({
	'click .delete': function(e) {
		Floors.remove(this._id);
	}
});