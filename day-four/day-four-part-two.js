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
    let boardId = 0;
    for (let i = 5; i <= lines.length; i += 5) {
        boards.push({ id: boardId++, lines: lines.slice(i - 5, i), hits: new Set() })
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
    let wins = [];
    let remainingBoardIds = new Set(bs.map(b => b.id))

    let copyBoard = (board) => ({
        id: board.id,
        lines: board.lines,
        hits: new Set(Array.from(board.hits)),
    })

    numLoop:
    for (const num of nums) {
        for (const board of bs) {
            for (const line of board.lines) {
                if (line.includes(num)) board.hits.add(num)
            }
        }

        for (const board of bs) {
            if (!remainingBoardIds.has(board.id)) continue;

            if (checkVerticalWin(board.lines, board.hits)) {
                wins.push(copyBoard(board))
                if (remainingBoardIds.size > 1) remainingBoardIds.delete(board.id)
                else if (remainingBoardIds.size === 1) break numLoop;
            }
            
            for (const line of board.lines) {
                if (checkHorizontalWin(line, board.hits)) {
                    wins.push(copyBoard(board))
                    if (remainingBoardIds.size > 1) remainingBoardIds.delete(board.id)
                    else if (remainingBoardIds.size === 1) break numLoop;
                }
            }
        }
    }

    const lastBoardId = Array.from(remainingBoardIds)[0];
    let firstWinForLastBoard = wins.find(w => w.id === lastBoardId)
    let unmarkedSpaceScore = firstWinForLastBoard.lines
        .flat()
        .filter((line) => !firstWinForLastBoard.hits.has(line))
        .reduce((score, line) => score + line, 0)
    const hits = Array.from(firstWinForLastBoard.hits);
    const lastHit = hits[hits.length - 1]
    return unmarkedSpaceScore * lastHit;
}

console.log(findWinner(boards, randomNumbers))
// 24742