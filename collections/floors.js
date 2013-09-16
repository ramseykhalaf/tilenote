Floors = new Meteor.Collection('floors');

var allowedUpdateFields = ['title', 'description'];

Floors.allow({
    update: ownFloor,
    remove: ownFloor
});

Floors.deny({
    insert: function() {return true;},
    update: function(userId, doc, fieldNames) {
        return _.difference(fieldNames, allowedUpdateFields).length;
    }
})

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
            ownerId: userId,
            createdAt: new Date()
        });

        return floorId;
    }
});

// Checks if the floor is owned by the current logged in user.
// floor can be floor object or floorId
function ownFloor(userId, floor) {
    userId = userId || Meteor.userId();
    if (!userId)
        return false;

    if (floor.ownerId) 
        return floor.ownerId === Meteor.userId();
    
    return Floors.findOne(floor) === Meteor.userId();
}