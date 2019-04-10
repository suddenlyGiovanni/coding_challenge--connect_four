import { Board, Column, Row, Cell, X, Y, Coordinates } from 'MyTypes'
import { move } from '../move/move'

export function getColumn(board: Board): (x: X) => Column {
  return x => board[x]
}

export function getRow(board: Board): (y: Y) => Row {
  return y => board.map(column => column[y])
}

export function getCell(board: Board): (x: X, y: Y) => Cell {
  return (x, y) => board[x][y]
}

export function getRightDiagonal(
  coordinates: Coordinates
): ReadonlyArray<Coordinates> {
  // move diagonally down to the left to the starting point
  const startingPoint: Coordinates = move(coordinates).diagonallyDownLeft() //?
  const upRightIterable = move(startingPoint).upRight() //?

  let rightDiagonalCoordinates = [startingPoint]
  for (const iterator of upRightIterable) {
    iterator //?
    if (iterator !== undefined) {
      rightDiagonalCoordinates.push(iterator) //?
    }
  }
  return rightDiagonalCoordinates //?
}
