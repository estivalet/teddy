class Cloud {
    
    constructor(image, x, y, width, height, status, frames) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.status = status;
        console.log('created cloud ' + status);
        this.framesSequence = frames;

        this.animCount = 4;
        this.currentFrame = 0;
        this.framesSequenceIndex = 0;
        this.pos = parseInt(this.x / 32) + (parseInt(this.y / 32) * 20);
    }

    update(dt) {
        // one time only animation.
        if (this.framesSequenceIndex > this.framesSequence.length - 1) {
            console.log("finish cloud " + this.status + "  "  +this.pos);
            if(this.status == "on") {
                console.log("set " + tileExtractor.tiles[2].id);
                let tile = tileExtractor.tiles[2];
                tileMap.setTileByPos(this.pos, tile);
            } else {
                let tile = tileExtractor.tiles[0];
                tileMap.setTileByPos(this.pos, tile);
            }
            console.log("==================");
            console.log(this.pos + " = " + tileMap.getTileByPos(this.pos).id);
            console.log("==================");
            cloud = null;
            allowNewCloud = true;
            return false;
        }

        if (this.animCount >= 4) {
            this.animCount = 0;
            this.framesSequenceIndex++;
            this.currentFrame = this.framesSequence[this.framesSequenceIndex];
        } else {
            this.animCount++;
        }      

        return true;

    }

    render(context) {
		context.drawImage(this.image, 
            this.width  * this.currentFrame , 
            0, 
            this.width , 
            this.height , 
            (this.pos % 20) * 32, 
            (parseInt(this.pos / 20)) * 32,
            this.width , 
            this.height );
    }
}