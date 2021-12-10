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
    [PARENTHESIS.CLOSE]: 3,
    [SQUARE_BRACKET.CLOSE]: 57,
    [CURLY_BRACKET.CLOSE]: 1197,
    [ANGLE_BRACKET.CLOSE]: 25137,
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

function parseLine(chars) {
    const opens = []

    for (const char of chars) {
        if (isOpen(char)) {
            opens.push(char)
        } else {
            if (match(last(opens), char)) {
                opens.pop();
            } else {
                return char;
            }
        }
    }
}

function parseLines(lines) {
    const errors = lines
        .map(parseLine)
        .filter(e => e != null)

    return errors;
}

function getPoints(errors) {
    return errors
        .reduce((acc, curr) => acc + POINTS[curr],0)
}

const parsedInput = parseInput(rawInput)
const errors = parseLines(parsedInput)
console.log(getPoints(errors))