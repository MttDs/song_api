var app = angular.module("MyApp", [
    "ngRoute",
    "Controllers",
    "Filters",
    "Directives"
]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/songs/index.html",
        controller: "ListSongController"
    })
    .when("/mes-mp3/:id", {
        templateUrl: "views/songs/edit.html",
        controller: "EditSongController"
    })
    .when("/tutoriel", {
        templateUrl: "views/statics/tutoriel.html",
        controller: "TutorielController"
    })
    .otherwise("/");
});

