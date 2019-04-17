import { Player } from './index'
import * as Fixture from './fixture'

import { makeBoard, isColumnFull, updateColumn } from './index'

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
