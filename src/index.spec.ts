import {
  makeBoard,
  getCell,
  isColumnFull,
  updateColumn,
  checkColumn,
  Column,
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

describe('makeBoard', () => {
  it('returns an empty board', () => {
    expect(makeBoard()).toEqual([[], [], [], [], [], [], []])
  })
})

describe('getCell', () => {
  const board: Board = [
    partiallyFilledColumn,
    [],
    playerOneNullColumn,
    [],
    [],
    [],
    playerOneWinningColumn,
  ]
  it('happy path', () => {
    const _board = getCell(board)
    expect(_board(0, 0)).toBe(Player.One)
    expect(_board(0, 1)).toBe(Player.Two)
    expect(_board(6, 5)).toBe(Player.One)
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
  it('returns `null` if no match are found', () => {
    expect(checkColumn(Player.One, partiallyFilledColumn)).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(checkColumn(Player.One, playerOneNullColumn)).toBe(null)
  })

  it('returns an `Array` containing the indexes of the winning checkers', () => {
    expect(checkColumn(Player.One, playerOneWinningColumn)).toEqual([
      2,
      3,
      4,
      5,
    ])
  })
})
