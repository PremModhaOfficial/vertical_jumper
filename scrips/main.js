const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

const GRAVITY = .1;
const DEVMODE = false

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
                    },
                    height: 4
                }))
        }
    })
})

const player = new Player({
    position: {
        x: 100,
        y: 300,
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSource: "scrips/assets/warrior/Idle.png",
    frameRate: 8,
    animation: {
        Idle: {
            imageSource: "scrips/assets/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        IdleLeft: {
            imageSource: "scrips/assets/warrior/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSource: "scrips/assets/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        RunLeft: {
            imageSource: "scrips/assets/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        Fall: {
            imageSource: "scrips/assets/warrior/Fall.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSource: "scrips/assets/warrior/FallLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSource: "scrips/assets/warrior/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        Jump: {
            imageSource: "scrips/assets/warrior/Jump.png",
            frameRate: 2,
            frameBuffer: 3,
        },

    }
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

const backgroundImageHeight = 432
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    ////////// Demo

    if (DEVMODE) {
        collisionBlocks.forEach(collisionBlock => {
            collisionBlock.update()
        });
        platformCollisionBlocks.forEach(collisionBlock => {
            collisionBlock.update()
        })
    }
    //////////
    player.checkForHorizontalCanvasCollisions()
    player.update();

    player.velocity.x = 0
    if (keys.a.pressed) {
        player.swapSprite('RunLeft')
        player.velocity.x = -5;
        player.lastDirection = 'left'
        player.shouldPanCameraToRight({canvas, camera})
    } else if (keys.d.pressed) {
        player.swapSprite('Run')
        player.velocity.x = 5;
        player.lastDirection = 'right'
        player.shouldPanCameraToLeft({canvas, camera})
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right')
            player.swapSprite('Idle')
        else player.swapSprite('IdleLeft')
    }
    if (player.velocity.y > 0) {
        player.shouldPanCameraUp({canvas, camera})
        if (player.lastDirection === 'right') {
            player.swapSprite('Fall');
        } else player.swapSprite('FallLeft')
    } else if (player.velocity.y < 0) {
        player.shouldPanCameraDown({canvas, camera})
        if (player.lastDirection === 'right')
            player.swapSprite('Jump');
        else player.swapSprite('JumpLeft')
    }

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
            if (player.velocity.y === 0)
                player.velocity.y = -4; // jump
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