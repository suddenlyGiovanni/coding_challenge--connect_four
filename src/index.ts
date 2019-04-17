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

export function updateColumn(player: Player, column: Column): Column {
  if (isColumnFull(column)) {
    throw new Error('This column is already full')
  }
  // [...] walk the array and add a player checker at the correct spot in the arr.
  // 1 - reverse the array
  const _column = column.slice()
  _column.push(player)
  return _column //?
}
