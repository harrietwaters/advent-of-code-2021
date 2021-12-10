const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

const PARENTHESIS = {
    OPEN: '(',
    CLOSE: ')',
}

const SQUARE = {
    OPEN: '[',
    CLOSE: ']',
}

const ANGLE = {
    OPEN: '<',
    CLOSE: '>',
}

const CURLY = {
    OPEN: '{',
    CLOSE: '}',
}

const LOOKUP = {
    [PARENTHESIS.OPEN]: PARENTHESIS,
    [PARENTHESIS.CLOSE]: PARENTHESIS,
    [SQUARE.OPEN]: SQUARE,
    [SQUARE.CLOSE]: SQUARE,
    [ANGLE.OPEN]: ANGLE,
    [ANGLE.CLOSE]: ANGLE,
    [CURLY.OPEN]: CURLY,
    [CURLY.CLOSE]: CURLY,
}

const POINTS = {
    [PARENTHESIS.CLOSE]: 1,
    [SQUARE.CLOSE]: 2,
    [CURLY.CLOSE]: 3,
    [ANGLE.CLOSE]: 4,
}

function parseInput(input) {
    return input
        .split('\n')
        .map(line => line.replace(/\s+/, '').split(''))
}

function last(chars) {
    return chars[chars.length - 1]
}

function isOpen(char) {
    return char && LOOKUP[char].OPEN === char
}

function isClose(char) {
    return char && LOOKUP[char].CLOSE === char
}

function match(open, close) {
    return open && close &&
        isOpen(open) && isClose(close) &&
        LOOKUP[open].OPEN === LOOKUP[close].OPEN
}

function notCorrupted(chars) {
    const opens = []
    for (const char of chars) {
        if (isOpen(char)) {
            opens.push(char)
        } else {
            if (match(last(opens), char)) {
                opens.pop();
            } else {
                return false;
            }
        }
    }
    return true
}

function findMissingChars(chars) {
    const opens = []
    for (const char of chars) {
        if (isOpen(char)) opens.push(char)
        else opens.pop();
    }

    const flip = char => LOOKUP[char].CLOSE
    return opens.reverse().map(flip)
}

function parseLines(lines) {
    const incompleteLines = lines.filter(notCorrupted)
    const fixedLines = incompleteLines.map(findMissingChars)
    return fixedLines;
}

function getPoints(lines) {
    const calcLineScore = line => line.reduce((acc, curr) => (acc * 5) + POINTS[curr],0)
    const scores = lines.map(calcLineScore).sort((a,b) => a - b)
    return scores[Math.floor(scores.length /2)]
}

const parsedInput = parseInput(rawInput)
const fixedLines = parseLines(parsedInput)
const points = getPoints(fixedLines)
console.log(points)