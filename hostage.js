class Hostage extends Sprite {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        super(image, x, y, width, height);
        this.dx = (direction == 0) ? -1 : 1;
        this.fall = false;
        
        this.framesSequence = (direction == 0) ? leftFrames : rightFrames;
        this.leftFrames = leftFrames;
        this.rightFrames = rightFrames;
    }

    update(dt) {
    var i = level.getBlock(((this.getXAsInt()) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1);
    var j = level.getBlock(this.getXAsInt(), ((this.getYAsInt()) + this.height) - 1);
    // 7 is open door tile.
    if (i == 7 && j == 7) {
        //LevelComplete();
        // return false;
        //return;// true;
    }
    var move = false;
    if (!this.fall)
        if (this.dx < 0) {
            if (!level.getObstacle(this.getXAsInt() + this.dx, ((this.getYAsInt()) + this.height) - 1)
             && !level.getObstacle(this.getXAsInt() + this.dx, this.getYAsInt()) && this.getXAsInt() >= 0) {
                move = true;
                // Animate();
                //super.getAnimation().update();
            } else {
                // super.getDxAsInt() *= -1;
                this.dx = -this.dx;
                this.framesSequence = this.rightFrames;
                //super.getAnimation().setFramesSequence(Anim_R);
            }
        } else if (!level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1)
                && !level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, this.getYAsInt())
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
    if (!level.getPlatform(((this.getXAsInt()) + this.width) - 1, (this.getYAsInt()) + this.height)
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
            super.move();
            super.update();

        } else {
            this.currentFrame = this.framesSequence[0];
        }  
    }
}