if (Floors.find({}).count() == 0 && Tiles.find({}).count() == 0) {

    //create FLoors and hang on to ids
    var meteorFloorId = Floors.insert({
        title: 'Getting started with meteor',
        description: 'A bunch of handy links for anyone wanting to try meteor for the first time.'
    });

    var newsFloorId = Floors.insert({
        title: 'International News',
        description: 'Some good news websites, which when read together try to give an unbiased view'
    });

    // Insert Tiles for meteor floor
    Tiles.insert({
        floorId: meteorFloorId,
        title: 'Introducing Telescope',
        url: 'http://sachagreif.com/introducing-telescope'
    });

    Tiles.insert({
        floorId: meteorFloorId,
        title: 'Meteor',
        url: 'http://meteor.com'
    });
      
    Tiles.insert({
        floorId: meteorFloorId,
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    });

    //insert Tiles for newsFloor
    Tiles.insert({
        floorId: newsFloorId,
        title: 'New York Times',
        url: 'http://www.nytimes.com'
    });

    Tiles.insert({
        floorId: newsFloorId,
        title: 'Aljazeera',
        url: 'http://www.aljazeera.com'
    });
}
