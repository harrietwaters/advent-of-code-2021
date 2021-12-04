const { input } = require('./input')
// const input = [
//     "00100",
//     "11110",
//     "10110",
//     "10111",
//     "10101",
//     "01111",
//     "00111",
//     "11100",
//     "10000",
//     "11001",
//     "00010",
//     "01010",
// ];

function parseInput(arr) {
    return arr.map(str => parseInt(str, 2))
}

const parsedInput = parseInput(input);

function getHalfLength(arr) {
    return Math.ceil(arr.length / 2)
}

function getCounts(arr, width) {
    let counts = []
    for (let i = 0; i < width; i++) {
        counts[i] = 0
    }

    for (let i = 0; i < arr.length; i++) {
        let mask;
        for (let j = 0; j < width; j++) {
            mask = 0b1 << width - 1 - j
            if (mask & arr[i]) {
                counts[j]++
            }
        }
    }
    return counts;
}

function calcLifeSupport(arr, width) {
    const mostSignificantBit = Math.pow(2, width - 1);

    let oxygenRatingsArr = Array.from(arr)
    let oxyCounts = getCounts(oxygenRatingsArr, width)
    let oxyValue = 0b0;
    let oxyMask = mostSignificantBit
    for (let i = 0; i <= oxyCounts.length; i++) {
        if (oxygenRatingsArr.length === 1) break;
        if (oxyCounts[i] >= getHalfLength(oxygenRatingsArr)) {
            oxyValue |= Math.pow(2, width - 1 -i);
        }
        oxygenRatingsArr = oxygenRatingsArr
            .filter(num => ((num & oxyMask) ^ oxyValue) === 0);
        oxyCounts = getCounts(oxygenRatingsArr, width)
        oxyMask >>= 1
        oxyMask |= mostSignificantBit;
    }

    let c02RatingsArr = Array.from(arr)
    let c02Counts = getCounts(c02RatingsArr, width)
    let c02Value = 0b0;
    let c02Mask = mostSignificantBit
    for (let i = 0; i < c02Counts.length; i++) {
        if (c02RatingsArr.length === 1) break;
        const halfLength = getHalfLength(c02RatingsArr)
        if (c02Counts[i] < halfLength) {
            c02Value |= Math.pow(2, width - 1 -i)
        }
        c02RatingsArr = c02RatingsArr
            .filter(num => ((num & c02Mask) ^ c02Value) === 0);
        c02Counts = getCounts(c02RatingsArr, width)
        c02Mask >>= 1
        c02Mask |= mostSignificantBit;
    }
    return oxygenRatingsArr * c02RatingsArr
}

console.log(calcLifeSupport(parsedInput, input[0].length))
// 1877139