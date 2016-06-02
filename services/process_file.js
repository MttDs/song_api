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
                //fs.unlink(file);

                treatMetaDataFromSong(server,file,createFolder);


        }

        function save(body) {
            console.log("--------------------appelle de save");
            var Song = server.models.Song;

            song = new Song(body);

            song.save(function(err, data){
                if (err) {
                    console.log(err);
                    return;
                }

                return true;
            });
        }

        function createFolder(song,songParam)
        {
            console.log("fonction create folder : "+song);
            fs.mkdir("albums/" + song.album, function(error){
                var body = song;

                var unknownFolder = "albums/inconnu/";
                var albumFolder = "albums/"+song.album;
                if(song.album == undefined || song.album=="" || song.album==null){


                    if (!fs.existsSync(unknownFolder)){
                        fs.mkdirSync(unknownFolder);
                    }

                    fs.rename(songParam,unknownFolder+""+path.basename(songParam));

                }else{
                    if (!fs.existsSync(albumFolder)){
                        fs.mkdirSync(albumFolder);
                    }
                    fs.rename(songParam,"albums/"+ song.album + "/"+path.basename(songParam));
                }


                //fs.writeFile("albums/" + song.album + "/" + song.artist+".mp3", "", save(body));
            });
        }

        return onNewFile(req, server);
    };
};


function treatMetaDataFromSong(server,songParam,createFolder){
    console.log("entre dans la fonction get MEta data et song = : "+songParam);
    var metaDataToReturn=null;
    var parser = mm(fs.createReadStream(songParam),{ duration: true }, function (err, metaData) {
        if (err)
            throw err;

        //creatin of object song
        var Song = server.models.Song;
        var song = new Song();
        song.title= metaData.title;

        if(Array.isArray(metaData.artist)){
            song.artist = metaData.artist.join();
        }
        else
            song.artist = metaData.artist;
        song.album = metaData.album;
        song.year = metaData.year;
        song.duration = metaData.duration;

        console.log("après initialisation de song : "+song);

        createFolder(song,songParam);
    });
}

