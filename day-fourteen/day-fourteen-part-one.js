const { readFileSync } = require('fs')
const rawInput = readFileSync('./input.txt').toString()

function parseInput(input) {
    const lines = input.split('\n')
    const start = lines.shift()
    lines.shift()
    const instructions = lines.reduce((acc, str) => {
        const [letterIn, letterOut] = str.split(' -> ');

        acc[letterIn] = letterOut
        // acc[letterIn] = `${letterIn[0]}${letterOut}${letterIn[1]}`
        return acc
    }, {})
    return [start, instructions]
}

function runTemplate(start, instructions) {
    let work = start
    for (let i = 0; i < work.length; i++) {
        const nextTwo = `${work[i]}${work[i+1]}`
        if (instructions[nextTwo]) {
            const firstHalf = work.slice(0, i + 1)
            const secondHalf = work.slice(i + 1)
            work = firstHalf + instructions[nextTwo] + secondHalf
            i += 1
        }
    }
    return work
}

const [start, instructions] = parseInput(rawInput)

function runPasses(num, start, instructions) {
    let work = start;
    for (let i = 0; i < num; i++) {
        console.log(i, work.length)
        work = runTemplate(work, instructions)
    }
    return work
}

function countLetters(word) {
    const counts = {}
    for (const char of word) {
        if (!counts[char]) counts[char] = 0
        counts[char]++
    }
    return counts
}
const final = runPasses(40, start, instructions)
const counts = countLetters(final)
console.log(counts)
// console.log(runPasses(4,start, instructions))
// console.log(instructions)
