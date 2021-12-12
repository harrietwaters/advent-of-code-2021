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

function* visit(vertex, visited, vertices, allowMultiSmall) {
    visited.push(vertex)
    if (vertex === END) {
        yield Array.from(visited)
    } else {
        for (const adjacentVertex of vertices.get(vertex)) {
            if (adjacentVertex === START) continue;
            if (allowMultiSmall && visited.includes(adjacentVertex) && !isUpperCase(adjacentVertex)) {
                yield* visit(adjacentVertex, Array.from(visited), vertices, false)
            }
            else if (!visited.includes(adjacentVertex) || isUpperCase(adjacentVertex)) {
                yield* visit(adjacentVertex, Array.from(visited), vertices, allowMultiSmall)
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
    return Array.from(visit(START, visited, vertices, true));
}

const rows = parseRows(rawInput)
console.log(findRoutes(rows).length)