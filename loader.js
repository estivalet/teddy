const TILE_SIZE = 32;

let config = {
    "assets": {
		"levels": {
			"01": {
				"data":[
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,26,10,0,0,0,0,0,0,0,0,0,0,2,30,0,2,0,0,0,
                        0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,
                        0,0,0,0,0,2,0,0,0,34,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,2,0,0,0,0,0,0,24,0,0,0,0,6,0,0,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    ]
			},
			"02": {
				"data": [
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,2,30,0,0,2,0,0,0,0,0,0,0,0,
					0,0,12,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,10,0,
					0,12,0,12,0,0,0,0,0,0,0,0,0,0,0,22,0,1,1,1,
					0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,22,0,1,0,0,0,0,0,0,11,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,26,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				]
			},
			"03": {
				"data":[
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,30,0,0,
					0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,1,1,1,1,
					0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,20,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
					0,34,0,0,0,0,26,0,0,0,0,0,0,1,1,0,0,0,0,0,
					3,3,3,3,2,2,2,4,4,4,4,1,1,0,0,0,0,0,0,0,
					0,11,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,
					0,0,11,0,8,0,0,0,9,0,0,0,0,0,0,0,0,6,0,0,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,					
				]
			},
			"04": {
				"data": [
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,
					0,30,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,0,0,0,0,0,
					0,12,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,32,0,0,0,0,0,0,26,8,0,0,0,22,0,0,0,0,0,
					1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					0,0,11,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,
					0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				]
			}

		},
        "images" : {
            "tiles": {
                "name": "tiles",
                "description": "game tiles",
                "image": 'images/tiles.png',
			},
			"player": {
                "name": "player",
                "description": "player sprite",
				"image": 'images/player.png',
				"left_frames": [8, 9, 10, 11, 12, 13, 14, 15],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"hostage": {
                "name": "hostage",
                "description": "hostage sprite",
				"image": 'images/teddy.png',
				"left_frames": [8, 9, 10, 11, 12, 13, 14, 15],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"gyrus": {
                "name": "gyrus",
                "description": "gyrus sprite",
				"image": 'images/gyrus.png',
				"left_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"wood": {
                "name": "wood",
                "description": "wood sprite",
				"image": 'images/wood.png',
				"left_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"ballon": {
                "name": "ballon",
                "description": "ballon sprite",
				"image": 'images/ballon.png',
				"left_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"thing": {
                "name": "thing",
                "description": "thing sprite",
				"image": 'images/thing.png',
				"left_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"roller": {
                "name": "roller",
                "description": "roller sprite",
				"image": 'images/roller.png',
				"left_frames": [4, 5, 6, 7],
				"right_frames": [0, 1, 2, 3],
			},
			"ball": {
                "name": "ball",
                "description": "ball sprite",
				"image": 'images/ball.png',
				"left_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"right_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"cloud": {
                "name": "cloud",
                "description": "cloud sprite",
				"image": 'images/cloud.png',
				"on_frames": [7, 6, 5, 4, 3, 2, 1, 0],
				"off_frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"crumble": {
                "name": "crumble",
                "description": "crumble sprite",
				"image": 'images/crumble.png',
				"frames": [0, 1, 2, 3, 4, 5, 6, 7],
			},
			"explosion": {
                "name": "explosion",
                "description": "explosion sprite",
				"image": 'images/explo.png',
				"frames": [0, 1, 2, 3, 4, 5, 6, 7],
			}
		},

	}
};



function update_loading_screen(context, width, height, percentComplete) {
	var msg = "Loading Resources . " + percentComplete + "% loaded";
	context.clearRect( 0,0, width , height );
	context.fillStyle = "white";
	context.font = "14px Comic Sans MS";
	context.fillText( msg , width / 2 - msg.length * 6 / 2 , height /2 );
}


function checkLoadComplete() {
	assetsLoaded += 1;
	if (assetsLoaded == totalAssets) {
		console.log("Assets Loaded");
		startGame();
	} else {
		var pct = ( assetsLoaded * 100.0 / totalAssets).toFixed(2);
		update_loading_screen(context, canvas.width, canvas.height, pct);
	}
}

let totalAssets = 0;
let assetsLoaded = 0;
/**
 * Load level and assets.
 * 
 * @param {string} levelName 
 */
function loadAssets(levelName) {
	totalAssets += Object.keys(config.assets.images).length;

	// load other images for the game like sprites, objects, bullets, particles.
    for (let image in config.assets.images) {
		images[image] = new Image();
		images[image].src = config.assets.images[image].image;
		images[image].addEventListener('load', checkLoadComplete);
	}

}