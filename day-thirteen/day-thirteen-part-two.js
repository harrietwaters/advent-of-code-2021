const { readFileSync } = require('fs')

const rawInput = readFileSync('./input-part-two.txt').toString()

function parseRows(input) {
    const dots = input
        .split('\n')
        .map(row => row.split(',').map(s => +s))
        .filter(r => r.length > 1);

    const instrs = input
        .split('\n')
        .filter(l => l.includes('fold'))
        .map((instr) => {
            const num = instr.split('=')[1]
            return instr.includes('y') ? [+num, 0] : [0, +num]
        })

    return [dots, instrs]
}

function draw(dots) {
    const drawArr = (new Array(dots.length))
    const maxX = Math.max(...dots.map(([x]) => x))

    for (let i = 0; i < drawArr.length; i++) {
        drawArr[i] = (new Array(maxX)).fill('.', 0, maxX)
    }

    for (const [x, y] of dots) {
        drawArr[y][x] = '#'
    }

    return drawArr
        .filter(r => !r.every((char) => char === '.'))
        .map(r => r.join('')).join('\n')
}

function foldPaper(dots, instrs) {
    let copyDots = Array.from(dots)

    for (const [foldY, foldX] of instrs) {
        if (foldY) {
            copyDots = copyDots.map(([x,y]) => {
                if (y > foldY) {
                    return [x, foldY - (y - foldY)]
                } else if (y < foldY) {
                    return [x,y]
                }
            })
        } else {
            copyDots = copyDots.map(([x,y]) => {
                if (x > foldX) {
                    return [foldX + (foldX - x),y]
                } else if (x < foldX) {
                    return [x,y]
                }
            })
        }
        copyDots = copyDots.filter(r => r)
    }
    return copyDots
}

const [dots, instrs] = parseRows(rawInput)
const paper = foldPaper(dots, instrs)
console.log(draw(paper))
// GJZGLUPJ