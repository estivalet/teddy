class Wood extends Sprite {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        super(image, x, y, width, height);
        this.dy = 2;
        
        this.framesSequence = (direction == 0) ? leftFrames : rightFrames;
        this.leftFrames = leftFrames;
        this.rightFrames = rightFrames;
    }

    render(context) {
        if(this.visible) {
            super.render(context);
        }
    }

    hover(dt) {
        if (this.dy < 0) {
            if (!level.getObstacle(this.getXAsInt(), this.getYAsInt() + this.dy) && this.getYAsInt() >= 0) {
                this.move();
                return;
            } else {
                this.dy = -this.dy;
                return;
            }
        }

        if (!level.getObstacle(this.getXAsInt(), ((this.getYAsInt() + this.dy) + this.height) - 1)) {
                //&& super.getYAsInt() < getScreenHeight() - 32) {
            this.move();
            return;
        }

        this.dy = -this.dy;

    }

    
    update(dt) {
        this.hover(dt);

        if(this.dx > 0) {
            this.framesSequence = this.rightFrames;
        } else {
            this.framesSequence = this.leftFrames;
        }

        super.update();
    }

}