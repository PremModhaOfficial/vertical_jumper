const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

const GRAVITY = .5;

canvas.width = 1024;
canvas.height = 576;

class Player {
    constructor(position) {
        this.height = 100
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height < canvas.height) this.velocity.y += GRAVITY;
        else this.velocity.y = 0
    }
}

class Sprite {
    constructor({position, imageSource}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSource
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}

const player = new Player({
    x: 300,
    y: 100,
})

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSource: "scrips/background.png",})

function animate() {
    window.requestAnimationFrame(animate)



    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save()
    c.scale(4,4)
    c.translate(0,-background.image.height + scaledCanvas.height)
    background.update()
    c.restore()

    player.update()

    player.velocity.x = 0


    if (keys.d.pressed) player.velocity.x = 5;
    else if (keys.a.pressed) player.velocity.x = -5;
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true;
            break

        case 'd':
            keys.d.pressed = true;
            break

        case 'w':
            player.velocity.y = -15;
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break

        case 'd':
            keys.d.pressed = false;
            break
    }
})