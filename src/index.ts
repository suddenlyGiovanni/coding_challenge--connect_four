export enum Player {
  One = 1,
  Two = 2,
}

/**
 * A Cell can be empty or filled by a Checker.
 * The Checker can have to belong to one of the two Players`
 */
export type Cell = Readonly<Player> | void

/**
 * A Column is composed of 6 Cells
 * it can be represented as a tuple of 6 cells
 * or as an array of cells of length 6
 * mind you, index 0 represents the bottom of the column
 * and index 5 the top of it!
 */
export type Column = Readonly<
  | Cell[]
  | [Cell]
  | [Cell, Cell]
  | [Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell, Cell, Cell]
>

export type winningColumn = Readonly<[Player, Player, Player, Player]>
/**
 * A Row is composed of 7 Cells
 * it can be represented as a tuple of 7 Cells
 * keep in mind that that index 0 will refer to the most left cell
 * and the index 6 will refer the most right cell
 */
export type Row = Readonly<
  | Cell[]
  | [Cell]
  | [Cell, Cell]
  | [Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell, Cell, Cell]
  | [Cell, Cell, Cell, Cell, Cell, Cell, Cell]
>

export type winningRow = Readonly<[Player, Player, Player, Player]>

/*
  Board is a grid of 7*6 and can be represented as `two dimensional array`
  ex: const board = [[Player.One], [..], [..], [..], [..], [..], [..] ]
  to access the first column bottom cell you would need to...
  const firstColBottomCell = board[0][0]
  (Y)
  5 | (x=0, y=5) | (x=1, y=5) | (x=2, y=5)  | (x=3, y=5)  | (x=4, y=5)  | (x=5, y=5)  | (x=6, y=5) |
  4 | (x=0, y=4) | (x=1, y=4) | (x=2, y=4)  | (x=3, y=4)  | (x=4, y=4)  | (x=5, y=4)  | (x=6, y=4) |
  3 | (x=0, y=3) | (x=1, y=3) | (x=2, y=3)  | (x=3, y=3)  | (x=4, y=3)  | (x=5, y=3)  | (x=6, y=3) |
  2 | (x=0, y=2) | (x=1, y=2) | (x=2, y=2)  | (x=3, y=2)  | (x=4, y=2)  | (x=5, y=2)  | (x=6, y=2) |
  1 | (x=0, y=1) | (x=1, y=1) | (x=2, y=1)  | (x=3, y=1)  | (x=4, y=1)  | (x=5, y=1)  | (x=6, y=1) |
  0 | (x=0, y=0) | (x=1, y=0) | (x=2, y=0)  | (x=3, y=0)  | (x=4, y=0)  | (x=5, y=0)  | (x=6, y=0) |
    | 0          | 1          | 2           | 3           | 4           | 5           | 6          |
*/
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

type X = 0 | 1 | 2 | 3 | 4 | 5 | 6
type Y = 0 | 1 | 2 | 3 | 4 | 5

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

// TODO: add typings to return of the factory fn
// TODO: add test coverage
export function currentCoordinates(x: Y, y: Y): any {
  return {
    up(): void | [X, Y] {
      if (y >= 5) return undefined
      const toY: Y = (y + 1) as Y
      return [x, toY]
    },

    down(): void | [X, Y] {
      if (y >= 0) return undefined
      const toY: Y = (y - 1) as Y
      return [x, toY]
    },

    left(): void | [X, Y] {
      if (x <= 0) return undefined
      const toX: X = (x - 1) as X
      return [toX, y]
    },

    right(): void | [X, Y] {
      if (x >= 6) return undefined
      const toX: X = (x + 1) as X
      return [toX, y]
    },

    upRight(): void | [X, Y] {
      if (x >= 6 || y >= 5) return
      const toX: X = (x + 1) as X
      const toY: Y = (y + 1) as Y
      return [toX, toY]
    },

    upLeft(): void | [X, Y] {
      if (x <= 0 || y >= 5) return
      const toX: X = (x - 1) as X
      const toY: Y = (y + 1) as Y
      return [toX, toY]
    },

    downRight(): void | [X, Y] {
      if (x >= 6 || y <= 0) return undefined
      const toX: X = (x + 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },

    downLeft(): void | [X, Y] {
      if (x <= 0 || y <= 0) return undefined
      const toX: X = (x - 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },
  }
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
): (rowOrColumn: Row | Column) => null | winningRow | winningColumn {
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
      : ((contiguousArray as unknown) as winningColumn | winningRow) //?
  }
}
