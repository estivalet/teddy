class Explosion extends Sprite {
    
    constructor(image, x, y, width, height, frames) {
        super(image, x, y, width, height, frames);
        super.cycleAnimation = false;
    }

}