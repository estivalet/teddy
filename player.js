class Player extends Sprite {

    constructor(image, x, y, width, height, direction, leftFrames, rightFrames) {
        super(image, x, y, width, height);
        this.invincible = 0;
        this.slide = false;
        this.dead = false;
        
        this.framesSequence = (direction == 0) ? leftFrames : rightFrames;
        this.leftFrames = leftFrames;
        this.rightFrames = rightFrames;

        
    }

    render(context) {
        if(this.visible && !this.dead) {
            super.render(context);
        }

        if(this.dead) {
            if(this.explosion) {
                this.explosion.render(context);
            }            
        }
    }

    cloudAction() {
        if(left) {
            level.addCloud(this.getXAsInt(), this.getYAsInt(), -32, 0);
        } else if(right) {
            level.addCloud(this.getXAsInt(), this.getYAsInt(),(this.width + 32) - 1, 0);
        } else if(up) {
            if(this.dx < 0) {
                level.addCloud(this.getXAsInt(), this.getYAsInt(),-32, -1);
            } else if(this.dx > 0) {
                level.addCloud(this.getXAsInt(), this.getYAsInt(), (this.width + 32) - 1, -1);
            }
        } else if(down) {
            if(this.dx < 0) {
                level.addCloud(this.getXAsInt(), this.getYAsInt(), -32, this.height + 1);
            } else if(this.dx > 0) {
                level.addCloud(this.getXAsInt(), this.getYAsInt(), (this.width + 32) - 1, this.height + 1);
            }
        }
    }

    checkEnemyCollision() {
        if (this.invincible == 0) {
            enemies.forEach(enemy => {
                if (enemy.getXAsInt() < ((this.getXAsInt()) + this.width) - 2
                    && (enemy.getXAsInt()) + enemy.width > (this.getXAsInt()) + 2
                    &&  enemy.getYAsInt() < ((this.getYAsInt()) + this.height) - 2
                    && (enemy.getYAsInt()) + enemy.height > (this.getYAsInt()) + 2) {
                    this.kill();
                    console.log('died');

                    return true;
                }
            });
        }

        return false;
    }

    kill() {
        this.explosion = new Explosion(images.explosion, this.x ,this.y, 32, 32,config.assets.images["explosion"].frames);
        this.dead = true;
    }

    update(dt) {
        if(this.dead) {
            if(this.explosion) {
                if(!this.explosion.update(dt)) {
                    this.explosion = null;
                }
            } 
            return;
        }

        this.checkEnemyCollision();
        


        var move = false;

        var i = level.getBlock(((this.getXAsInt()) + this.width) - 1, (this.getYAsInt()) + this.height);
        var j = level.getBlock(this.getXAsInt(), (this.getYAsInt()) + this.height);

        // spikes
        if ((i == 12 || j == 12)) {
            //PlayerKilled(super.getXAsInt(), super.getYAsInt());
            //return;// false;
        }

        // check for ice.
        this.slide = false;
        if (i == 4 || j == 4) {
            if (this.dx < 0) {
                if (!level.getObstacle(this.getXAsInt() + this.dx, ((this.getYAsInt()) + this.height) - 1)
                 && !level.getObstacle(this.getXAsInt() + this.dx, this.getYAsInt())  
                 && this.getXAsInt() >= 0) {
                    this.slide = true;
                    this.dx = -2;
                    move = true;
                }
            } else if (!level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, ((this.getYAsInt()) + this.height) - 1)
                    && !level.getObstacle(((this.getXAsInt() + this.dx) + this.width) - 1, this.getYAsInt())
                    && this.getXAsInt() < canvas.width - 32) {
                this.slide = true;
                this.dx = 2;
                move = true;
            }
        }


        if(space) {
            this.cloudAction();

        } else if(left) {
            this.dx = -2;
            if (!level.getObstacle(this.getXAsInt() + this.dx, this.getYAsInt() +this.height-1) && this.getXAsInt() >= 0 && !this.slide) {
                move = true;
            }
            this.framesSequence = config.assets.images["player"].left_frames;
        } else if(right) {
            this.dx = 2;
            if (!level.getObstacle(this.getXAsInt() + this.dx + this.width - 1, this.getYAsInt() + this.height-1) 
            && this.getXAsInt() < canvas.width - 32 && !this.slide) {
                move = true;
            }
            this.framesSequence = config.assets.images["player"].right_frames;

        } else {
        }

        if (up && !this.fall && !this.jump	&& !space
					&& !level.getObstacle(this.getXAsInt(), (this.getYAsInt()) - 1)
					&& !level.getObstacle(((this.getXAsInt()) + this.width) - 1,
							(this.getYAsInt()) - 1)) {
            this.jump = true;
            this.jumpSpeed = 8;
        }

        // check if stepping over a crumble
        if(level.getBlock(this.getXAsInt(), this.getYAsInt() + this.height + 1) == 3) {
            console.log("start crumble");
            level.addCrumble(this.getXAsInt(), this.getYAsInt() + this.height + 1);
        }

        level.getPickUp((this.getXAsInt()) + this.width / 2, (this.getYAsInt()) + this.height / 2);


        if (this.jump) {
           if (!level.getObstacle(this.getXAsInt(), this.getYAsInt())
            && !level.getObstacle(((this.getXAsInt()) + this.width) - 1, this.getYAsInt())) {
                this.y += -this.jumpSpeed;
                this.jumpSpeed -= 1;
                if (this.jumpSpeed < -4) {
                    this.jumpSpeed = -4;
                }
            } else {
                this.jump = false;
            }
        }
        if (!level.getPlatform(((this.getXAsInt()) + this.width) - 1, (this.getYAsInt()) + this.height)
         && !level.getPlatform(this.getXAsInt(), (this.getYAsInt()) + this.height)) {
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

        if (this.invincible > 0) {
            this.invincible--;
            if ((this.invincible & 2) > 0) {
                this.visible = false;
            } else {
                this.visible = true;
            }
        }

    }



        if(move) {
            super.move();
            super.update();

            //
        } else {
            if(this.dx < 0) {
                this.currentFrame = this.framesSequence[3];
            } else {
                this.currentFrame = this.framesSequence[0];
            }
        }  
    }

 

}