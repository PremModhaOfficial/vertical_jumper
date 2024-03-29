const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

const GRAVITY = .5;

canvas.width = 1024;
canvas.height = 576;

const floorCollisions2d = []
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2d.push(floorCollisions.slice(i, i + 36))
}

const platformCollisions2d = []
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2d.push(platformCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    }
                }))
        }
    })
})

const platformCollisionBlocks = []
platformCollisions2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    }
                }))
        }
    })
})

const player = new Player({
    position: {
        x: 100,
        y: 200,
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSource: "scrips/assets/warrior/Idle.png",
    frameRate: 8
});

const keys = {
    d: {pressed: false,},
    a: {pressed: false,},
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
    imageSource: "scrips/background.png",
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update()
    })

    platformCollisionBlocks.forEach(collisionBlock => {
        collisionBlock.update()
    })
    player.velocity.x = 0

    if (keys.a.pressed) {
        player.velocity.x = -5;
    } else if (keys.d.pressed) {
        player.velocity.x = 5;
    }
    player.update()
    c.restore()
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
            player.velocity.y = -10;
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