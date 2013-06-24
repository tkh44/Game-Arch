/* global ENGINE */

var app; 
window.app = app = new ENGINE.Application({
    width: window.innerWidth,
    height: window.innerHeight,

    oncreate: function() {
        console.log("oncreate");
        this.loader.foo(500);
    },

    onready: function() {
        this.selectScene(this.game);
    }
});