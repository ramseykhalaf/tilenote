Deps.autorun(function() {
    Meteor.subscribe('floorsPublic');
});

Deps.autorun(function() {
    Meteor.subscribe('floorsByUserId', Meteor.userId());
});

Deps.autorun(function() {
    Meteor.subscribe('tilesByFloorId', Session.get('floorId'));
});
