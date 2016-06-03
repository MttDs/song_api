var fs = require('fs');

module.exports = function(server){
    return function(oldAlbum, newAlbum, name){
        console.log("function change meta data----------------");
        if (newAlbum.trim() == "")
            newAlbum = "inconnu"

        var oldDirectory = __dirname+'/../albums/'+oldAlbum;
        var newDirectory = __dirname+'/../albums/'+newAlbum;

        fs.mkdir(newDirectory, function(err){
            fs.rename(oldDirectory+"/"+name, newDirectory+"/"+name, function(err){
                if (err) {
                    console.log(err)
                    return;
                }
            });
        });
    };
};
