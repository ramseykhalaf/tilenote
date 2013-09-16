Meteor.Router.add({
	'/floors/new': {
		to: 'floor_new',
		as: 'newFloor',
		and: function() {
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
    	as: 'listFloors'
    },
    '/floors/:floorId/tiles/new': {
        to: 'tile_form',
        as: 'newTile',
        and: function(floorId) {
            Session.set('floorId', floorId);
            Session.set('editingTileId', null);
        }
    },
    '/floors/:floorId/tiles/:_id/edit': {
        to: 'tile_form',
        as: 'editTile',
        and: function(floorId, _id) {
            Session.set('floorId', floorId);
            Session.set('editingTileId', _id);
        }
    }
});

Meteor.Router.filters({
    'requireLogin': function(templateName) {
        if (Meteor.userId()) {
            return templateName;
        } else {
            return 'access_denied';
        }
    }
});

Meteor.Router.filter('requireLogin', {only: ['floor_new', 'tile_form']});