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

    let increasesCount = 0;
    let prev = sumArr([ arr[0], arr[1], arr[2] ])
    let curr;
    for (let i = 2; i < arr.length - 1; i++) {
        curr = sumArr([
            arr[i - 1],
            arr[i],
            arr[i + 1],
        ])

        curr > prev && increasesCount++
        prev = curr
    }
    return increasesCount;
}

console.log(findIncreases(input))
// 1158