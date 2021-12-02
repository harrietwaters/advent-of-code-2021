const { input } = require('./input')

// const input = [
//     "forward 5",
//     "down 5",
//     "forward 8",
//     "up 3",
//     "down 8",
//     "forward 2",
// ]

const FORWARD = 'forward'
const UP = 'up'
const DOWN = 'down'

function runInstructions(instructions) {
    const position = {
        [FORWARD]: 0,
        depth: 0,
        aim: 0,
    }

    for (const instruction of instructions) {
        const [direction, amount] = instruction.split(' ')
        if (direction === FORWARD) {
            position[FORWARD] += +amount
            position['depth'] += position['aim'] * +amount
        }
        else if (direction === DOWN) {
            position['aim'] += +amount
        }
        else if (direction === UP) {
            position['aim'] -= +amount
        }
        console.dir(position)
    }

    return position[FORWARD] * position['depth'];
}

console.log(runInstructions(input))