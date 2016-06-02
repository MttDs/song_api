var mongoose = require('mongoose');

module.exports = function(server){
    server.mongoose = mongoose.connect(server.settings.db.mongo);

    server.models = {
        Song: require('./song')(server)
    };
};
