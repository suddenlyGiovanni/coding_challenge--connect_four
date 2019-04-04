declare module 'MyTypes' {
  export type X = 0 | 1 | 2 | 3 | 4 | 5 | 6

  export type Y = 0 | 1 | 2 | 3 | 4 | 5

  export type Coordinates = Readonly<[X, Y]>

  export type ConnectFour = Readonly<[[X, Y], [X, Y], [X, Y], [X, Y]]>

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
}
