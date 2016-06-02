module.exports = function(server){
    return function(req, res, next){
        var Song = server.models.Song

        Song.findByIdAndUpdate(req.params.id, req.body, function(err, data){
            if (err)
                return res.status(500).send(err)

            res.send(data)
        });
    }
}
