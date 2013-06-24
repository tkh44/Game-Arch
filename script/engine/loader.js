/* global ENGINE */

ENGINE.Loader = function() {

    /* all items to load */
    this.total = 0;

    /* items in queue */
    this.count = 0;

    /* convenient progress from 0 to 1 */
    this.progress = 0;

    /* all callbacks that should be fired when the loading is over */
    this.callbacks = [];

    this.loading = false;
};

ENGINE.Loader.prototype = {
    add: function() {
        this.loading = true;
        this.count++;
        this.total++;
    },

    image: function(image) {
        var loader = this;

        /* Listen to when the image is ready */
        image.addEventListener("load", function() {
            loader.onItemReady();
        });

        image.addEventListener("error", function() {
            loader.onItemError(this.src);
        });

        this.add();
    },

    /* sometimes it is convinient to simulate loading by using timeout 
           usage: 
           loader.foo(1000);
         this will simulate that some asset is being loaded for 1 second
    */
    foo: function(duration) {
        var loader = this;

        /* simulate loading using timeout */
        setTimeout(function() {
            loader.onItemReady();
        }, duration);

        /* increase items count */
        this.add();
    },

    /* Ready callback caller */
    ready: function(callback) {
        if (!this.loading) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    },

    /* Called when one item finished loading */
    onItemReady: function() {
        /* Reduce queue count */
        this.count--;

        /* Update progress - Can be used for progress bars */
        this.progress = (this.total - this.count) / this.total;

        if (this.count <= 0) {
            this.loading = false;

            // Run all callbacks
            for (var i = 0, len = this.callbacks.length; i < len; i++) {
                this.callbacks[i]();
            }

            // Cleanup callbacks
            this.callbacks = [];
            this.total = 0;
            this.count = 0;
        }
    },

    /* Called on error */
    onItemError: function(source) {
        console.log("unable to load ", source);
    }
};
