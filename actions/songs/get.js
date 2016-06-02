module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song;

        Song.find({}, function(err, songs){
            if (err)
                res.status(500).send(err)

            res.send(songs)
        });

    };
};
