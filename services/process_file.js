var path = require('path');
var fs = require('fs');

module.exports = function(server){
    return function(req, res, next){

        function onNewFile(file) {
            if (path.extname(file) == ".txt")
                processFile(file);
            else
                fs.rename(file, "garbage/" + path.basename(file));
        }

        function processFile(file) {
            fs.readFile(file, 'utf8', function(error, content){
                if (error)
                {
                    if (error.errno == -2)
                        console.log("Le nom du fichier est incorrect");
                    else
                        console.log(error);
                    return;
                }

                fs.unlink(file);

                var lines = content.split("\n");

                var parts;
                var album;
                var artist;

                lines.forEach(function(line){

                    parts = line.split("-");

                    if (parts[1] != undefined) {
                        album = parts[0].trim();
                        artist = parts[1].trim();

                        createFolder(album, artist, save);
                    }
                });
            });
        }

        function save(body) {
            var Song = server.models.Song;

            song = new Song(body)

            song.save(function(err, data){
                if (err) {
                    console.log(err);
                    return;
                }

                return true;
            });
        }

        function createFolder(album, artist, cb)
        {
            fs.mkdir("albums/" + album, function(error){
                var body = { artist: artist, album: album };

                fs.writeFile("albums/" + album + "/" + artist, "", cb(body));
            });
        }

        return onNewFile(req, server);
    };
};


