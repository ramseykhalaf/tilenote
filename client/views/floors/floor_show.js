Template.floor_show.helpers({
    tiles: function() {
        return Tiles.find({floorId: Session.get('floorId')});
    },
    currentFloor: function() {
        return Session.get('floorId');
    },
    ownCurrentFloor: function () {
        return Floors.findOne(Session.get('floorId')).ownerId === Meteor.userId();
    }
});

Template.floor_show.events({
    'click .edit': function() {
        Meteor.Router.to('editFloor', this);
    }
});