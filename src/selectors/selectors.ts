import {
  Board,
  Column,
  Row,
  Cell,
  Point,
  CellTemp,
  DiagonalValues,
} from 'MyTypes'
import { move } from '../move/move'

type DiagonalDirection = 'left' | 'right'

export function getColumnValues(board: Board): (point: Point) => Column {
  return ([x]) => board[x]
}

export function getRowValues(board: Board): (point: Point) => Row {
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

export function getDiagonal(
  point: Point
): (diagonal: DiagonalDirection) => ReadonlyArray<Point> {
  return diagonal =>
    diagonal === 'left' //? diagonal
      ? getDiagonalLeft(point)
      : getDiagonalRight(point)
}

export function getDiagonalValues(
  board: Board
): (point: Point) => (diagonal: DiagonalDirection) => DiagonalValues {
  return point => diagonal => {
    const diagonalPoints = getDiagonal(point)(diagonal)

    const diagonalBoardCells = diagonalPoints.map(
      (point): CellTemp => ({
        point: point,
        value: getCellValue(board)(point),
      })
    )

    return diagonalBoardCells //?
  }
}
