module.exports = function(server){
    return function() {
        var watcher = require('chokidar').watch('incoming_songs', {
          ignored: /[\/\\]\./,
          persistent: true
        });

        watcher.on('add', server.services.process_file);
    }()
}

