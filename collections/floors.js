Floors = new Meteor.Collection2('floors', {
    schema: {
        ownerId: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String,
            optional: true
        },
        isPublic: {
            type: Boolean
        },
        createdAt: {
            type: Date
        }
    }
});

var allowedUpdateFields = ['title', 'description', 'isPublic'];

// Checks if the floor is owned by the current logged in user.
ownFloor = function(userId, floor) {
    if (userId && floor.ownerId) {
        return floor.ownerId === Meteor.userId();
    }
    return false;
};

ownFloorId = function(floorId) {
    return ownFloor(Meteor.userId, Floors.findOne(floorId));
}

Floors.allow({
    insert: ownFloor,
    update: ownFloor,
    remove: ownFloor
});

Floors.deny({
    update: function(userId, doc, fieldNames) {
        return _.difference(fieldNames, allowedUpdateFields).length;
    }
});

Floors.beforeInsert = function floorsBeforeInsert(formDoc) {
    return _.extend(formDoc, {
        ownerId: Meteor.userId(),
        createdAt: new Date()
    });
};

Floors.callbacks({
    insert: function(error, floorId) {
        if (floorId) {
            Router.go('showFloor', {_id: floorId});
        }
    },
    update: function(error) {
        if (error) {
            console.log("Update Error:", error);
        } else {
            Router.go('showFloor', {_id: Session.get('floorId')});
        }
    },
    remove: function(error) {
        if (error) {
            console.log("Remove Error:", error);
        } else {
            Router.go('listFloors');
        }
    }
});
