const { readFileSync } = require('fs')
const rawInput = readFileSync('./input.txt').toString()

function parseInput(input) {
    const lines = input.split('\n')
    const start = lines.shift()
    lines.shift()
    const instructions = lines.reduce((map, str) => {
        const [pairIn, letterOut] = str.split(' -> ');
        const a = `${pairIn[0]}${letterOut}`;
        const b = `${letterOut}${pairIn[1]}`;
        map[pairIn] = [a, b]
        return map
    }, {})
    return [start, instructions]
}

function initString(string) {
    const counts = {}
    for (let i = 0; i < string.length - 1; i++) {
        const pair = `${string[i]}${string[i + 1]}`
        counts[pair] = (counts[pair] ?? 0) + 1
    }
    return counts;
}

function iteratePairs(pairs, instructions) {
    const newPairs = {}
    for (const [pair, count] of Object.entries(pairs)) {
        for (const child of instructions[pair]) {
            newPairs[child] = (newPairs[child] ?? 0) + count
        }
    }
    return newPairs;
}

function loop(start, instructions, count) {
    let pairs = start
    for (let i = 0; i < count; i++) {
        pairs = iteratePairs(pairs, instructions)
    }
    return pairs
}

function doMath(pairs) {
    let nums = {}
    let pairsArr = Object.entries(pairs)
    for (const [pair, count] of pairsArr) {
        const [a, b] = pair.split('')
        nums[a] = (nums[a] ?? 0) + count
        nums[b] = (nums[b] ?? 0) + count
    }

    const sorted = Object
        .entries(nums)
        .map(([char, count]) => ([char, Math.ceil(count / 2)]))
        .sort(([, a], [, b]) => b - a)

    return sorted[0][1] - sorted[sorted.length - 1][1]
}

const [start, instructions] = parseInput(rawInput)
const startingPairs = initString(start)
const final = loop(startingPairs, instructions, 40)
console.log(doMath(final))