import React from 'react'
import { Vertex as BoardCell } from '../vertex'
import BoardCellComponent from './boardCell'
import { dijkstra } from '../graph'

function initBoardCells(width = 60, height = 30) {
  const rows = []
  let id = 0
  for (let i = 0; i < height; i++) {
    const gridCells: BoardCell[] = []
    for (let j = 0; j < width; j++) {
      gridCells.push({
        id: id++,
        position: { x: i, y: j },
        type: {
          name: 'grass',
          value: 1,
        },
        cost: i == 14 && j == 5 ? 0 : Infinity,
        start: i == 14 && j == 5 ? true : false,
        end: i == height - 16 && j == width - 6 ? true : false,
      })
    }
    rows.push(gridCells)
  }
  return rows
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

const Board = () => {
  const [boardCells, setBoardCells] = React.useState(initBoardCells())

  function updateOneCell(boardCell: BoardCell) {
    boardCells[boardCell.position.x][boardCell.position.y] = boardCell
    setBoardCells([...boardCells])
  }

  async function startAlgorithm() {
    const boardCellsClone = structuredClone(boardCells)
    const animationSequence = dijkstra(
      boardCellsClone,
      boardCellsClone[14][5],
      boardCellsClone[14][54]
    )

    for (let i = 0; i < animationSequence.length; i++) {
      await timeout(0).then(() => {
        updateOneCell(animationSequence[i])
      })
    }
  }

  return (
    <div className="flex flex-col justify-center align-middle ">
      <div>
        <h1 className="text-4xl mb-2">Avoid the mud</h1>
        <button
          className="border border-sky-700 rounded mb-5 px- py-1"
          onClick={() => startAlgorithm()}
        >
          Start
        </button>
      </div>
      <table className="w-full h-3/5">
        <tbody>
          {boardCells.map((row, i) => (
            <tr key={i}>
              {row.map((cell) => (
                <BoardCellComponent key={cell.id} boardCell={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Board
