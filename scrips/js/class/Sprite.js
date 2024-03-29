class Sprite {
    constructor({position, imageSource, frameRate = 1, frameBuffer = 3 , scale = 1}) {
        this.position = position
        this.scale = scale
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            this.height = (this.image.height) * this.scale
            this.width = (this.image.width / this.frameRate) * this.scale
            this.loaded = true
        }
        this.image.src = imageSource;
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = 3
        this.elapsedFrames = 0
    }

    draw() {
        if (!this.image) return

        const cropBox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        c.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frameRate;
        }
    }
}