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

export function getDiagonalRight(
  coordinates: Coordinates
): ReadonlyArray<Coordinates> {
  // move diagonally down to the left to the starting point
  const startingPoint: Coordinates = move(coordinates).diagonallyDownLeft() //?
  const upRightIterable = move(startingPoint).upRight() //?

  const rightDiagonalCoordinates = [startingPoint]
  for (const iterator of upRightIterable) {
    iterator && rightDiagonalCoordinates.push(iterator) //?
  }
  return rightDiagonalCoordinates //?
}

export function getDiagonalLeft(
  coordinates: Coordinates
): ReadonlyArray<Coordinates> {
  // move diagonally down to the right to the starting point
  const startingPoint: Coordinates = move(coordinates).diagonallyDownRight() //?
  const upLeftIterable = move(startingPoint).upLeft() //?
  const leftDiagonalCoordinates = [startingPoint]
  for (const iterator of upLeftIterable) {
    iterator && leftDiagonalCoordinates.push(iterator) //?
  }
  return leftDiagonalCoordinates //?
}
