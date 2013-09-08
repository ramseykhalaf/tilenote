Deps.autorun(function() {
    Meteor.subscribe('floorsPublic');
});

Deps.autorun(function() {
    Meteor.subscribe('floorsByOwnerId', Meteor.userId());
});

Deps.autorun(function() {
    Meteor.subscribe('tilesByFloorId', Session.get('floorId'));
});
