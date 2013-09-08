Template.floor_list_item.events({
	'click .delete': function(e) {
		console.log(this);
		Floors.remove(this._id);
	}
});