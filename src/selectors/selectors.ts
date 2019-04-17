import {
  Board,
  Point,
  CellValue,
  DiagonalValues,
  ColumnValues,
  RowValues,
  Player,
  Y,
  X,
} from 'MyTypes'
import { move } from '../move/move'

type DiagonalDirection = 'left' | 'right'

export function getPoint(cellValue: CellValue | undefined): void | Point {
  return cellValue && cellValue.point
}

export function getPlayer(cellValue: CellValue | undefined): void | Player {
  return cellValue && cellValue.value
}

export function getY(cellValue: CellValue | undefined): void | Y {
  const point = getPoint(cellValue)
  if (!point) return undefined
  const [, y] = point
  return y
}

export function getX(cellValue: CellValue | undefined): void | X {
  const point = getPoint(cellValue)
  if (!point) return undefined
  const [x] = point
  return x
}

export function getColumnValues(
  board: Board
): (startingPoint: Point) => ColumnValues {
  return startingPoint => {
    const [x] = startingPoint
    const values = board[x]
    return values.map((value, y) => ({ point: [x, y] as Point, value }))
  }
}

export function getRowValues(board: Board): (point: Point) => RowValues {
  return point => {
    const [, y] = point
    const values = board.map(column => column[y])
    return values.map((value, x) => ({ point: [x, y] as Point, value }))
  }
}

export function getCellValue(board: Board): (point: Point) => CellValue {
  return point => {
    const [x, y] = point
    const value = board[x][y]
    return { point, value }
  }
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
      (point): CellValue => getCellValue(board)(point)
    )

    return diagonalBoardCells //?
  }
}
