var express = require('express');
var server = express();

require('./settings')(server);
require('./middlewares')(server);
require('./models')(server);
require('./actions')(server);
require('./routes')(server);
require('./services')(server);
require('./watchers')(server);

console.log('Server on port: '+ server.settings.port);

server.listen(server.settings.port);
