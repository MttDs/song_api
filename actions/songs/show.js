module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song;

        Song.findById(req.params.id, function(err, song){
            if (err)
                return res.status(500).send(err)

            res.send(song)
        });
    }
}
