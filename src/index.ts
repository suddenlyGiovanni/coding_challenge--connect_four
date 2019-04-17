import { Board, Column } from 'MyTypes'

export enum Player {
  One = 1,
  Two = 2,
}

export function makeBoard(): Board {
  return [[], [], [], [], [], [], []]
}

export function isColumnFull(column: Column): boolean {
  return column.length >= 6
}
