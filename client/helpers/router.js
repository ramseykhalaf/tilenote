Meteor.Router.add({
	'/floor': {
		to: 'floor_main',
		as: 'showFloor',
		and: function() {
			Session.set('floorId', null);
		}
	},
    '/floor/:_id': {
    	to: 'floor_main',
        as: 'showFloor',
        and: function(_id) {
            Session.set('floorId', _id);
        }
    }
});
