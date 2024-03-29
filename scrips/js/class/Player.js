class Player extends Sprite {
    constructor({position, collisionBlocks, platformCollisionBlocks, imageSource , frameRate, scale = .5}) {
        super({
            imageSource: imageSource,
            frameRate,
            scale
        })
        this.height = 25
        this.width = 25
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }
    }

    update() {
        this.updateFrames()
        c.fillStyle = 'rgba(0,255,0,.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;

        this.draw()

        this.checkForHorizontalCollisions()
        this.applyGravity();
        this.checkForVerticalCollisions()

    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({
                first_object: this,
                second_object: collisionBlock,
            })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                }
            }
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += GRAVITY
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({
                first_object: this,
                second_object: collisionBlock,
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break
                }
            }
        }
    }

}