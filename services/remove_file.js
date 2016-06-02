var fs = require('fs');

module.exports = function(server){
    return function(album, name){
        fs.unlink(__dirname+'/../albums/'+album+'/'+name, function(err){
            if (err)
                console.log(err)

            return;
        });
    };
};
