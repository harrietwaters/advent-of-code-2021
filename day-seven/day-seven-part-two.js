const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function getCrabPositions(input) {
    const nums = input
        .split(',')
        .map(pos => +pos)
        .sort((a,b) => a - b);
    return nums
}

function getCost(a, b) {
    const distance = Math.abs(a - b)
    return (distance * (distance + 1)) / 2
}

function findCheapestPosition(crabPos) {
    const minPosition = crabPos[0]
    const maxPosition = crabPos[crabPos.length - 1]
    let cheapest = Number.MAX_SAFE_INTEGER
    let pos
    for (let i = minPosition; i <= maxPosition; i++) {
        let totalDistance = 0;
        for (const pos of crabPos) {
            totalDistance += getCost(pos, i)
        }
        cheapest = Math.min(cheapest, totalDistance)
        if (cheapest === totalDistance) pos = i
    }
    return [pos, cheapest]
}

const crabPositions = getCrabPositions(rawInput);
const cheapestPos = findCheapestPosition(crabPositions);

console.log(cheapestPos);
// [468, 98039527]