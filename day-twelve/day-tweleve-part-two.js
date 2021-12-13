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

function visit(vertex, visited, vertices, results, allowMultiSmall) {
    visited.push(vertex)
    for (const adjacentVertex of vertices.get(vertex)) {
        if (adjacentVertex === END) {
            results.push(visited)
        } else if (allowMultiSmall && !isUpperCase(adjacentVertex) && visited.includes(adjacentVertex)) {
            visit(adjacentVertex, visited, vertices, results, false)
        } else if (isUpperCase(adjacentVertex) || !visited.includes(adjacentVertex)) {
            visit(adjacentVertex, Array.from(visited), vertices, results, allowMultiSmall)
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

        if (end !== START) vertices.get(start).push(end)
        if (start !== START) vertices.get(end).push(start)
    }

    let visited = []
    let results = []
    visit(START, visited, vertices, results, true);
    return results
}

const rows = parseRows(rawInput)
console.log(findRoutes(rows).length)