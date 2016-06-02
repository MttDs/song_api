angular
.module("Directives", [])
.directive("songrow", function() {
    return {
        restrict:"E",
        replace:true,
        templateUrl:'views/elements/song.html'
    }
});
