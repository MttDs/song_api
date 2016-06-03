module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song


        Song.findById(req.params.id, function(err, song){
            if (err || !song)
                return res.status(500).send(err)

            var oldAlbum = song.album;
            var newAlbum = req.body.album;

            Song.findByIdAndUpdate(req.params.id, req.body, function(err, data){
                if (err)
                    return res.status(500).send(err)

                if (oldAlbum != newAlbum){
                    server.services.change_meta_data(song,req.body, song.name);
                    server.services.move_file(oldAlbum, newAlbum, song.name);
                }

                res.send(data);
            });
        })
    };
};
