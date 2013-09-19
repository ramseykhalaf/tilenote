Template.floor_list.helpers({
    floorsPublic: function() {
        return Floors.find({isPrivate: false}, {sort: {createdAt: -1}});
    },
    floorsPrivate: function() {
    	return Meteor.userId() ? Floors.find({ownerId: Meteor.userId()} , {sort: {createdAt: -1}})
                               : null;
    }
});