module.exports = function(server) {
    return {
        get: require('./get')(server),
        create: require('./create')(server),
        show: require('./show')(server),
        update: require('./update')(server),
        remove: require('./remove')(server)
    };
}
