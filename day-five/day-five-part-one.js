const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parsePairs(input) {
    return input
        .split('\n')
        .map(line =>
            line
                .split(' -> ')
                .map(strPair => strPair
                    .split(',')
                    .map(str => +str)
                )
        )
}

const pairs = parsePairs(rawInput)

function sortAsc(a, b) {
    return a - b
}

function createLine(a, b) {
    const deltaX = b[0] - a[0]
    const [minY, maxY] = [a[1], b[1]].sort(sortAsc)
    if (deltaX === 0) {
        return function* () {
            for (let y = minY; y <= maxY; y++) yield [a[0], y];
        }
    }

    const deltaY = b[1] - a[1]
    const [minX, maxX] = [a[0], b[0]].sort(sortAsc)
    if (deltaY === 0) {
        return function* () {
            for (let x = minX; x <= maxX; x++) yield [x, a[1]];
        }
    }

    return function* () { }
}

function getOverlaps(input) {
    const seen = new Set();
    const dupes = new Set();
    for (const [a, b] of input) {
        const line = createLine(a, b)()
        for (const point of line) {
            const key = point.join(',');
            seen.has(key) ? dupes.add(key) : seen.add(key);
        }
    }
    return [dupes, seen]
}

const [dupes] = getOverlaps(pairs)
console.log(dupes.size)
// 5167