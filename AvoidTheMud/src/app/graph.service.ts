import { Injectable } from '@angular/core';

interface Vertex {
  id: number
  position: {x: number, y: number} 
  type: {
    name: string  
    value: number
  }
  
  cost: number
  parent?: Vertex
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

    source.cost = 0

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

      if(!vertex || vertex.cost == Infinity)
        return [] 

      unvisited.delete(vertex.id)

      // update neighbors cost
      let x = vertex.position.x
      let y = vertex.position.y

      if(x + 1 < vertexes.length && vertexes[x+1][y].cost > vertex.cost + vertexes[x+1][y].type.value) {
        vertexes[x+1][y].cost = 1;
        vertexes[x+1][y].parent = vertex;
      }
      if(x - 1 > 0 && vertexes[x-1][y].cost > vertex.cost + vertexes[x-1][y].type.value) {
        vertexes[x-1][y].cost = 1;
        vertexes[x-1][y].parent = vertex;
      }

      if(y + 1 < vertexes[0].length && vertexes[x][y+1].cost > vertex.cost + vertexes[x][y+1].type.value) {
        vertexes[x][y+1].cost = 1;
        vertexes[x][y+1].parent = vertex;
      }
      if(y - 1 > 0 && vertexes[x][y-1].cost > vertex.cost + vertexes[x][y-1].type.value) {
        vertexes[x][y-1].cost = 1;
        vertexes[x][y-1].parent = vertex;
      }
    }

    // Build path
    const path = []
    let current: Vertex|undefined = end;
    while(current) {
      console.log(current)
      path.push(current)
      current = current.parent
    }

    return path.reverse()
  }

  testDijkstraMethod() {
    // 3x3 grid
    const sampleData = [
      [
        {id: 0, position: {x: 0, y: 0}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 1, position: {x: 0, y: 1}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 2, position: {x: 0, y: 2}, type: { name: 'grass', value: 1 }, cost: Infinity},
      ],
      [
        {id: 3, position: {x: 1, y: 0}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 4, position: {x: 1, y: 1}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 5, position: {x: 1, y: 2}, type: { name: 'grass', value: 1 }, cost: Infinity},
      ],
      [
        {id: 6, position: {x: 2, y: 0}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 7, position: {x: 2, y: 1}, type: { name: 'grass', value: 1 }, cost: Infinity},
        {id: 8, position: {x: 2, y: 2}, type: { name: 'grass', value: 1 }, cost: Infinity},
      ]
    ]

    // Start  
    const path = this.dijkstra(sampleData, sampleData[0][0], sampleData[2][2])

    console.log('Path:')
    path.forEach((v) => {
      console.log(v.position)
    })
  }
}
