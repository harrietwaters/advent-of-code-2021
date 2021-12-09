const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parseInput(input) {
    return input
        .split('\n')
        .map(str => 
            str
                .split(' | ')
                .map((subStr => subStr.split(' ')))
        )
}

function guessNumber(input) {
    switch (input.length) {
        case 2:
            return 1
        case 3:
            return 4
        case 4:
            return 7
        case 7:
            return 8
    }
}

function fixWires(displays) {
    let count = 0
    for (const [,activatedWires] of displays) {
        for (activatedWire of activatedWires) {
            if (guessNumber(activatedWire)) {
                console.log(activatedWire)
                count++
            }
        }
    }
    return count
}

const parsedInput = parseInput(rawInput)
// console.log(parsedInput)
console.log(fixWires(parsedInput))
// 294