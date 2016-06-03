var path = require('path');
var fs = require('fs');
var mm = require('musicmetadata');

module.exports = function(server){
    return function(req, res, next){

        function onNewFile(file) {
            if (path.extname(file) == ".mp3")
                processFile(file);
            else
                fs.rename(file, "garbage/" + path.basename(file));
        }

        function processFile(file) {
            treatMetaDataFromSong(server,file,createFolder);
        }

        function createFolder(song,songParam)
        {
            fs.mkdir("albums/" + song.album, function(error){
                var body = song;

                var unknownFolder = "albums/inconnu/";
                var albumFolder = "albums/"+song.album;

                if(song.album == undefined || song.album=="" || song.album==null) {
                    fs.mkdir(unknownFolder, function(err) {
                        fs.rename(songParam,unknownFolder+""+path.basename(songParam), function(err) {
                            if (err) {
                                console.log(err)
                                return;
                            }
                        });
                    });
                }
                else {
                    fs.mkdir(albumFolder, function(err) {
                        fs.rename(songParam,"albums/"+ song.album + "/"+path.basename(songParam), function(err) {
                            if (err) {
                                console.log(err)
                                return;
                            }
                        });
                    });
                }

                song.save(function(err, data){
                    if (err) {
                        console.log(err);
                        return;
                    }

                    return true;
                });
            });
        }

        return onNewFile(req, server);
    };
};


function treatMetaDataFromSong(server,songParam,createFolder){
    mm(fs.createReadStream(songParam),{ duration: true }, function (err, metaData) {
        if (err) {
            treatMetaDataFromSong(server,songParam,createFolder)
            return;
        }

        var Song = server.models.Song;
        var song = new Song();

        song.title= metaData.title;

        if (metaData.album.trim() == "")
            song.album = "inconnu";
        else
            song.album = metaData.album;

        metaData.year = parseInt(metaData.year);

        if (Number.isInteger(metaData.year)) {
            song.year = metaData.year;
        }

        song.duration = metaData.duration;
        song.name = path.basename(songParam);

        if (Array.isArray(metaData.artist))
            song.artist = metaData.artist.join();
        else
            song.artist = metaData.artist;

        createFolder(song,songParam);
    });
}

