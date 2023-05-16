import { Vertex as BoardCell } from '../vertex'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FiTarget } from 'react-icons/fi'

type boardCellProps = {
  boardCell: BoardCell
  selectedObstacle: string
  updateOneCell: (boardCell: BoardCell) => void
}

const BoardCellComponent = ({
  boardCell,
  selectedObstacle,
  updateOneCell,
}: boardCellProps) => {
  const icon = boardCell.start ? (
    <BsFillArrowRightCircleFill className="text-amber-900" />
  ) : boardCell.end ? (
    <FiTarget className="text-amber-900" />
  ) : (
    ''
  )

  const bgColor =
    boardCell.color == 'yellow'
      ? 'bg-yellow-300'
      : boardCell.color == 'yellow-dark'
      ? 'bg-yellow-700'
      : boardCell.color == 'red'
      ? 'bg-red-300'
      : boardCell.color == 'red-dark'
      ? 'bg-red-950'
      : boardCell.type.name == 'mud'
      ? 'bg-yellow-900'
      : 'bg-green-300'

  function addOrRemoveMud() {
    if (boardCell.type.name != 'mud') {
      boardCell.type = { name: 'mud', value: 3 }
    } else {
      boardCell.type = { name: 'grass', value: 1 }
    }
    updateOneCell(boardCell)
  }

  function addOrRemoveTree() {
    if (boardCell.type.name != 'tree') {
      boardCell.type = { name: 'tree', value: Infinity }
    } else {
      boardCell.type = { name: 'grass', value: 1 }
    }
    updateOneCell(boardCell)
  }

  function handleClick() {
    if (boardCell.start || boardCell.end) return
    if (selectedObstacle == 'tree') {
      addOrRemoveTree()
    } else {
      addOrRemoveMud()
    }
  }

  return (
    <td
      key={boardCell.id}
      className={`border border-amber-900 w-5 h-5 ${bgColor}`}
      onClick={() => handleClick()}
    >
      {boardCell.type.name == 'tree' && (
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/dusk/64/deciduous-tree.png"
          alt="deciduous-tree"
        />
      )}
      {icon}
    </td>
  )
}

export default BoardCellComponent
