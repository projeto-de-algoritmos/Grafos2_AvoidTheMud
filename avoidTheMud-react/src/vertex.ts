export interface Vertex {
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
