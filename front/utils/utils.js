Array.prototype.removeItemById = function(element) {
    var found;
    for (var i = 0 ; i < this.length ; i++) {
        if (this[i].id == element.id) {
            found = this[i];
            break;
        }
    }

    if (found) {
        var index = this.indexOf(found);
        this.splice(index, 1);
    }
};

Array.prototype.replaceById = function(element, replace) {
    var found;

    for (var i = 0 ; i < this.length ; i++) {
        if (this[i].id == element.id) {
            this[i] = replace;
            return true;
        }
    }

    return false;
};
