Deps.autorun(function() {
    Meteor.subscribe('floors');
});

Deps.autorun(function() {
    Meteor.subscribe('tilesByFloorId', Session.get('floorId'));
});
