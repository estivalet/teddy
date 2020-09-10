class Crumble extends Sprite {
    
    constructor(image, x, y, width, height, framesSquence) {
        super(image, x, y, width, height, framesSquence);

        this.active = true;
        this.pos = parseInt(this.x / 32) + (parseInt(this.y / 32) * 20);
    }

    update(dt) {
        // one time only animation.
        if (this.framesSequenceIndex > this.framesSequence.length - 1) {
            console.log("finish crumble  "  +this.pos);
            let tile = tileExtractor.tiles[0];
            level.tileMap.setTileByPos(this.pos, tile);
            this.active = false;
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