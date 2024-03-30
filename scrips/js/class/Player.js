class Player extends Sprite {
    constructor({position, collisionBlocks, platformCollisionBlocks, imageSource, frameRate, scale = .5, animation}) {
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
            width: 10,
            height: 10,
        }
        this.lastDirection = 'right'
        this.animation = animation
        for (let key in this.animation) {
            const image = new Image()
            image.src = this.animation[key].imageSource
            this.animation[key].image = image
        }
        this.camaraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    shouldPanCameraToLeft({canvas, camera}) {
        const cameraBoxRightSide = this.camaraBox.position.x + this.camaraBox.width
        let scaledCanvasWidth = canvas.width / 4;


        if (cameraBoxRightSide >= 576) return

        if (cameraBoxRightSide >= scaledCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= player.velocity.x
        }
    }

    shouldPanCameraToRight({canvas, camera}) {
        if (this.camaraBox.position.x <= 0) return

        if (this.camaraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= player.velocity.x
        }
    }

    shouldPanCameraUp({canvas, camera}) {
        if (this.camaraBox.position.y + this.camaraBox.height + this.velocity.y >= 432) return

        const scaledCanvasHeight = canvas.height / 4;
        if (this.camaraBox.position.y + this.camaraBox.height <= Math.abs(camera.position.y) + scaledCanvasHeight ) {
            camera.position.y -= this.velocity.y;
        }
    }
    shouldPanCameraDown({canvas, camera}) {
        if (this.camaraBox.position.y + this.velocity.y <= 0) return

        if (this.camaraBox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }
    update() {
        this.updateFrames()
        this.updateHitbox()
        this.updateCameraBox()


        // Demo
        // // for hitbox
        if (DEVMODE) {
        c.fillStyle = 'rgba(0,0,255,.2)'
        c.fillRect(this.camaraBox.position.x, this.camaraBox.position.y, this.camaraBox.width, this.camaraBox.height);

        // for image
        c.fillStyle = 'rgba(0,255,0,.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // for hitbox
        c.fillStyle = 'rgba(255,0,0,.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }

        this.position.x += this.velocity.x;

        this.draw()

        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity();
        this.updateHitbox()
        this.checkForVerticalCollisions()

    }

    checkForHorizontalCanvasCollisions() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
            this.hitbox.position.x + this.velocity.x < 0) {
            this.velocity.x = 0;
        }
    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({
                first_object: this.hitbox,
                second_object: collisionBlock,
            })) {
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - offset - 0.001;
                }
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.001;
                }
            }
        }

    }

    applyGravity() {
        this.velocity.y += GRAVITY
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];


            if (collision({
                first_object: this.hitbox,
                second_object: collisionBlock,
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break
                }
            }
        }

        // for platform blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];


            if (platformCollision({
                first_object: this.hitbox,
                second_object: platformCollisionBlock,
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break
                }
            }
        }

    }

    swapSprite(key) {
        if (this.image === this.animation[key].image || !this.loaded) return
        this.currentFrame = 0
        this.image = this.animation[key].image
        this.frameRate = this.animation[key].frameRate
        this.frameBuffer = this.animation[key].frameBuffer
    }

    updateCameraBox() {
        this.camaraBox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }
}