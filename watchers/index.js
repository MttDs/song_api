var path = require('path');
var fs = require('fs');


module.exports = function(server){
    server.watchers = {
        chokidar: {
            add: require('./chokidar/add')(server)
        }
    }
}

