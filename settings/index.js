module.exports = function(server){
    var configFile = './config.[env].json'
        .replace('[env]', process.env.NODE_ENV || 'dev');

    server.settings = require(configFile);

    server.use(require('body-parser').urlencoded({
        extended: true
    }));
}
