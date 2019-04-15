import { Board, Column, Row, Cell, Point } from 'MyTypes'
import { move } from '../move/move'

export function getColumn(board: Board): (point: Point) => Column {
  return ([x]) => board[x]
}

export function getRow(board: Board): (point: Point) => Row {
  return ([, y]) => board.map(column => column[y])
}

export function getCellValue(board: Board): (point: Point) => Cell {
  return ([x, y]) => board[x][y]
}

export function getDiagonalRight(point: Point): ReadonlyArray<Point> {
  // move diagonally down to the left to the starting point
  const startingPoint: Point = move(point).diagonallyDownLeft()
  const upRightIterable = move(startingPoint).upRight()

  const rightDiagonalCoordinates = [startingPoint, ...upRightIterable]

  return rightDiagonalCoordinates
}

export function getDiagonalLeft(point: Point): ReadonlyArray<Point> {
  // move diagonally down to the right to the starting point
  const startingPoint: Point = move(point).diagonallyDownRight()
  const upLeftIterable = move(startingPoint).upLeft()
  const leftDiagonalCoordinates = [startingPoint, ...upLeftIterable]
  return leftDiagonalCoordinates
}

// export function getDiagonal(board: Board) {}
