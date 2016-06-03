var nodeID3 = require('node-id3');

module.exports = function(server){
    return function(oldAlbum,newSong, name){
        var tags = {
          title: newSong.title,
          artist: newSong.artist,
          album: newSong.album,
          year:newSong.year
        };

        var oldDirectory = __dirname+'/../albums/'+oldAlbum.album;

        var success = nodeID3.write(tags,oldDirectory+"/"+name);
        return success;
    };
};
