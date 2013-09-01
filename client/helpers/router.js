Meteor.Router.add({
    '/floor/:_id': {
        as: 'showFloor',
        and: function(_id) {
            Session.set('floorId', _id);
        }
    }
});
