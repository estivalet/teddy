class Cloud {
    
    constructor(image, x, y, status, framesOn, framesOff) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.status = status;
        this.framesSequence = (status == "on") ? framesOn : framesOff;

        this.animCount = 4;
        this.currentFrame = 0;
        this.framesSequenceIndex = 0;
        this.pos = parseInt(this.x / 32) + (parseInt(this.y / 32) * 20);
    }

    update(dt) {
        // one time only animation.
        if (this.framesSequenceIndex > this.framesSequence.length - 1) {
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
            this.x,
            this.y,
            this.width , 
            this.height );
    }
}