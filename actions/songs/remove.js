module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song;

        Song.findById(req.params.id, function(err, song){
            if (err || !song)
                return res.status(500).send(err)

            var album = song.album;
            var file_name = song.name

            Song.remove({ _id: song.id}, function(err, data) {
                if (err)
                    return req.status(500).send(err)

                server.services.remove_file(album, file_name);

                res.send(data)
            });
        });
    }
}
