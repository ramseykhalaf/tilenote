Deps.autorun(function() {
    Meteor.subscribe('floorsPublic');
});

Deps.autorun(function() {
    Meteor.subscribe('floorsOwned');
});

Deps.autorun(function() {
    Meteor.subscribe('tilesByFloorId', Session.get('floorId'));
});
