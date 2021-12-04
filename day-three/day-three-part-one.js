const { input } = require('./input')
// const input = [
//     "00100",
//     "11110",
//     "10110",
//     "10111",
//     "10101",
//     "01111",
//     "00111",
//     "11100",
//     "10000",
//     "11001",
//     "00010",
//     "01010",
// ];

function parseInput(arr) {
    return arr.map(str => parseInt(str, 2))
}

const parsedInput = parseInput(input);

function calcPowerConsumption(arr, width) {
    let counts = []
    for (let i = 0; i < width; i++) {
        counts[i] = 0
    }

    for (let i = 0; i < arr.length; i++) {
        let mask;
        for (let j = 0; j < width; j++) {
            mask = 0b1 << width - 1 - j
            if (mask & arr[i]) {
                counts[j]++
            }
        }
    }

    let halfLength = Math.floor(arr.length / 2)
    let gamma = 0b0
    let epsilon = 0b0
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] > halfLength) gamma |= 0x1 << width - 1 -i
        else epsilon |= 0b1 << width - 1 -i
    }

    return gamma * epsilon
}

console.log(calcPowerConsumption(parsedInput, input[0].length))
// [ 7, 5, 8, 7, 5 ]
// 2003336