Template.floor_main.helpers({
    currentFloor: function() {
        return Floors.findOne(Session.get('floorId'))
    }
});