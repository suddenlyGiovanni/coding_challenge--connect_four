import {
  makeBoard,
  getColumn,
  getRow,
  getCell,
  getCellUpRight,
  isColumnFull,
  updateColumn,
  checkHorizontalOrVertical,
  Column,
  Row,
  Player,
  Board,
} from './index'

const emptyColumn: Column = []

const partiallyFilledColumn: Column = [
  Player.One, // 0
  Player.Two, // 1
  Player.One, // 2
  Player.Two, // 3
  Player.Two, // 4
]

const fullColumn: Column = [
  Player.One, // 0
  Player.One, // 1
  Player.Two, // 2
  Player.Two, // 3
  Player.One, // 4
  Player.Two, // 5
]

const playerOneWinningColumn: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.One,
  Player.One,
  Player.One,
]

const playerOneNullColumn: Column = [
  Player.One, // 0
  Player.Two,
  Player.One, // 2
  Player.Two,
  Player.One, // 4
  Player.One, // 5
]

const emptyBoard: Board = [[], [], [], [], [], [], []]

const testBoard: Board = [
  [Player.One, Player.Two, Player.One, Player.Two],
  [Player.One, Player.One, Player.Two],
  [Player.One, Player.Two, Player.One, Player.One, Player.One, Player.One],
  [Player.Two, Player.Two, Player.One, Player.One],
  [Player.One, Player.Two, Player.Two],
  [Player.Two, Player.Two],
  [Player.One],
]

const testBoardColumn0: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.Two,
]

/**
 * testBoard column 2
 * Player One connect four vertical:
 * [[2, 2], [2, 3], [2, 4], [2, 5]]
 */
const testBoardColumn2: Column = [
  Player.One,
  Player.Two,
  Player.One,
  Player.One,
  Player.One,
  Player.One,
]

const testBoardRow0: Row = [
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
const testBoardRow1: Row = [
  Player.Two,
  Player.One,
  Player.Two,
  Player.Two,
  Player.Two,
  Player.Two,
  undefined,
]

/**
 * testBoard diagonal upward to the right, starting form (x=0, y=0)
 * Player One connect four diagonal up-right:
 * [[0, 0], [1, 1], [2, 2], [3, 3]]
 */
const testBoardDiagonalUpRight0 = [
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
const testBoardDiagonalDownRight0 = [
  Player.Two,
  Player.Two,
  Player.Two,
  Player.Two,
]

describe('makeBoard', () => {
  it('returns an empty board', () => {
    expect(makeBoard()).toEqual(emptyBoard)
  })
})

describe('getColumn', () => {
  it('happy path', () => {
    const getTestBoardColumn = getColumn(testBoard)
    expect(getTestBoardColumn(0)).toEqual(testBoardColumn0)
    expect(getTestBoardColumn(2)).toEqual(testBoardColumn2)
    expect(getTestBoardColumn(6)).toEqual([Player.One])
  })
})

describe('getRow', () => {
  it('happy path', () => {
    const getTestBoardRow = getRow(testBoard)
    expect(getTestBoardRow(1)).toEqual(testBoardRow1)
  })
})

describe('getCell', () => {
  it('happy path', () => {
    const getTestBoardCell = getCell(testBoard)
    expect(getTestBoardCell(0, 0)).toBe(Player.One)
    expect(getTestBoardCell(0, 1)).toBe(Player.Two)
    expect(getTestBoardCell(6, 1)).toBe(undefined)
  })
})

describe('getCellUpRight', () => {
  const getTestBoardCellUpRight = getCellUpRight(testBoard)
  it("returns its neighbor's Cell located one spot up to the right", () => {
    expect(getTestBoardCellUpRight(0, 0)).toEqual(Player.One)
  })

  it('returns undefined if either `fromX` or `fromY` are out of bounds', () => {
    expect(getTestBoardCellUpRight(1, 5)).toBe(undefined)
    expect(getTestBoardCellUpRight(6, 1)).toBe(undefined)
  })
})

describe('isColumnFull', () => {
  it('happy path', () => {
    expect(isColumnFull(emptyColumn)).toBe(false)
  })

  it('returns false if the column is partially filled', () => {
    expect(isColumnFull(partiallyFilledColumn)).toBe(false)
  })

  it('returns false if the column is already filled', () => {
    expect(isColumnFull(fullColumn)).toBe(true)
  })
})

describe('updateColumn', () => {
  it('will throw if the column is already full', () => {
    expect(() => updateColumn(Player.One, fullColumn)).toThrow(
      'This column is already full'
    )
  })

  it('happy path', () => {
    updateColumn(Player.One, partiallyFilledColumn)
  })
})

describe('checkColumn', () => {
  const checkPlayerOne = checkHorizontalOrVertical(Player.One)
  const checkPlayerTow = checkHorizontalOrVertical(Player.Two)
  it('returns `null` if no match are found for the desired column', () => {
    expect(checkPlayerOne(partiallyFilledColumn)).toBe(null)
  })

  it('returns `null` if no match are found for the desired row', () => {
    expect(checkPlayerOne(testBoardRow0)).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(checkPlayerOne(testBoardRow0)).toBe(null)
  })

  it('returns the coordinates as an `array of Y` of the winning checkers on the vertical axe', () => {
    expect(checkPlayerOne(testBoardColumn2)).toEqual([2, 3, 4, 5])
  })
  it('returns the coordinates as an `array of X` of the winning checkers on the horizontal axe', () => {
    expect(checkPlayerTow(testBoardRow1)).toEqual([2, 3, 4, 5])
  })

  it.todo(
    'returns an a 2d tuple containing the coordinates of the winning checkers on the horizontal axe'
  )
})
