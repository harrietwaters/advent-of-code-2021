const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

const randomNumbers = rawInput.split('\n')[0].split(',').map(str => +str)

function parseRawBoards(rb) {
    const lines = rb
        .slice(2)
        .filter(line => line !== '')
        .map(line =>
            line
                .trim()
                .split(/\s/)
                .filter(str => str !== '')
                .map(str => +str)
        )
    let boards = []
    for (let i = 5; i <= lines.length; i += 5) {
        boards.push({ lines: lines.slice(i - 5, i), hits: new Set() })
    }
    return boards;
}

const rawBoards = rawInput.split('\n')
const boards = parseRawBoards(rawBoards)

function checkHorizontalWin(line, hits) {
    return line.every(num => hits.has(num)) && line
}

function checkVerticalWin(lines, hits) {
    for (let i = 0; i < lines[0].length; i++) {
        const rotatedLine = []
        for(const line of lines) rotatedLine.push(line[i])
        if (checkHorizontalWin(rotatedLine, hits)) return rotatedLine;
    }
}

function findWinner(bs, nums) {
    let win;
    numLoop:
    for (const num of nums) {
        for (const board of bs) {
            for (const line of board.lines) {
                if (line.includes(num)) board.hits.add(num)
            }
        }

        for (const board of bs) {
            if (checkVerticalWin(board.lines, board.hits)) {
                win = board
                break numLoop;
            }
            
            for (const line of board.lines) {
                if (checkHorizontalWin(line, board.hits)) {
                    win = board
                    break numLoop;
                }
            }
        }
    }

    if (win) {
        let unmarkedSpaceScore = win.lines
            .flat()
            .filter((line) => !win.hits.has(line))
            .reduce((score, line) => score + line, 0)
        const hits = Array.from(win.hits.values());
        const lastHit = hits[hits.length - 1]
        return unmarkedSpaceScore * lastHit;
    }
}

console.log(findWinner(boards, randomNumbers))
// 10374