// Sample
// const input = [
//     199,
//     200,
//     208,
//     210,
//     200,
//     207,
//     240,
//     269,
//     260,
//     263,
// ]

const  { input } = require('./part-one-input')

function findIncreases(arr) {
    const sumArr = (arr) => arr
        .reduce((sum, curr) => sum + curr, 0)

    const sums = []
    for (let i = 1; i < arr.length - 1; i++) {
        sums.push(sumArr([
            arr[i - 1],
            arr[i],
            arr[i + 1],
        ]))
    }

    let increasesCount = 0;
    for (let i = 1; i < sums.length; i++) {
        sums[i] > sums[i - 1] && increasesCount++
    }
    return increasesCount;
}

console.log(findIncreases(input))
// 1158