import {
  Board,
  Column,
  Row,
  Cell,
  X,
  Y,
  WinningColumn,
  WinningRow,
} from 'MyTypes'

export enum Player {
  One = 1,
  Two = 2,
}

export function makeBoard(): Board {
  return [[], [], [], [], [], [], []]
}

export function getColumn(board: Board): (x: X) => Column {
  return x => board[x]
}

export function getRow(board: Board): (y: Y) => Row {
  return y => board.map(column => column[y])
}

export function getCell(board: Board): (x: X, y: Y) => Cell {
  return (x, y) => board[x][y]
}

export function getCellUpRight(board: Board): (fromX: X, fromY: Y) => Cell {
  return (fromX, fromY) => {
    const toX = fromX + 1
    const toY = fromY + 1
    if (toX > 6 || toY > 5) return undefined
    return getCell(board)(toX as X, toY as Y)
  }
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

export function checkHorizontalOrVertical(
  player: Player
): (rowOrColumn: Row | Column) => null | WinningRow | WinningColumn {
  return rowOrColumn => {
    let array: number[] = [] //?
    // creates an array of all the player's checker
    for (let index = 0; index < rowOrColumn.length; index++) {
      const cell = rowOrColumn[index]
      if (cell === player) {
        array.push(index)
      }
    }

    // early returns if the total number of player checker is lower than the require victory condition
    if (array.length < 4) {
      array //?
      return null
    }
    array //?

    // looks contiguous indexes
    const contiguousArray = array.filter((current, index, array) => {
      const previous: number = array[index - 1] //?
      current //?
      const next: number = array[index + 1] //?
      if (!previous) {
        return current + 1 === next //?
      }
      if (!next) {
        return current - 1 === previous //?
      }
      return current - 1 === previous || current + 1 === next
    }) //?

    return contiguousArray.length < 4 || contiguousArray.length > 4
      ? null
      : ((contiguousArray as unknown) as WinningColumn | WinningRow) //?
  }
}
