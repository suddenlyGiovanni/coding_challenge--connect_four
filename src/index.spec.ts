import { Player } from './index'
import * as Fixture from './fixture'

import {
  makeBoard,
  isColumnFull,
  updateColumn,
  checkHorizontalOrVertical,
} from './index'

describe('makeBoard', () => {
  it('returns an empty board', () => {
    expect(makeBoard()).toEqual(Fixture.emptyBoard)
  })
})

describe('isColumnFull', () => {
  it('happy path', () => {
    expect(isColumnFull(Fixture.emptyColumn)).toBe(false)
  })

  it('returns false if the column is partially filled', () => {
    expect(isColumnFull(Fixture.partiallyFilledColumn)).toBe(false)
  })

  it('returns false if the column is already filled', () => {
    expect(isColumnFull(Fixture.fullColumn)).toBe(true)
  })
})

describe('updateColumn', () => {
  it('will throw if the column is already full', () => {
    expect(() => updateColumn(Player.One, Fixture.fullColumn)).toThrow(
      'This column is already full'
    )
  })

  it('happy path', () => {
    updateColumn(Player.One, Fixture.partiallyFilledColumn)
  })
})

describe('checkColumn', () => {
  const checkPlayerOne = checkHorizontalOrVertical(Player.One)
  const checkPlayerTow = checkHorizontalOrVertical(Player.Two)
  it('returns `null` if no match are found for the desired column', () => {
    expect(checkPlayerOne(Fixture.partiallyFilledColumn)).toBe(null)
  })

  it('returns `null` if no match are found for the desired row', () => {
    expect(checkPlayerOne(Fixture.testBoardRow0)).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(checkPlayerOne(Fixture.testBoardRow0)).toBe(null)
  })

  it('returns the coordinates as an `array of Y` of the winning checkers on the vertical axe', () => {
    expect(checkPlayerOne(Fixture.testBoardColumn2)).toEqual([2, 3, 4, 5])
  })
  it('returns the coordinates as an `array of X` of the winning checkers on the horizontal axe', () => {
    expect(checkPlayerTow(Fixture.testBoardRow1)).toEqual([2, 3, 4, 5])
  })

  it.todo(
    'returns an a 2d tuple containing the coordinates of the winning checkers on the horizontal axe'
  )
})
