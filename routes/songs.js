var router = require('express').Router();

module.exports = function(server){
    router.get('/', server.actions.songs.get);
    router.post('/', server.middlewares.bodyparser, server.actions.songs.create);
    router.get('/:id', server.actions.songs.show);
    router.put('/:id', server.middlewares.bodyparser, server.actions.songs.update);
    router.delete('/:id', server.actions.songs.remove);

    return router;
}
