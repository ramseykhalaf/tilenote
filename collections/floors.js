Floors = new Meteor.Collection('floors');

Floors.allow({
    insert: function(userId, doc) {
        console.log('adding new floor with userId: ' + userId);
        console.log(doc);
        return (userId && userId === doc.ownerId);
    },
    remove: function(userId, doc) {
        return (userId === doc.ownerId);
    }
});