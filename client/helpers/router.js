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
            template: 'floor_form'
        },
        function() { Session.set('editingFloorId', null); this.render(); }
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
            template: 'floor_form',
            data: function() { return Floors.findOne(this.params._id); }
        },
        function() { Session.set('editingFloorId', this.params._id); this.render(); }
    );

    this.route(
        'newTileForFloor',
        {
            path: '/floors/:_id/tiles/new',
            template: 'tile_form'
        },
        function() {
            Session.set('floorId', this.params._id);
            Session.set('editingTileId', null);
            this.render();
        }
    );

    this.route(
        'editTile',
        {
            path: '/floors/:floorId/tiles/:_id/edit',
            template: 'tile_form'
        }, 
        function() { Session.set('editingTileId', this.params._id); this.render(); }
    );

});