module.exports = function(server) {
    server.actions = {
        songs: require('./songs')(server)
    }
};
