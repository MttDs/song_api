module.exports = function(server){
    var SongSchema = server.mongoose.Schema({
        album: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        }
    });

    SongSchema.plugin(require('mongoose-timestamp'));

    return server.mongoose.model('Song', SongSchema);
}
