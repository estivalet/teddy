class TileExtractor{

    constructor(image, tileSize) {
        this.imageWidth = image.width;
        this.imageHeight = image.height;
        this.tileSize = tileSize;
        this.tileCountX = image.width / this.tileSize;
        this.tileCountY = image.height / this.tileSize;
        this.imgData = this.getImageData(image);
        //this.tiles = this.getTiles();
    }

    getTiles() {
        var tiles = [];
        return new Promise((resolve, reject) => {
            for (var yi = 0; yi < this.tileCountY; yi++) {
                for (var xi = 0; xi < this.tileCountX; xi++) {
                    var tileImageData = this.getTile(xi * this.tileSize, yi * this.tileSize, tiles.length);
                    convertImageDataToImage(tileImageData).then(tileImage => {
                        var tile = new Tile(tiles.length, tileImage, true);
                        tiles.push(tile);
                        if(tiles.length == this.tileCountY * this.tileCountX) {
                            this.tiles = tiles;
                            resolve(tiles);
                        }
                    });
                }
            }
        });
    }

    //get a tile of size tileDim*tileDim from position xy
    getTile(x, y, id) {
        var tile = [];
        //loop over rows
        for (var i = 0; i < this.tileSize; i++) {
            //slice original image from x to x + tileDim, concat
            tile.push(...this.imgData.slice(this.getIndex(x, y + i), this.getIndex(x + this.tileSize, y + i)));
        }
        //convert back to typed array and to imgdata object
        tile = new ImageData(new Uint8ClampedArray(tile), this.tileSize, this.tileSize);
        //save original position
        //tile.x = x;
        //tile.y = y;


        return tile;
    }

    indexX(x) {
        var i = x * 4;
	    if (i > this.imgData.length) console.warn("X out of bounds");
	    return i;
    }

    indexY(y) {
        var i = this.imageWidth * 4 * y;
        if (i > this.imgData.length) console.warn("Y out of bounds");
        return i;
    }
    
    getIndex(x, y) {
        var i = this.indexX(x) + this.indexY(y);
        if (i > this.imgData.length) console.warn("XY out of bounds");
        return i;
    }    

    getImageData(image) {
        // Creates a temporary canvas.
        let tmpCanvas = document.createElement('CANVAS');
        tmpCanvas.width = image.width;
        tmpCanvas.height = image.height;
    
        // Draws image in the temporary canvas.
        var tmpContext = tmpCanvas.getContext("2d");
        tmpContext.drawImage(image, 0, 0, tmpCanvas.width, tmpCanvas.height);  
        
        // Extract image data.
        return tmpContext.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height).data;
    }
    
}