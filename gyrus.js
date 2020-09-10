class Gyrus extends Sprite {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        super(image, x, y, width, height);
        this.dx = 2;

        this.framesSequence = (direction == 0) ? leftFrames : rightFrames;
        this.leftFrames = leftFrames;
        this.rightFrames = rightFrames;
    }

    render(context) {
        if(this.visible) {
            super.render(context);
        }
    }

    fly(dt) {
        if (this.dx < 0) {
            if (!level.getObstacle(this.getXAsInt() + this.dx, ((this.getYAsInt()) + this.height) - 1)
             && !level.getObstacle(this.getXAsInt() + this.dx, this.getYAsInt()) && this.getXAsInt() >= 0) {
                this.move();
                return;
            } else {
                this.dx = -this.dx;
                return;
            }
        }

        if (!level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1)
         && !level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, this.getYAsInt())) {
                //&& super.getXAsInt() < getScreenWidth() - 32) {
            this.move();
            return;
        }


        this.dx = -this.dx;
    }

    update(dt) {
        this.fly(dt);

        if(this.dx > 0) {
            this.framesSequence = this.rightFrames;
        } else {
            this.framesSequence = this.leftFrames;
        }

        super.update();
    }

}