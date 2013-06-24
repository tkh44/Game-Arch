/* global ENGINE,app,_ */

ENGINE.Ant = function(args) {
    /* extend the instancewith defaults and user data */
    _.extend(this, {
        // Direction ant is facing in radians
        direction: 0,
        // px's per sec
        speed: 6,
        // AI cooldown so movement is natural
        brainDelta: 0
    }, args);
};

ENGINE.Ant.prototype = {
    step: function(delta) {
        // Decrease brain cooldown
        this.brainDelta -= delta;

        //if cooldown goes below zero do some thinking
        if (this.brainDelta < 0) {
            this.direction = Math.random() * Math.PI * 2;
            this.brainDelta = Math.random() * 2000;
        }

        // increase speed with age
        this.speed += 8 * delta / 1000;

        //move ant
        this.x += Math.cos(this.direction) * this.speed * delta / 1000;
        this.y += Math.sin(this.direction) * this.speed * delta / 1000;

        //if off screen kill it
        if (this.x < 0 || this.y < 0
            || this.x > app.width || this.y > app.height) {

            this.remove();
            app.game.spawnAnt();

        }
    },

    render: function(delta) {
        app.layer
            .fillStyle("#ff0000")
            .fillRect(
                5 * (this.x / 5 | 0),
                5 * (this.y / 5 | 0),
                2, 2
            );

    },
    remove: function() {
        // Mark for removal
        this._remove = true;

        // Tell collection it is dirty
        this.collection.dirty = true;
    }
};