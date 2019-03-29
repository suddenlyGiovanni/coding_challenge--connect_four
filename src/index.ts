export enum Player {
  One = 1,
  Two = 2,
}

/**
 * A Cell can be empty or filled by a Player
 */
export type Cell = Readonly<Player>

/**
 * A Column is composed of 5 Cells
 * it can be represented as a tuple of 6 cells
 * or as an array of cells of length 6
 * mind you, index 0 represents the bottom of the column
 * and index 5 the top of it!
 */
export type Column = Readonly<
  | Player[]
  | [Player]
  | [Player, Player]
  | [Player, Player, Player]
  | [Player, Player, Player, Player]
  | [Player, Player, Player, Player, Player]
  | [Player, Player, Player, Player, Player, Player]
>

/**
 * A board is composed of:
 * 7 columns
 * 6 rows
 */
export type Board = Readonly<
  [
    Column, // A
    Column, // B
    Column, // C
    Column, // D
    Column, // E
    Column, // F
    Column // G
  ]
>

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

export function checkColumn(player: Player, column: Column): null | number[] {
  let array = [] //?
  // creates an array of all the player's checker
  for (let index = 0; index < column.length; index++) {
    const cell = column[index]
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

  return contiguousArray.length < 4 ? null : contiguousArray //?
}
