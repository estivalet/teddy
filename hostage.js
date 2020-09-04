class Hostage {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.dx = (direction == 0) ? -1 : 1;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.fall = false;
        
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

    update(dt) {
    var i = getBlock(((this.getXAsInt()) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1);
    var j = getBlock(this.getXAsInt(), ((this.getYAsInt()) + this.height) - 1);
    // 7 is open door tile.
    if (i == 7 && j == 7) {
        //LevelComplete();
        // return false;
        //return;// true;
    }
    var move = false;
    if (!this.fall)
        if (this.dx < 0) {
            if (!getObstacle(this.getXAsInt() + this.dx, ((this.getYAsInt()) + this.height) - 1)
             && !getObstacle(this.getXAsInt() + this.dx, this.getYAsInt()) && this.getXAsInt() >= 0) {
                move = true;
                // Animate();
                //super.getAnimation().update();
            } else {
                // super.getDxAsInt() *= -1;
                this.dx = -this.dx;
                this.framesSequence = this.rightFrames;
                //super.getAnimation().setFramesSequence(Anim_R);
            }
        } else if (!getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1)
                && !getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, this.getYAsInt())
                && this.getXAsInt() < canvas.width - 32) {
            move = true;
            // Animate();
            //super.getAnimation().update();
        } else {
            // super.getDxAsInt() *= -1;
            //super.invertDx();
            this.dx = -this.dx;
            // super.Anim = Anim_L;
            this.framesSequence = this.leftFrames;
            //super.getAnimation().setFramesSequence(Anim_L);
        }
    if (!getPlatform(((this.getXAsInt()) + this.width) - 1, (this.getYAsInt()) + this.height)
            && !getPlatform(this.getXAsInt(), (this.getYAsInt()) + this.height))// &&
    // !this.game.OnPlatform(this))
    {
        //super.updateY(4);
        this.y += 4;
        this.fall = true;
    } else if (this.fall) {
        var k = (this.getYAsInt()) + this.height;
        this.y = k - k % 32 - this.height;
        this.fall = false;
    }





        if(move) {
            this.x += this.dx;
            this.y += this.dy;

            //
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
        } else {
            this.currentFrame = this.framesSequence[0];
        }  
    }

    getXAsInt() {
		return Math.round(this.x);
	}

	getYAsInt() {
		return Math.round(this.y);
	}

}