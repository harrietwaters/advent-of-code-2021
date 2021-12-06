const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function getStartingFish(input) {
    const rawFishes = input.split(',')
    const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const rawFish of rawFishes) fish[+rawFish]++
    return fish
}

const startingFishes = getStartingFish(rawInput)

function getFishPopulation(fishes, days) {
    for (let i = 0; i < days; i++) {
        const spawningFish = fishes.shift()
        fishes[6] += spawningFish
        fishes[8] = spawningFish
    }
    return fishes.reduce((acc, curr) => acc + curr, 0)
}

console.log(getFishPopulation(startingFishes, 256))
// 1732821262171