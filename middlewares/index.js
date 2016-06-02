module.exports = function(server){
    server.middlewares = {
        bodyparser: require('body-parser').json()
    }
}
