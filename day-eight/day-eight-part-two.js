const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

const bitmasks = {
    a: 0b01000000,
    b: 0b00100000,
    c: 0b00010000,
    d: 0b00001000,
    e: 0b00000100,
    f: 0b00000010,
    g: 0b00000001,
}

function wireToBitmask(wire) {
    return wire.split('').reduce((acc, ltr) => acc | bitmasks[ltr], 0)
}

function displayValue(activeWires, sortedWires) {
    return +activeWires
        .map(wire => sortedWires[wireToBitmask(wire)])
        .join('')
}

function wireDecoder(wires) {
    const sortedArr = new Array(10)
    let unsortedWires = new Array(10)
    for (const wire of wires) {
        const wBitmask = wireToBitmask(wire)
        if (wire.length === 2) {
            sortedArr[1] = wBitmask
        } else if (wire.length === 3) {
            sortedArr[7] = wBitmask
        } else if (wire.length === 4) {
            sortedArr[4] = wBitmask
        } else if (wire.length === 7) {
            sortedArr[8] = wBitmask
        } else {
            unsortedWires.push(wBitmask)
        }
    }

    const nineIdx = unsortedWires.findIndex(wMask => (wMask | sortedArr[4]) === wMask);
    sortedArr[9] = unsortedWires.splice(nineIdx, 1)[0];

    const bdBits = sortedArr[4] ^ sortedArr[7];
    const fiveIdx = unsortedWires
        .findIndex(wMask => (wMask | sortedArr[9]) === sortedArr[9] && (wMask | bdBits) === wMask);
    sortedArr[5] = unsortedWires.splice(fiveIdx, 1)[0];

    const eBit = sortedArr[8] ^ sortedArr[9];
    sortedArr[6] = sortedArr[5] | eBit;
    unsortedWires = unsortedWires.filter(wMask => wMask !== sortedArr[6]);

    const threeIdx = unsortedWires.findIndex(wMask => (wMask | sortedArr[9]) === sortedArr[9]);
    sortedArr[3] = unsortedWires.splice(threeIdx, 1)[0];

    const zeroIdx = unsortedWires.findIndex(wMask => (wMask | sortedArr[7]) === wMask);
    sortedArr[0] = unsortedWires.splice(zeroIdx, 1)[0];
    sortedArr[2] = unsortedWires[0];

    const output = {};
    for (const [i, sortedWire] of sortedArr.entries()) output[sortedWire] = i
    return output;
}

function parseInput(input) {
    return input
        .split('\n')
        .map(str => {
            const [rawWires, rawActive] = str.split(' | ')
            const wires = rawWires.split(' ')
            const active = rawActive.split(' ')
            const decoder = wireDecoder(wires)
            return displayValue(active, decoder)
        })
}

const displays = parseInput(rawInput)
console.log(displays.reduce((acc, curr) => acc + curr, 0))
// 973292