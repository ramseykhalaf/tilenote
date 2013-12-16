Router.configure({
    layout: 'layout'
});

Router.map(function() { 

    this.route(
        'listFloors',
        {
            path: '/floors',
            template: 'floor_main'
        }
    );

    this.route(
        'newFloor',
        {
            path: '/floors/new',
            template: 'floor_new_form'
        }
    );

    this.route(
        'showFloor',
        {
            path: '/floors/:_id',
            template: 'floor_main'
        },
        function() { Session.set('floorId', this.params._id); this.render(); }
    );

    this.route(
        'editFloor',
        {
            path: '/floors/:_id/edit',
            template: 'floor_edit_form',
            data: function() { return Floors.findOne(this.params._id); }
        }
    );

    this.route(
        'newTileForFloor',
        {
            path: '/floors/:_id/tiles/new',
            template: 'tile_new_form',
            data: function() { return {floorId: this.params._id}; }
        }
    );

    this.route(
        'editTile',
        {
            path: '/floors/:floorId/tiles/:_id/edit',
            template: 'tile_edit_form',
            data: function() { return Tiles.findOne(this.params._id); }
        }
    );

});