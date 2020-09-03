class Thing {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 2;
        this.width = width;
        this.height = height;
        
        this.animCount = 4;
        this.currentFrame = 0;
        this.framesSequence = (direction == 0) ? leftFrames : rightFrames;
        this.framesSequenceIndex = 0;
        this.leftFrames = leftFrames;
        this.rightFrames = rightFrames;
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

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    walkFall(dt) {
        if (this.dx < 0) {
            if (!getObstacle(this.getXAsInt() + this.dx, ((this.getYAsInt()) + this.height) - 1)
            &&  !getObstacle(this.getXAsInt() + this.dx, this.getYAsInt()) && this.getXAsInt() >= 0) {
                if (!getPlatform(
                        ((this.getXAsInt() + this.dx) + this.width) - 1, (this.getYAsInt()) + this.height)
                        && !getPlatform(this.getXAsInt() + this.dx, (this.getYAsInt()) + this.height)) {
                    //super.updateY(4);
                    this.y += 4;
                    return;
                } else {
                    this.move();
                    return;
                }
            } else {
                this.dx = -this.dx;
                return;
            }
        }

        if (!getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1)
        &&  !getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, this.getYAsInt())) {
                //&& super.getXAsInt() < getScreenWidth() - 32) {
            if (!getPlatform(((this.getXAsInt() + this.dx) + this.width) - 1, (this.getYAsInt()) + this.height)
                    && !getPlatform(this.getXAsInt() + this.dx,  (this.getYAsInt()) + this.height)) {
                this.y += 4;
                return;
            } else {
                this.move();
                return;
            }
        }

        this.dx = -this.dx;

    }

    
    update(dt) {
        this.walkFall(dt);

        if(this.dx > 0) {
            this.framesSequence = this.rightFrames;
        } else {
            this.framesSequence = this.leftFrames;
        }

            if (this.animCount >= 4) {
                this.animCount = 0;
                this.framesSequenceIndex++;
                if (this.framesSequenceIndex > this.framesSequence.length - 1) {
                    this.framesSequenceIndex = 0;
                }
                this.currentFrame = this.framesSequence[this.framesSequenceIndex];
            } else {
                this.animCount++;
            }      
    }

    getXAsInt() {
		return Math.round(this.x);
	}

	getYAsInt() {
		return Math.round(this.y);
	}

}