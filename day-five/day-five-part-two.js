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

function createTest(a, b) {
    const deltaY = b[1] - a[1]
    const minX = Math.min(a[0], b[0])
    const maxX = Math.max(a[0], b[0])
    const isInXBound = ([x, y]) => x >= minX && x <= maxX
    if (deltaY === 0) {
        return ([x, y]) => (y === a[1] && isInXBound([x, y]))
    }

    const deltaX = b[0] - a[0]
    const minY = Math.min(a[1], b[1])
    const maxY = Math.max(a[1], b[1])
    const isInYBound = ([x, y]) => y >= minY && y <= maxY
    if (deltaX === 0) {
        return ([x, y]) => x === a[0] && isInYBound([x, y])
    }

    const m = deltaY / deltaX
    const c = -((m * a[0]) - a[1]);
    return ([x, y]) => (
        y === ((m * x) + c) &&
        isInXBound([x, y]) &&
        isInYBound([x, y])
    );
}

function createMap(pairs) {
    let testers = pairs.map(([a, b]) => createTest(a, b))

    let map = [];
    for (let x = 0; x <= 1000; x++) {
        map.push([])
        for (let y = 0; y <= 1000; y++) {
            map[x][y] = 0
            for (const tester of testers) {
                if (tester([x, y])) map[x][y]++
                if (map[x][y] === 2) break;
            }
        }
    }

    return map
}

const map = createMap(pairs)
console.log(map.flat().filter(num => num === 2).length)
// 17604