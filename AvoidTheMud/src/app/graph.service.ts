import { Injectable } from '@angular/core';

interface Vertex {
  id: number
  position: {x: number, y: number} 
  type: {
    name: string  
    value: number
  }
  cost: number
  start: boolean
  end: boolean
  parent?: Vertex
  color?: string
}

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  dijkstra(vertexes: Vertex[][], source: Vertex, end: Vertex) {
    const unvisited = new Set<number>(vertexes.map((array) => {
      return array.map((v) => {
        return v.id
      })
    }).flat())

    const animationSequence: Vertex[] = []

    source.cost = 0
    source.color = 'red'
    animationSequence.push(structuredClone(source))

    while(unvisited.size > 0) {
      // Check for the vertex with lower cost
      let vertex: Vertex|undefined; 
      vertexes.forEach((array) => {
        array.forEach((v) => {
          if(unvisited.has(v.id) && (!vertex || vertex.cost > v.cost)) {
            vertex = v;
          }
        })
      })

      if(!vertex || vertex.cost == Infinity || !unvisited.has(end.id))
        break;

      unvisited.delete(vertex.id)
      vertex.color = 'red'
      animationSequence.push(structuredClone(vertex))

      // update neighbors cost
      const x = vertex.position.x
      const y = vertex.position.y

      if(x + 1 < vertexes.length && vertexes[x+1][y].cost > vertex.cost + vertexes[x+1][y].type.value) {
        vertexes[x+1][y].cost = vertex.cost + vertexes[x+1][y].type.value;
        vertexes[x+1][y].parent = vertex;
      }
      if(x - 1 >= 0 && vertexes[x-1][y].cost > vertex.cost + vertexes[x-1][y].type.value) {
        vertexes[x-1][y].cost = vertex.cost + vertexes[x-1][y].type.value;
        vertexes[x-1][y].parent = vertex;
      }

      if(y + 1 < vertexes[0].length && vertexes[x][y+1].cost > vertex.cost + vertexes[x][y+1].type.value) {
        vertexes[x][y+1].cost = vertex.cost + vertexes[x][y+1].type.value;
        vertexes[x][y+1].parent = vertex;
      }
      if(y - 1 >= 0 && vertexes[x][y-1].cost > vertex.cost + vertexes[x][y-1].type.value) {
        vertexes[x][y-1].cost = vertex.cost + vertexes[x][y-1].type.value;
        vertexes[x][y-1].parent = vertex;
      }
    }

    // Build path
    const path = []
    let current: Vertex|undefined = end;
    while(current) {
      path.push(current)
      current = current.parent
    }
    path.reverse().forEach((v) => {
      v.color = 'yellow'
      animationSequence.push(v)
    })

    return animationSequence 
  }
}