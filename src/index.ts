import { Board, Column, Row, ConnectFour, Point } from 'MyTypes'

import { getColumn, getRow } from './selectors/selectors'

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

export function checkMainAxis(
  player: Player
): (
  board: Board
) => ({
  axe,
  coords,
}: {
  axe: 'horizontal' | 'vertical'
  coords: Point
}) => null | ConnectFour {
  return board => ({ axe, coords }) => {
    const [x, y] = coords
    const _axe: Row | Column =
      axe === 'horizontal'
        ? getRow(board)(coords) //?
        : getColumn(board)(coords) //?

    let arrayOfIndexes: number[] = [] //?
    // creates an array of all the player's checker
    for (let index = 0; index < _axe.length; index++) {
      const cell = _axe[index]
      if (cell === player) {
        arrayOfIndexes.push(index)
      }
    }
    // early returns if the total number of player checker is lower than the require victory condition
    if (arrayOfIndexes.length < 4) {
      arrayOfIndexes //?
      return null
    }
    arrayOfIndexes //?
    // looks contiguous indexes
    const contiguousArray = arrayOfIndexes.filter((current, index, array) => {
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

    if (contiguousArray.length !== 4) return null

    return axe === 'horizontal'
      ? ((contiguousArray.map(_x => [_x, y]) as unknown) as ConnectFour) //?
      : ((contiguousArray.map(_y => [x, _y]) as unknown) as ConnectFour) //?
  }
}

// export function checkDiagonal(
//   player: Player
// ): (
//   board: Board
// ) => ({
//   direction,
//   coords,
// }: {
//   direction: 'upRight' | 'downRight'
//   coords: Coordinates
// }) => null | ConnectFour {
//   return board => ({ direction, coords }) => {
//     const [x, y] = coords
//     let diagonal: number[]
//   }
// }
