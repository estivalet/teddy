class Player {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
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

    update(dt) {

        var move = false;
        if(space) {
            if(left) {
                addCloud(this.getXAsInt(), this.getYAsInt(), -32, 0);
            } else if(right) {
                addCloud(this.getXAsInt(), this.getYAsInt(),(this.width + 32) - 1, 0);
            } else if(up) {
                if(this.dx < 0) {
                    addCloud(this.getXAsInt(), this.getYAsInt(),-32, -1);
                } else if(this.dx > 0) {
                    addCloud(this.getXAsInt(), this.getYAsInt(), (this.width + 32) - 1, -1);
                }
            } else if(down) {
                if(this.dx < 0) {
                    addCloud(this.getXAsInt(), this.getYAsInt(), -32, this.height + 1);
                } else if(this.dx > 0) {
                    addCloud(this.getXAsInt(), this.getYAsInt(), (this.width + 32) - 1, this.height + 1);
                }
            }
            
        } else if(left) {
            this.dx = -2;
            if (!getObstacle(this.getXAsInt() + this.dx, this.getYAsInt() +this.height-1) && this.getXAsInt() >= 0) {
                move = true;
            }
            this.framesSequence = config.assets.images["player"].left_frames;
        } else if(right) {
            this.dx = 2;
            if (!getObstacle(this.getXAsInt() + this.dx + this.width - 1, this.getYAsInt() + this.height-1) && this.getXAsInt() < canvas.width - 32) {
                move = true;
            }
            this.framesSequence = config.assets.images["player"].right_frames;

        } else {
        }

        if (up && !this.fall && !this.jump	&& !space
					&& !getObstacle(this.getXAsInt(), (this.getYAsInt()) - 1)
					&& !getObstacle(((this.getXAsInt()) + this.width) - 1,
							(this.getYAsInt()) - 1)) {
            this.jump = true;
            this.jumpSpeed = 8;
        }

        getPickUp((this.getXAsInt()) + this.width / 2, (this.getYAsInt()) + this.height / 2);


        if (this.jump) {
           if (!getObstacle(this.getXAsInt(), this.getYAsInt())
            && !getObstacle(((this.getXAsInt()) + this.width) - 1, this.getYAsInt())) {
                this.y += -this.jumpSpeed;
                this.jumpSpeed -= 1;
                if (this.jumpSpeed < -4) {
                    this.jumpSpeed = -4;
                }
            } else {
                this.jump = false;
            }
        }
        if (!getPlatform(((this.getXAsInt()) + this.width) - 1, (this.getYAsInt()) + this.height)
         && !getPlatform(this.getXAsInt(), (this.getYAsInt()) + this.height)) {
            if (!this.jump) {
                this.y += 4;
                this.fall = true;
            }
        } else {
            if (this.jumpSpeed < 0 || this.fall) {
            var k = (this.getYAsInt()) + this.height;
            if (k % 32 < 4) {
                this.y = (k - k % 32 - this.height);
                this.fall = false;
            } else {
                this.y += 4;
            }
        }
        if (this.jump && this.jumpSpeed < 0) {
            this.jump = false;
            this.fall = true;
        }
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