const { setTimeout } = require('timers/promises')
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

async function runInstructions(instructions) {
    const position = {
        [FORWARD]: 0,
        depth: 0,
        aim: 0,
    }

    for (const [i, instruction] of instructions.entries()) {
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
        const rotor = i % 2 === 0 ? 'x' : 'X'
        const bubble1 = i % 2 === 0 ? 'o' : 'O'
        const bubble2 = i % 2 === 0 ? 'O' : 'o'
        const drawing = `
               _      Current Depth: ${position.depth}  
           ___|___
${bubble2}     ____/ o o o \\_____
 ${bubble1}   /                  \\
  ${rotor}-|     SANTAS SUB     |
     \\__________________/

`
        console.clear()
        console.log(drawing)
        await setTimeout(100)
    }

    return position[FORWARD] * position['depth'];
}

runInstructions(input).then((output) => {
    console.log(output)
    process.exit(0)
})