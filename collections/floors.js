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

Meteor.methods({
    createPost: function(title, description) {
        var userId = Meteor.userId();

        if (!userId)
            throw new Meteor.Error(401, 'Login to create a floor');

        if (!title)
            throw new Meteor.Error(422, 'Title cannot be blank');

        if (Floors.findOne({ ownerId: userId, title: title }))
            throw new Meteor.Error(422, 'You already have a floor with the same title');

        var floorId = Floors.insert({
            title: title,
            description: description,
            ownerId: userId
        });

        return floorId;
    }
});