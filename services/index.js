module.exports = function(server) {
    server.services = {
        process_file: require('./process_file')(server),
        remove_file: require('./remove_file')(server)
    }
};
