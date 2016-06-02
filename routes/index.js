module.exports = function(server){
    server.use('/songs', require('./songs')(server));
}
