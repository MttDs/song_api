angular
.module("Filters", [])
.filter("sec2min", function(){
   return function(sec){
        var minutes = Math.floor(sec / 60);
        var reste = sec - minutes * 60;

        return minutes + "mn "+ reste + "s";
    }
});
