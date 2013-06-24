/* global ENGINE,cq,eveline, _ */

ENGINE.Application = function(args) {
    var app = this;

    _.extend(this, args);

    /* create a fullscreen canvas wrapper - we will draw on it */
    this.layer = cq();

    this.layer.appendTo("body");

    eveline(this);

    this.loader = new ENGINE.Loader();
    this.assets = new ENGINE.Assets(this.loader);

    this.oncreate();

    this.loader.ready(function() {
        app.onready();
    });
};

ENGINE.Application.prototype = {
    /* calls the method in current scene with given arguments
     for example
     this.dispatch("onmousemove", 32, 64);
     will trigger onmousemove method in current scene (if it has one)
    */
    dispatch: function(method) {

        if (this.scene && this.scene[arguments[0]]) {
            this.scene[arguments[0]].apply(this.scene, Array.prototype.slice.call(arguments, 1));
        }
    },

    selectScene: function(scene) {
        this.dispatch("onleave");

        this.scene = scene;

        this.dispatch("onenter");
    },

    /* game logic step (setInterval) */
    onstep: function(delta) {
        this.dispatch("onstep", delta);
    },

    /* rendering loop (requestAnimationFrame) */
    onrender: function(delta) {
        this.dispatch("onrender", delta);
    },

    /* the key gets translated to a string like shift, escape, a, b, c */
    onkeydown: function(key) {
        this.dispatch("onkeydown", key);
    }

    // TODO: fill out rest
};
