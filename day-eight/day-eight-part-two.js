const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

class Display {
    sortedWires = new Array(10)
    constructor(wires) {
        let unsortedWires = new Array(10)
        for (const wire of wires) {
            const wMask = this.wireToMask(wire)
            if (wire.length === 2) {
                this.sortedWires[1] = wMask
            } else if (wire.length === 3) {
                this.sortedWires[7] = wMask
            } else if (wire.length === 4) {
                this.sortedWires[4] = wMask
            } else if (wire.length === 7) {
                this.sortedWires[8] = wMask
            } else {
                unsortedWires.push(wMask)
            }
        }

        const nineIdx = unsortedWires.findIndex(wMask => (wMask | this.sortedWires[4]) === wMask);
        this.sortedWires[9] = unsortedWires.splice(nineIdx, 1)[0];

        const bdWires = this.sortedWires[4] ^ this.sortedWires[7];
        const fiveIdx = unsortedWires
            .findIndex(wMask => (wMask | this.sortedWires[9]) === this.sortedWires[9] && (wMask | bdWires) === wMask);
        this.sortedWires[5] = unsortedWires.splice(fiveIdx, 1)[0];

        const eWire = this.sortedWires[8] ^ this.sortedWires[9];
        this.sortedWires[6] = this.sortedWires[5] | eWire;
        unsortedWires = unsortedWires.filter(wMask => wMask !== this.sortedWires[6]);

        const threeIdx = unsortedWires
            .findIndex(wMask => (wMask | this.sortedWires[9]) === this.sortedWires[9]);
        this.sortedWires[3] = unsortedWires.splice(threeIdx, 1);

        const zeroIdx = unsortedWires
            .findIndex(wMask => (wMask | this.sortedWires[7]) === wMask);
        this.sortedWires[0] = unsortedWires.splice(zeroIdx, 1)[0];
        this.sortedWires[2] = unsortedWires[0];
    }

    value(activeWires) {
        return +activeWires
            .map((w) => this.wireToMask(w))
            .reduce((output, num) => output + this.maskToNum(num).toString(), '')
    }

    wireToMask(wire) {
        const empty = 0b00000000
        const masks = {
            a: 0b01000000,
            b: 0b00100000,
            c: 0b00010000,
            d: 0b00001000,
            e: 0b00000100,
            f: 0b00000010,
            g: 0b00000001,
        }
        return wire
            .split('')
            .reduce((acc, ltr) => acc | masks[ltr], empty)
    }


    maskToNum(mask) {
        if ((mask ^ this.sortedWires[0]) === 0) return 0
        if ((mask ^ this.sortedWires[1]) === 0) return 1
        if ((mask ^ this.sortedWires[2]) === 0) return 2
        if ((mask ^ this.sortedWires[3]) === 0) return 3
        if ((mask ^ this.sortedWires[4]) === 0) return 4
        if ((mask ^ this.sortedWires[5]) === 0) return 5
        if ((mask ^ this.sortedWires[6]) === 0) return 6
        if ((mask ^ this.sortedWires[7]) === 0) return 7
        if ((mask ^ this.sortedWires[8]) === 0) return 8
        if ((mask ^ this.sortedWires[9]) === 0) return 9
    }
}

function parseInput(input) {
    return input
        .split('\n')
        .map(str => {
            const [wires, active] = str.split(' | ')
            return (new Display(wires.split(' '))).value(active.split(' '))
        })
}

const displays = parseInput(rawInput)
console.log(displays.reduce((acc, curr) => acc + curr, 0))
// 973292