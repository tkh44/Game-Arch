/* global ENGINE */

ENGINE.Assets = function(loader, paths) {
    this.loader = loader;

    this.paths = paths || {
        images: "assets/images/"
    };

    this.data = {
        images: []
    };
};

ENGINE.Assets.prototype = {
    /* get image by key - key is created by removing extension from filename for example 
                 units/tank.png
         becomes units/tank
    */
    image: function(key) {
        return this.data.images[key];
    },

    /* Add multiple images */
    addImages: function(filenames) {
        for(var i = 0; i < filenames.length; i++) {
            this.addImage(filenames[i]);
        }
    },

    /* Add single image */
    addImage: function(filename) {
        var image = new Image();

        // Pass image to loader
        this.loader.image(image);

        // Rip off extension
        var key = filename.match(/(.*)\..*/)[1];

        // Add image to assets
        this.data.images[key] = image;

        // Search for image in defined path
        image.src = this.paths.images + filename;
    }
};
