import { Player } from './index'
import * as Fixture from './fixture'

import { makeBoard, isColumnFull, updateColumn, checkMainAxis } from './index'

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

describe('checkMainAxis', () => {
  const checkPlayerOne = checkMainAxis(Player.One)
  const checkPlayerTwo = checkMainAxis(Player.Two)
  const checkPlayerOneTestBoard = checkPlayerOne(Fixture.testBoard)
  const checkPlayerTwoTestBoard = checkPlayerTwo(Fixture.testBoard)

  it('returns `null` if no match are found for the desired column', () => {
    expect(
      checkPlayerOneTestBoard({
        axe: 'vertical',
        coords: [0, 0], // old partially filled column, now testBoard column 0
      })
    ).toBe(null)
  })

  it('returns `null` if no match are found for the desired row', () => {
    expect(
      checkPlayerOneTestBoard({
        axe: 'horizontal',
        coords: [0, 0],
      })
    ).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(checkPlayerOneTestBoard({ axe: 'horizontal', coords: [0, 0] })).toBe(
      null
    )
  })

  it('returns an a 2d tuple containing the coordinates of the winning checkers on the vertical axe', () => {
    expect(
      checkPlayerOneTestBoard({
        axe: 'vertical',
        coords: [2, 0],
      })
    ).toEqual([[2, 2], [2, 3], [2, 4], [2, 5]])
  })

  it('returns an a 2d tuple containing the coordinates of the winning checkers on the horizontal axe', () => {
    expect(
      checkPlayerTwoTestBoard({ axe: 'horizontal', coords: [0, 1] })
    ).toEqual([[2, 1], [3, 1], [4, 1], [5, 1]])
  })
})
