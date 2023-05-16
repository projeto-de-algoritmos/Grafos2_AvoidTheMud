import React from 'react'
import { Vertex as BoardCell } from '../vertex'
import BoardCellComponent from './boardCell'
import { dijkstra } from '../graph'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FiTarget } from 'react-icons/fi'

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
  const [selectedObstacle, setSelectedObstacle] = React.useState('tree')

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
    <div className="flex flex-col justify-center align-middle">
      <div>
        <h1 className="text-5xl font-semibold md:text-7xl bg-gradient-to-r from-orange-900 via-yellow-900 to-green-800 text-transparent bg-clip-text animate-gradient">
          Avoid the Mud
        </h1>

        <div className="flex justify-between align-middle mt-10 mb-10 px-20 flex-wrap gap-5">
          <div className="flex my-auto">
            <div className="w-5 h-5 mr-2">
              <BsFillArrowRightCircleFill className="text-amber-900 w-full h-full" />
            </div>
            <p className="text-center">Start point</p>
          </div>
          <div className="flex my-auto">
            <div className="w-5 h-5 mr-2">
              <FiTarget className="text-amber-900 w-full h-full" />
            </div>
            <p>Target</p>
          </div>
          <button
            className={`${
              selectedObstacle == 'mud' ? 'bg-sky-300' : 'hover:bg-sky-300'
            } rounded px-5 py-2 border border-sky-300`}
            onClick={() => setSelectedObstacle('mud')}
          >
            <div className="flex">
              <div className="w-5 h-5 mr-2 bg-yellow-900"></div>
              <span>Mud</span>
            </div>
          </button>
          <button
            className={`${
              selectedObstacle == 'tree' ? 'bg-sky-300' : 'hover:bg-sky-300'
            } rounded px-5 py-2 border border-sky-300`}
            onClick={() => setSelectedObstacle('tree')}
          >
            <div className="flex">
              <div className="w-5 h-5 mr-2">
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/dusk/64/deciduous-tree.png"
                  alt="deciduous-tree"
                />
              </div>
              <span>Tree</span>
            </div>
          </button>
          <button
            className="bg-orange-300 hover:bg-orange-400 rounded px-7 py-1"
            onClick={() => startAlgorithm()}
          >
            Start
          </button>
        </div>
      </div>
      <table className="w-full h-3/5">
        <tbody>
          {boardCells.map((row, i) => (
            <tr key={i}>
              {row.map((cell) => (
                <BoardCellComponent
                  key={cell.id}
                  boardCell={cell}
                  updateOneCell={updateOneCell}
                  selectedObstacle={selectedObstacle}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="mt-20 text-slate-500">
        Built during the{' '}
        <a
          className="text-slate-600 hover:text-slate-800"
          href="https://github.com/projeto-de-algoritmos"
        >
          Algorithm Project
        </a>{' '}
        class at University of Brasília |{' '}
        <a
          className="text-slate-600 hover:text-slate-800"
          href="https://github.com/projeto-de-algoritmos/Grafos2_AvoidTheMud"
        >
          Source Code
        </a>
      </footer>
    </div>
  )
}

export default Board
