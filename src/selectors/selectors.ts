import { Board, Column, Row, Cell, X, Y } from 'MyTypes'

export function getColumn(board: Board): (x: X) => Column {
  return x => board[x]
}

export function getRow(board: Board): (y: Y) => Row {
  return y => board.map(column => column[y])
}

export function getCell(board: Board): (x: X, y: Y) => Cell {
  return (x, y) => board[x][y]
}
