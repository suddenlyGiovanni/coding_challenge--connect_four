import { Player, Board, Point, Column } from 'MyTypes'
import * as R from 'ramda'
import { isColumnFull } from '../index'

export function updateColumn({
  player,
  board,
  point,
}: {
  player: Player
  board: Board
  point: Point
}): Board {
  const [x] = point
  const column: Column = board[x]
  if (isColumnFull(column)) throw new Error('This column is already full')
  // [...] walk the array and add a player checker at the correct spot in the arr.
  // 1 - reverse the array
  const updatedColumn: Column = [...column, player]
  return (R.update(x, updatedColumn, board) as unknown) as Board
}
