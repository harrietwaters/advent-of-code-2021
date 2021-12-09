const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parseRows(input) {
    return input
        .split('\n')
        .map(row => row.split('').map(str => +str));
}

function* getAdjacentLocations(y, x, rows) {
    // down
    if (rows[y - 1] != null) yield rows[y - 1][x];
    // up
    if (rows[y + 1] != null) yield rows[y + 1][x];
    // left
    if (rows[y][x - 1] != null) yield rows[y][x - 1];
    // right
    if (rows[y][x + 1] != null) yield rows[y][x + 1];
}

function* followBasin(y, x, rows) {
    const start = rows[y][x]

    const notNull = (_y, _x) => rows[_y] != null && rows[_y][_x] != null
    const big = (_y, _x) => rows[_y][_x] > start
    const tooBig = (_y, _x) => rows[_y][_x] === 9

    // down
    if (notNull(y - 1, x) && big(y - 1, x) && !tooBig(y - 1, x)) yield* followBasin(y - 1, x, rows)
    // // up
    if (notNull(y + 1, x) && big(y + 1, x) && !tooBig(y + 1, x)) yield* followBasin(y + 1, x, rows)
    // left
    if (notNull(y, x - 1) && big(y, x - 1) && !tooBig(y, x - 1)) yield* followBasin(y, x - 1, rows)
    // right
    if (notNull(y, x + 1) && big(y, x + 1) && !tooBig(y, x + 1)) yield* followBasin(y, x + 1, rows)

    yield [y, x]
}

function findBasins(rows) {
    let basins = []
    for (let y = 0; y < rows.length; y++) {
        // for (let y = 0; y < 1; y++) {
        columns:
        for (let x = 0; x < rows[0].length; x++) {
            // for (let x = 1; x < 2; x++) {
            const curr = rows[y][x];
            const adjacentLocations = getAdjacentLocations(y, x, rows);
            for (const location of adjacentLocations) {
                if (curr >= location) continue columns;
            }
            // We do some trickery here to remove dupes, by assigning a string key and putting it
            // in a set before removing
            const basinCoords = new Set(Array.from(followBasin(y, x, rows), ([y, x]) => `${y},${x}`))
            basins.push(Array.from(basinCoords, (str) => str.split(',').map(s => +s)))
        }
    }
    return basins.sort((a, b) => b.length - a.length)
}

function getBasinSizes(basins) {
    return basins
        .map(basin => basin.length)
        .reduce((acc, size) => acc * size, 1)
}

const rows = parseRows(rawInput)
const basins = findBasins(rows)
const basinSizes = getBasinSizes(basins.slice(0, 3))
console.log(basinSizes)
