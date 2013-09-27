Tiles = new Meteor.Collection('tiles');

ownFloorOfTile = function(userId, tile) {
    if(userId && tile) {
        return !!Floors.findOne({ _id: tile.floorId, ownerId: userId });
    }
    return false;
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i');
  
  return pattern.test(str);
}

var allowedUpdateFields = ['title', 'url', 'thumbnailLink'];

Tiles.allow({
    update: ownFloorOfTile,
    remove: ownFloorOfTile
});

Tiles.deny({
    update: function(userId, doc, fieldNames, modifier) {
        if (!!_.difference(fieldNames, allowedUpdateFields).length) return true;
        doc.title = 'foo';
        doc.thumbnailLink = generateThumbnailLink(doc.url);
        return false;
    }
});

Meteor.methods({
    createTile: function(floorId, title, url) {
        if (!ownFloorId(floorId))
            throw new Meteor.Error(403, 'You do not own this floor');

        if (!title)
            throw new Meteor.Error(403, 'Title cannot be blank');

        if (!url || !validURL(url))
            throw new Meteor.Error(403, 'URL not valid');

        //valid inputs - continue

        var newTile = {
            floorId: floorId,
            title: title,
            url: url,
            thumbnailLink: generateThumbnailLink(url)
        };

        return Tiles.insert(newTile);
    }
});
