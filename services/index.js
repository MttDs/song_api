module.exports = function(server) {
    server.services = {
        process_file: require('./process_file')(server),
        remove_file: require('./remove_file')(server),
        move_file: require('./move_file')(server),
        change_meta_data : require('./change_meta_data')(server)
    }
};
