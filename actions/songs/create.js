module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song;

        song = new Song(req.body)

        song.save(function(err, data){
            if (err)
                return res.status(500).send(err)

            res.send(data);
        });
    }
};
