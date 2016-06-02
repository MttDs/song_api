angular
.module("Directives", [])
.directive("songrow", function() {
    return {
        restrict:"E",
        replace:true,
        templateUrl:'views/elements/song.html',
        link: function(scope, element, attr) {
            var counter = 0;

            element.find("input").on("click", function() {
                counter++;

                if (counter == 1) {
                    element.css("background-color", "red");
                }
                else {
                    scope.$emit('remove', scope.song);
                }
            });
        }
    }
});
