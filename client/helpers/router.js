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
    		//Session.set('floorId', null);
    	}
    },
    '/floors/:floorId/tiles/new': {
        to: 'tile_form',
        as: 'newTile',
        and: function(floorId) {
            Session.set('floorId');
        }


    },
    '/floors/:floorId/tiles/:_id/edit': {
        to: 'tile_form',
        as: 'editTile',
        and: function(floorId, _id) {
            Session.set('floorId', floorId);
            Session.set('tileId', _id);
        }
    }
});