// Sampe
// const sonarReadings = [
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
    let increasesCount = 0;

    arr.reduce((prev, curr) => {
        if (curr > prev) increasesCount++
        return curr;
    })
    return increasesCount;
}

console.log(findIncreases(input))
// 1184