module.exports = function(server){
    var SongSchema = server.mongoose.Schema({
        title:{
            type : String,
            required: false
        },
        album: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: false
        },
        year:{
            type:Number,
            required : false
        },
        duration:{
            type:Number,
            required:false
        }
    });

    SongSchema.plugin(require('mongoose-timestamp'));

    return server.mongoose.model('Song', SongSchema);
}
