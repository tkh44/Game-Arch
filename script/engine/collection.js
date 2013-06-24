/* global ENGINE, _ */

ENGINE.Collection = function(parent) {
    // Object that manages the collection
    this.parent = parent;

    // Unique id for every entitiy
    this.index = 0;

    // If something inside dies, remove it
    this.dirty = false;
};

ENGINE.Collection.prototype = new Array;

_.extend(ENGINE.Collection.prototype, {

    /* creates new object instance with given args and pushes it to the collection
           example: 
           var entities = new ENGINE.Collection;
               entities.add(ENGINE.Soldier, { x: 32, y: 64});
    */
    add: function(constructor, args) {
        var entity = new constructor(_.extend({
            collection: this,
            index: this.index++
        }, args));

        // Use native Array prototype to push
        this.push(entity);

        return entity;
    },

    /* Remove dead bodies so they don't drain resources */
    clean: function() {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i]._remove) {
                this.splice(i--, 1);
                len--;
            }
        }
    },

    /* Needs to be called in order to keep track of collections garbage */
    step: function(delta) {
        if (this.dirty) {
            // Collection has been cleaned
            this.dirty = false;

            this.clean();

            // Sort by z-index
            this.sort(function(a,b) {
                return (a.zIndex | 0) - (b.zIndex | 0);
            });
        }
    },

    /* Call some method on every entity */
    call: function(method) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i][method]) {
                this[i][method].apply(this[i], args);
            }
        }
    },

    /* Call some method on every entity **with args as array** */
    apply: function(method, args) {
        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i][method]) {
                this[i][method].apply(this[i], args);
            }
        }
    }
});