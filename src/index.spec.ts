import {
  makeBoard,
  getColumn,
  getRow,
  getCell,
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
  partiallyFilledColumn,
  [],
  playerOneNullColumn,
  [],
  [],
  [],
  playerOneWinningColumn,
]

const testBoardRow0: Row = [
  partiallyFilledColumn[0], // Player.One
  undefined,
  playerOneNullColumn[0], // Player.One,
  undefined,
  undefined,
  undefined,
  playerOneWinningColumn[0], // Player.One,
]

const testBoardRow1: Row = [
  partiallyFilledColumn[1], // Player.Two
  undefined,
  playerOneNullColumn[1], // Player.Two,
  undefined,
  undefined,
  undefined,
  playerOneWinningColumn[1], // Player.One,
]

describe('makeBoard', () => {
  it('returns an empty board', () => {
    expect(makeBoard()).toEqual(emptyBoard)
  })
})

describe('getColumn', () => {
  it('happy path', () => {
    const getTestBoardColumn = getColumn(testBoard)
    expect(getTestBoardColumn(0)).toEqual(partiallyFilledColumn)
    expect(getTestBoardColumn(1)).toEqual([])
    expect(getTestBoardColumn(2)).toEqual(playerOneNullColumn)
    expect(getTestBoardColumn(6)).toEqual([
      Player.One,
      Player.Two,
      Player.One,
      Player.One,
      Player.One,
      Player.One,
    ])
  })
})

describe('getRow', () => {
  it('happy path', () => {
    const getTestBoardRow = getRow(testBoard)
    expect(getTestBoardRow(0)).toEqual(testBoardRow0)
    expect(getTestBoardRow(1)).toEqual(testBoardRow1)
  })
})

describe('getCell', () => {
  it('happy path', () => {
    const getTestBoardCell = getCell(testBoard)
    expect(getTestBoardCell(0, 0)).toBe(Player.One)
    expect(getTestBoardCell(0, 1)).toBe(Player.Two)
    expect(getTestBoardCell(6, 5)).toBe(Player.One)
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
  it('returns `null` if no match are found for the desired column', () => {
    expect(checkPlayerOne(partiallyFilledColumn)).toBe(null)
  })

  it('returns `null` if no match are found for the desired row', () => {
    expect(checkPlayerOne(testBoardRow0)).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(checkPlayerOne(playerOneNullColumn)).toBe(null)
  })

  it('returns an a 2d tuple containing the coordinates of the winning checkers on the vertical axe', () => {
    expect(checkPlayerOne(playerOneWinningColumn)).toEqual([2, 3, 4, 5])
  })

  it.todo(
    'returns an a 2d tuple containing the coordinates of the winning checkers on the horizontal axe'
  )
})
