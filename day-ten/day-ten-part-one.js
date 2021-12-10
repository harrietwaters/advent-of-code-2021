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
    [PARENTHESIS.CLOSE]: 3,
    [SQUARE.CLOSE]: 57,
    [CURLY.CLOSE]: 1197,
    [ANGLE.CLOSE]: 25137,
}

function parseInput(input) {
    return input .split('\n').map(line => line.replace(/\s+/, '').split(''))
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

function findCorruptedChar(chars) {
    const opens = []
    for (const char of chars) {
        if (isOpen(char)) {
            opens.push(char)
        } else if (isClose(char)) {
            if (match(last(opens), char)) {
                opens.pop();
            } else {
                return char;
            }
        }
    }
}

function parseLines(lines) {
    const errors = lines.map(findCorruptedChar).filter(e => e != null)
    return errors;
}

function getPoints(errors) {
    const calcLineScore = (acc, curr) => acc + POINTS[curr];
    const score = errors.reduce(calcLineScore, 0);
    return score;
}

const parsedInput = parseInput(rawInput)
const errors = parseLines(parsedInput)
console.log(getPoints(errors))