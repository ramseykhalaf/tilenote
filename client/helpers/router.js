Meteor.Router.add({
	'/floors/new': {
		to: 'floor_new',
		as: 'newFloor',
		and: function() {
			Session.set('floorId', null);
		}
	},
    '/floors/:_id': {
    	to: 'floor_main',
        as: 'showFloor',
        and: function(_id) {
            Session.set('floorId', _id);
        }
    },
    '/floors': {
    	to: 'floor_main',
    	as: 'listFloors',
    	and: function() {
    		Session.set('floorId', null);
    	}
    },
    '/floors/:_id/tiles/new': {
        to: 'tile_new',
        as: 'newTile'
    }
});
