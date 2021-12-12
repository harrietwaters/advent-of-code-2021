const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parseRows(input) {
    return input
        .split('\n')
        .map(row => row.split('-'));
}

const START = 'start'
const END = 'end'

function isUpperCase(char) {
    return char.toUpperCase() === char
}

function *visit(v, visited, vertices) {
    visited.push(v)
    if (v === END) {
        yield Array.from(visited)
    } else {
        for (const vertex of vertices.get(v)) {
            if (!visited.includes(vertex) || isUpperCase(vertex)) {
                yield *visit(vertex, Array.from(visited), vertices)
            }
        }
    }
}

function findRoutes(routes) {
    const vertices = new Map()
    for (const [start, end] of routes) {
        if (!vertices.has(start)) {
            vertices.set(start, [])
        }
        if (!vertices.has(end)) {
            vertices.set(end, [])
        }

        vertices.get(start).push(end)
        vertices.get(end).push(start)
    }

    let visited = []
    return Array.from(visit(START, visited, vertices))
}

const rows = parseRows(rawInput)
const toTable = (rs) => rs.map(row => row.join(', ')).join('\n')
console.log(findRoutes(rows).length)