import { Vertex as BoardCell } from '../vertex'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FiTarget } from 'react-icons/fi'

type boardCellProps = {
  boardCell: BoardCell
}

const BoardCellComponent = ({ boardCell }: boardCellProps) => {
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
      : boardCell.color == 'red'
      ? 'bg-red-300'
      : 'bg-green-300'

  return (
    <td
      key={boardCell.id}
      className={`border border-amber-900 w-5 h-5 ${bgColor}`}
      onClick={() => console.log(boardCell)}
    >
      {icon}
    </td>
  )
}

export default BoardCellComponent
