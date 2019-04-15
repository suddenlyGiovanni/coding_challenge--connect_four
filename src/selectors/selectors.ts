import { Board, Column, Row, Cell, X, Y, Point } from 'MyTypes'
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

export function getDiagonalRight(point: Point): ReadonlyArray<Point> {
  // move diagonally down to the left to the starting point
  const startingPoint: Point = move(point).diagonallyDownLeft() //?
  const upRightIterable = move(startingPoint).upRight() //?

  const rightDiagonalCoordinates = [startingPoint, ...upRightIterable]

  return rightDiagonalCoordinates //?
}

export function getDiagonalLeft(point: Point): ReadonlyArray<Point> {
  // move diagonally down to the right to the starting point
  const startingPoint: Point = move(point).diagonallyDownRight() //?
  const upLeftIterable = move(startingPoint).upLeft() //?
  const leftDiagonalCoordinates = [startingPoint, ...upLeftIterable]
  return leftDiagonalCoordinates //?
}

// function getDiagonalCoordinates(
//   board: Board
// ): (x: X, y: Y, direction: 'upRight' | 'downRight') => any {
//   return (x, y, direction) => {
//     const _getCell = getCell(board)
//     const _getCoordinates = getCoordinates(x, y)
//     const nextDiagonalCoords = _getCoordinates[direction]()
//     if (nextDiagonalCoords) {
//       const [_x, _y] = nextDiagonalCoords
//       const nextDiagonalCell = _getCell(_x, _y)
//       if (nextDiagonalCell) {
//       }
//     }
//   }
// }

// export function getDiagonal(
//   board: Board
// ): (x: X, y: Y) => (direction: 'upRight' | 'downRight') => any {
//   return (x, y) => direction => {}
// }
