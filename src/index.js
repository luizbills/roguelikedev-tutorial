import Display from './display.js'

const display = new Display({
    width: 80,
    height: 50,
})

const player = {
    ch: '@',
    x: Math.floor(display.W / 2),
    y: Math.floor(display.H / 2),
}

display.draw(player.x, player.y, player.ch, null, null, 'You')

const DIRS = {
    // WASD
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0],

    // Arrows
    arrowup: [0, -1],
    arrowdown: [0, 1],
    arrowleft: [-1, 0],
    arrowright: [1, 0],
}

window.addEventListener('keydown', (ev) => {
    const key = ev.key.toLowerCase()
    if (DIRS[key]) {
        const dx = DIRS[key][0]
        const dy = DIRS[key][1]

        display.clear()

        player.x += dx
        player.y += dy
        display.draw(player.x, player.y, player.ch, null, null, 'You')
    }
})
