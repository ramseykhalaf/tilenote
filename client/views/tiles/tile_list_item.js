Template.tile_list_item.rendered = function() {
    Holder.run();
}

Template.tile_list_item.helpers({
    ownFloor: function() {
	   return ownFloorId(this.floorId);
    },
});