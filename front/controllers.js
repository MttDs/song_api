angular
.module("Controllers", [])
.controller("ListSongController", function($scope, $rootScope, $http, $interval) {
    loadSongs();

    $scope.$on('remove', function(event, song) {
        $rootScope.songs.removeItemById(song);

        $http.delete("/songs/"+song._id).success(function(data) {
        });
    });

    $interval(loadSongs, 5000);

    function loadSongs() {
        $http.get("/songs").success(function(data) {
            $rootScope.songs = data;
        });
    }
})
.controller("EditSongController", function($scope, $rootScope, $routeParams, $http, $location) {
    var songId = $routeParams['id']
    var song = null;

    $http.get("/songs/"+songId).success(function(data) {
        $scope.song = data;

        $scope.$on('save', function(event, song) {

            $http.put("/songs/"+songId, song).success(function(data) {
                if ($rootScope.songs)
                    $rootScope.songs.replaceById(song, data);

               // $location.path('/');
            });

        });
    });

    $scope.$on('reset', function(event, song) {
        for (var i = 0 ; i < $rootScope.songs.length ; i++) {
            if ($rootScope.songs[i].id == songId) {
                $rootScope.songs[i] = $scope.savedSong;
                break;
            }
        }

        $location.path('/');
    });
});

