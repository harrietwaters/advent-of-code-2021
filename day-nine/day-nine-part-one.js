const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parseRows(input) {
    return input
        .split('\n')
        .map(row => row.split('').map(str => +str ));
}

function * getAdjacentLocations(y,x,rows) {
    // down
    if (rows[y - 1] != null) yield rows[y - 1][x];
    // up
    if (rows[y + 1] != null) yield rows[y + 1][x];
    // right
    if (rows[y][x + 1] != null) yield rows[y][x + 1];
    // left
    if (rows[y][x - 1] != null) yield rows[y][x - 1];
}

function findLowPoints(rows) {
    const lowPoints = []
    for (let y = 0; y < rows.length; y++) {
        columns:
        for (let x = 0; x < rows[0].length; x++) {
            const curr = rows[y][x];
            const adjacentLocations = getAdjacentLocations(y,x,rows);
            for (const location of adjacentLocations) {
                if (curr >= location) continue columns;
            }
            lowPoints.push([y, x])
        }
    }
    return lowPoints
}

function getRiskLevel(lowPoints, rows) {
    return lowPoints
        .reduce((acc, [y,x]) => acc + (+rows[y][x]) + 1, 0)
}

const rows = parseRows(rawInput)
const lowPoints = findLowPoints(rows)
const risk = getRiskLevel(lowPoints, rows)
console.log(risk)
