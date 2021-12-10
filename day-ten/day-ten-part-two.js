const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

const PARENTHESIS = {
    OPEN: '(',
    CLOSE: ')',
}

const SQUARE_BRACKET = {
    OPEN: '[',
    CLOSE: ']',
}

const ANGLE_BRACKET = {
    OPEN: '<',
    CLOSE: '>',
}

const CURLY_BRACKET = {
    OPEN: '{',
    CLOSE: '}',
}

const BRACKETS = [
    PARENTHESIS,
    SQUARE_BRACKET,
    ANGLE_BRACKET,
    CURLY_BRACKET,
]

const LOOKUP = {
    [PARENTHESIS.OPEN]: PARENTHESIS,
    [PARENTHESIS.CLOSE]: PARENTHESIS,
    [SQUARE_BRACKET.OPEN]: SQUARE_BRACKET,
    [SQUARE_BRACKET.CLOSE]: SQUARE_BRACKET,
    [ANGLE_BRACKET.OPEN]: ANGLE_BRACKET,
    [ANGLE_BRACKET.CLOSE]: ANGLE_BRACKET,
    [CURLY_BRACKET.OPEN]: CURLY_BRACKET,
    [CURLY_BRACKET.CLOSE]: CURLY_BRACKET,
}

const POINTS = {
    [PARENTHESIS.CLOSE]: 1,
    [SQUARE_BRACKET.CLOSE]: 2,
    [CURLY_BRACKET.CLOSE]: 3,
    [ANGLE_BRACKET.CLOSE]: 4,
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
        console.log(char)
        if (isOpen(char)) opens.push(char)
        else opens.pop();
    }

    const closes = opens
        .reverse()
        .map(char => LOOKUP[char].CLOSE)
    return closes
}

function parseLines(lines) {
    const incompleteLines = lines
        .filter(l => notCorrupted(l))


    const missingChars = incompleteLines
        .map(l => findMissingChars(l))
    return missingChars;
}

function getPoints(lines) {
    const scores = lines
        .map(line => line.reduce((acc, curr) => (acc * 5) + POINTS[curr],0))
        .sort((a,b) => a - b)

    return scores[Math.floor(scores.length /2)]
}
const parsedInput = parseInput(rawInput)
const incompleteLines = parseLines(parsedInput)
const points = getPoints(incompleteLines)
console.log(points)