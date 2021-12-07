const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function getCrabPositions(input) {
    const nums = input
        .split(',')
        .map(pos => +pos)
        .sort((a, b) => a - b);
    return nums
}

function findCheapestPosition(crabPos) {
    const minPosition = crabPos[0];
    const maxPosition = crabPos[crabPos.length - 1];
    let cheapest = Number.MAX_SAFE_INTEGER;
    let cheapestPos;
    positions:
    for (let i = minPosition; i <= maxPosition; i++) {
        let totalDistance = 0;
        for (const pos of crabPos) {
            const distance = Math.abs(pos - i)
            totalDistance += (distance * (distance + 1)) / 2
            if (totalDistance > cheapest) continue positions;
        }
        cheapest = totalDistance
        cheapestPos = i
    }
    return [cheapestPos, cheapest]
}

const crabPositions = getCrabPositions(rawInput);
const cheapestPos = findCheapestPosition(crabPositions);

console.log(cheapestPos);
// [468, 98039527]