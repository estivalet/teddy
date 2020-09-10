class Level {

    constructor() {
        this.tileMap = new TileMap(20, 12, 32, 32, 640, 384);

    }

    load() {
		let tile0 = tileExtractor.tiles[0];
        let data = config.assets.levels["03"].data;
        
		for(var i=0; i < data.length; i++) {
			var l = (i % 20) * 32;
			var i1 = parseInt(i / 20) * 32;

			let tile = tileExtractor.tiles[data[i]];
			switch(tile.id) {
				case 26:
					player = new Player(images.player, l ,i1, 32, 32, 1, config.assets.images["player"].left_frames, config.assets.images["player"].right_frames);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 30:
					hostage = new Hostage(images.hostage, l ,i1, 32, 32, 1, config.assets.images["hostage"].left_frames, config.assets.images["hostage"].right_frames);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 24:
					var gyrus = new Gyrus(images.gyrus, l ,i1, 32, 32, 1, config.assets.images["gyrus"].left_frames, config.assets.images["gyrus"].right_frames);
					enemies.push(gyrus);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 34:
					var wood = new Wood(images.wood, l ,i1, 32, 32, 1, config.assets.images["wood"].left_frames, config.assets.images["wood"].right_frames);
					enemies.push(wood);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 22:
					var ballon = new Ballon(images.ballon, l ,i1, 32, 32, -1, config.assets.images["ballon"].left_frames, config.assets.images["ballon"].right_frames);
					enemies.push(ballon);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 23:
					var ballon = new Ballon(images.ballon, l ,i1, 32, 32, 1, config.assets.images["ballon"].left_frames, config.assets.images["ballon"].right_frames);
					enemies.push(ballon);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 32:
					var thing = new Thing(images.thing, l ,i1, 32, 32, -1, config.assets.images["thing"].left_frames, config.assets.images["thing"].right_frames);
					enemies.push(thing);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 33:
					var thing = new Thing(images.thing, l ,i1, 32, 32, 1, config.assets.images["thing"].left_frames, config.assets.images["thing"].right_frames);
					enemies.push(thing);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 28:
					var roller = new Roller(images.roller, l ,i1, 32, 32, 1, config.assets.images["roller"].left_frames, config.assets.images["roller"].right_frames);
					enemies.push(roller);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 29:
					var roller = new Roller(images.roller, l ,i1, 32, 32, -1, config.assets.images["roller"].left_frames, config.assets.images["roller"].right_frames);
					enemies.push(roller);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 20:
					var ball = new Ball(images.ball, l ,i1, 32, 32, -2, config.assets.images["ball"].left_frames, config.assets.images["ball"].right_frames);
					enemies.push(ball);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 21:
					var ball = new Ball(images.ball, l ,i1, 32, 32, 2, config.assets.images["ball"].left_frames, config.assets.images["ball"].right_frames);
					enemies.push(ball);
					this.tileMap.setTileByPos(i, tile0);
					break;
				case 6:
					portalPos = i;
					this.tileMap.setTileByPos(i, tile);
					break;

				default:
					this.tileMap.setTileByPos(i, tile);
					break;

			}
		}

		window.requestAnimationFrame(frame);

    }
    
    getPlatform(i, j) {
        if (j < 0) {
            return false;
        }
    
        // Tile 19 is an empty tile. But it is different than tile 0
        // because it is considered as a plataform and obstacle too.
        // See also GetPlataform and GetObstacle methods.
    
        return this.tileMap.getTile(parseInt(i / 32), parseInt(j / 32)).id != 0
                && (this.tileMap.getTile(parseInt(i / 32), parseInt(j / 32)).id < 6 || 
                    this.tileMap.getTile(parseInt(i / 32), parseInt(j / 32)).id == 19);
    
    }
    
    addCrumble(x, y) {
        let i = parseInt(x/32);
        let j = parseInt(y/32);
    
        // put tile 19 (empty tile)
        this.tileMap.setTile(i, j, tileExtractor.tiles[19]);
    
        console.log('add crumble ' + i + " " + j);
        let crumble = new Crumble(images.crumble, x ,y, 32, 32, config.assets.images["crumble"].frames);
        crumbles.push(crumble);
    }
    
    getBlock(i, j) {
        if (j < 0) {
            j = 0;
        }
        return this.tileMap.getTile(parseInt(i / 32), parseInt(j / 32)).id;
    }
    
    getObstacle(i, j) {
    
        // Tile 19 is an empty tile. But it is different than tile 0
        // because it is considered as a plataform and obstacle too.
        // See also GetPlataform and GetObstacle methods.
        //debugger;
        var block = this.getBlock(i, j);
        return  block != 0 && (block < 6 || this.tileMap.getTile(parseInt(i / 32), parseInt(j / 32)).id == 19);// 40;
    }
    
    getPickUp(i, j) {
        if (j < 0) {
            return;
        }
        var k = parseInt(i / 32) + (parseInt(j / 32) * 20);
        switch (this.tileMap.getTile(parseInt(i / 32),parseInt(j / 32)).id) {
        case 8:// 42: // 'd'
            freezeTimer = 200;
            break;
    
        case 9:// 43: // 'e'
            player.invincible = 200;
            break;
    
        case 10:// 44: // 'f' // Got the key open the door
            // GameRepository.get().getCurrentMap().setMapElement(
            // new DefaultMapElement(7), portalPos);
            //tm.setTile(portalPos, new Tile(7, getImage(7)));
            // return;
            console.log('get key');
            this.tileMap.setTileByPos(portalPos, tileExtractor.tiles[7]);
            break;
    
        case 11:// 45: // 'g'
            break;
    
        case 12:// 46: // 'h'
            break;
        default:
            return;
        }
        // GameRepository.get().getCurrentMap().setMapElement(
        // new DefaultMapElement(0), k);
        //tm.setTile(k, new Tile(0, getImage(0)));
        this.tileMap.setTileByPos(k, tileExtractor.tiles[0]);
    }
    
    addCloud(i, j, k, l) {
        console.log("ALLOW=" + allowNewCloud);
        if (!allowNewCloud) {
            return;
        }
        allowNewCloud = false;
        i += k;
        j += l;
        if (i < 0 || i >= canvas.width) {
            return;
        }
        var i1 = parseInt(i / 32) + (parseInt(j / 32) * 20);
        if (i1 >= 0 && i1 < 240) {
            console.log('id='+this.tileMap.getTileByPos(i1).id + " " +i1);
            if (this.tileMap.getTileByPos(i1).id == 0) { //&& !EnemyInRange(i1)) {
                //this.tileMap.setTileByPos(i1, tileExtractor.tiles[2]);
                console.log("ADD CLOUD in " + i1);
                cloud = new Cloud(images.cloud, i ,j, 32, 32, "on", config.assets.images["cloud"].on_frames);
                return;
            } else if (this.tileMap.getTileByPos(i1).id  == 2) {
                //this.tileMap.setTileByPos(i1, tileExtractor.tiles[2]);
                this.tileMap.setTileByPos(i1, tileExtractor.tiles[0]);
                console.log("REMOVE CLOUD");
                cloud = new Cloud(images.cloud, i ,j, 32, 32, "off", config.assets.images["cloud"].off_frames);
                return;
            
            } else {
                allowNewCloud = true;
            }
    
        }
    }

    render(context) {
        this.tileMap.render(context);
    }
}    