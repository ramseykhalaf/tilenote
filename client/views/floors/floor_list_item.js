Template.floor_list_item.helpers({
	isCurrentFloor: function() {
		return this._id === Session.get('floorId');
	}
});

Template.floor_list_item.events({
    'click .edit': function(evt) {
        evt.preventDefault();
        Meteor.Router.to('editFloor', this);
    }
});