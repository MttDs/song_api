module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song;

        Song.remove({ _id: req.params.id }, function(err, data) {
            if (err)
                return req.status(500).send(err)

            res.send(data)
        });
    }
}
