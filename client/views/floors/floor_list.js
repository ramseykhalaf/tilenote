Template.floor_list.helpers({
    floorsPublic: function() {
        return Floors.find({ ownerId: null });
    },
    floorsPrivate: function() {
    	return Meteor.userId() ? Floors.find({ ownerId: Meteor.userId() })
                               : null;
    }

});
