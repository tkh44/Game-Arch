/* global ENGINE,app */

app.game = new ENGINE.Scene({
    oncreate: function() {
        this.entities = new ENGINE.Collection(this);

        for (var i = 0; i < 100; i++) {
            this.spawnAnt();
        }
    },
    spawnAnt: function() {
        this.entities.add(ENGINE.Ant, {
            x: app.width / 2,
            y: app.height / 2
        });
    },
    onstep: function(delta) {
        this.entities.step(delta);

        this.entities.call("step", delta);
    },
    onrender: function(delta) {
        app.layer.clear("#000");

        this.entities.call("render", delta);
    }
});