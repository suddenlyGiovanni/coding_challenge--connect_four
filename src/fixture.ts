import { Board, Column, Row, ColumnValues, RowValues } from 'MyTypes'
import { Player } from './index'

export const emptyColumn: Column = []

export const partiallyFilledColumn: Column = [
  Player.One, // 0
  Player.Two, // 1
  Player.One, // 2
  Player.Two, // 3
  Player.Two, // 4
]

export const fullColumn: Column = [
  Player.One, // 0
  Player.One, // 1
  Player.Two, // 2
  Player.Two, // 3
  Player.One, // 4
  Player.Two, // 5
]

export const playerOneWinningColumn: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.One,
  Player.One,
  Player.One,
]

export const playerOneNullColumn: Column = [
  Player.One, // 0
  Player.Two,
  Player.One, // 2
  Player.Two,
  Player.One, // 4
  Player.One, // 5
]

export const emptyBoard: Board = [[], [], [], [], [], [], []]

export const testBoard: Board = [
  [Player.One, Player.Two, Player.One, Player.Two],
  [Player.One, Player.One, Player.Two],
  [Player.One, Player.Two, Player.One, Player.One, Player.One, Player.One],
  [Player.Two, Player.Two, Player.One, Player.One, Player.Two, Player.Two],
  [Player.One, Player.Two, Player.Two, Player.One],
  [Player.Two, Player.Two, Player.One],
  [Player.One],
]

export const testBoardColumn0: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.Two,
]

export const testBoardColumn0Values: ColumnValues = [
  { point: [0, 0], value: Player.One },
  { point: [0, 1], value: Player.Two },
  { point: [0, 2], value: Player.One },
  { point: [0, 3], value: Player.Two },
]

/**
 * testBoard column 2
 * Player One connect four vertical:
 * [[2, 2], [2, 3], [2, 4], [2, 5]]
 */
export const testBoardColumn2: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.One,
  Player.One,
  Player.One,
]

export const testBoardColumn2Values: ColumnValues = [
  { point: [2, 0], value: Player.One },
  { point: [2, 1], value: Player.Two },
  { point: [2, 2], value: Player.One },
  { point: [2, 3], value: Player.One },
  { point: [2, 4], value: Player.One },
  { point: [2, 5], value: Player.One },
]

export const testBoardRow0: Row = [
  Player.One,
  Player.One,
  Player.One,
  Player.Two,
  Player.One,
  Player.Two,
  Player.One,
]

/**
 * testBoard row 1
 * Player Tow connect four horizontal:
 * [[2, 1], [3, 1], [4, 1], [5, 1]]
 */
export const testBoardRow1: Row = [
  Player.Two,
  Player.One,
  Player.Two,
  Player.Two,
  Player.Two,
  Player.Two,
  undefined,
]

export const testBoardRow1Values: RowValues = [
  { point: [0, 1], value: Player.Two },
  { point: [1, 1], value: Player.One },
  { point: [2, 1], value: Player.Two },
  { point: [3, 1], value: Player.Two },
  { point: [4, 1], value: Player.Two },
  { point: [5, 1], value: Player.Two },
  { point: [6, 1], value: undefined },
]
/**
 * testBoard diagonal upward to the right, starting form (x=0, y=0)
 * Player One connect four diagonal up-right:
 * [[0, 0], [1, 1], [2, 2], [3, 3]]
 */
export const testBoardDiagonalUpRight0 = [
  Player.One,
  Player.One,
  Player.One,
  Player.One,
]
/**
 * testBoard diagonal down to the right, starting from (x=0, y=3)
 * Player Two connect four diagonal down-right:
 * [[0, 3], [1, 2], [2, 1], [3, 0]]
 */
export const testBoardDiagonalDownRight0 = [
  Player.Two,
  Player.Two,
  Player.Two,
  Player.Two,
]
