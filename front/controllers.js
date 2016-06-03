angular
.module("Controllers", [])
.controller("ListSongController", function($scope, $rootScope, $http, $interval) {
    loadSongs();

    $scope.$on('remove', function(event, song) {
        $http.delete("/songs/"+song._id).success(function(data) {
            $rootScope.songs.removeItemById(song);
            loadSongs();
            loadPlayer($rootScope.songs);
        });
    });

    $interval(loadSongs, 5000);

    function loadSongs() {
        $http.get("/songs").success(function(data) {
            $rootScope.songs = data;
        });
    }

    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
})
.controller('PlayerController', function($rootScope, $http) {

    if ($rootScope.songs == undefined) {
        $http.get("/songs").success(function(data) {
            $rootScope.songs = data;
            loadPlayer($rootScope.songs);

        });
    }
    else {
        loadPlayer($rootScope.songs);
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

                $location.path('/');
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



function loadPlayer(songs) {

    var b = document.documentElement;

    b.setAttribute('data-useragent', navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform);

    var tracks = []
    var title = "";
    for (i in songs) {
        if (songs[i].title == "")
            title = "Inconnu"
        else
            title = songs[i].title

        tracks.push({
            "track": 1,
            "name": title,
            "length": songs[i].duration,
            "file": songs[i].album+'/'+songs[i].name
        })
    }

    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'http://localhost/node/song_api/albums/',
            extension = '',
            tracks = tracks,
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        loadTrack(index);
    }
}
