const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function getStartingFish(input) {
    const rawFishes = input
        .split(',')
        .map(str => +str)
        .sort()

    const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const rawFish of rawFishes) {
        fish[rawFish]++
    }
    return fish
}

const startingFishes = getStartingFish(rawInput)

function getFishPopulation(fishes, days) {
    for (let i = 0; i < days; i++) {
        const spawningFish = fishes.shift()
        if (fishes.length < 9) fishes[8] = 0
        if (spawningFish > 0) {
            fishes[6] += spawningFish
            fishes[8] = spawningFish
        }
    }

    return fishes.reduce((acc, curr) => acc + curr, 0)
}

console.log(getFishPopulation(startingFishes, 80))
// 386536