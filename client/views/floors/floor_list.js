Template.floor_list.helpers({
    floorsPublic: function() {
        return Floors.find({ ownerId: null });
    },
    floorsPrivate: function() {
    	return Floors.find({ ownerId: Meteor.userId() });
    }

});
