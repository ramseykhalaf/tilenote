Template.floor_list_item.events({
	'click .delete': function(e) {
		Floors.remove(this._id);
	}
});