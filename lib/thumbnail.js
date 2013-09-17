generateThumbnailLink = function(url) {
    return 'http://api.webthumbnail.org/?width=200&height=200&format=png&url='+url;
    //size = _.contains(['s', 'm', 'l', 'x'], size) ? size : 'l';
    //return 'http://free.pagepeeker.com/v2/thumbs.php?size='+size+'&url='+url;
}