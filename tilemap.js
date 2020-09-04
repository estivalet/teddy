class TileMap {

    constructor(width, height, tileWidth, tileHeight, screenWidth, screenHeight) {
		this.tiles = new Array(width * height);
		this.cellsX = width;
		this.cellsY = height;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.mapWidth = this.tilesToPixelsX(this.cellsX);
		this.mapHeight = this.tilesToPixelsY(this.cellsY);
		this.reset();
    }

    reset() {
		this.cameraX = this.mapWidth / 2;
		this.cameraY = this.mapHeight / 2;
	}


    tilesToPixelsX(numTiles) {
		return numTiles * this.tileWidth;
	}

    tilesToPixelsY(numTiles) {
		return numTiles * this.tileHeight;
	}

	/**
	 * Converts world to window coordinates.
	 * 
	 * @param pX
	 *            X world position.
	 * @return X window position.
	 */
	worldToWindowX(pX) {
		return (parseInt(pX) - parseInt(this.cameraX)) + this.screenWidth / 2;
	}

	/**
	 * Converts world to window coordinates.
	 * 
	 * @param pY
	 *            Y world position.
	 * @return Y window position.
	 */
	worldToWindowY(pY) {
		return (parseInt(pY) - parseInt(this.cameraY)) + this.screenHeight / 2;
	}

    /**
	 * Gets the tile at the specified location. Returns null if no tile is at
	 * the location or if the location is out of bounds.
	 */
	getTile(x, y) {
        var index = y * this.cellsX + x;

		if (x < 0 || x > this.cellsX || y < 0 || y > this.cellsY || index >= this.tiles.length) {
            console.log('ops');
			return null;
		} else {
			return this.tiles[index];
		}
    }

    getTileByPos(pos) {
		return this.tiles[pos];
	}

    
	/**
	 * Set a tile in a specific position in the map.
	 * 
	 * @param pMapElement
	 *            Tile to set.
	 * @param pPos
	 *            Position in the map.
	 */
	setTileByPos(pos, tile) {
		this.setTile(pos % this.cellsX, parseInt(pos / this.cellsX), tile);
	}

    setTile(x, y, tile) {
        console.log('setting tile ' + tile.id + " in " + x + "  " + y);
		this.tiles[y * this.cellsX + x] = tile;
	}


    render(context) {
		// Loop through the columns. Drawing rows first.
		for (var i = 0; i < this.cellsX; i++) {
			// Get tile position.
			var j = this.worldToWindowX(i * this.tileWidth);
			// If tile is within the visible window then draw the rows.
			if (j > -this.tileWidth && j < this.screenWidth) {
				// Loop through the rows.
				for (var k = 0; k < this.cellsY; k++) {
					var l = this.worldToWindowY(k * this.tileHeight);
					// If tile is within the visible window.
					if ((l > -this.tileHeight && l < this.screenHeight) && (this.getTile(i, k) != null)) {
                        this.getTile(i, k).render(context, j, l);
                        context.beginPath();
                        context.strokeStyle = "white";
                        context.rect(j,l,32,32);
                        context.stroke();
					}
				}
			}
		}        
    }
}