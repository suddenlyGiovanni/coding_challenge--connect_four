import * as Fixture from '../fixture'

import { Player } from '../index'
import { checkColumn, checkRow } from './checks'

describe('checkColumn', () => {
  it('returns `null` if no match are found for the desired column', () => {
    expect(
      checkColumn({
        board: Fixture.testBoard,
        player: Player.One,
        point: [0, 0],
      })
    ).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(
      checkColumn({
        board: Fixture.testBoard,
        player: Player.Two,
        point: [3, 0],
      }) //?
    ).toBe(null)
  })

  it('returns a two dimensional array containing the coordinates of the winning checkers on the vertical axe as a tuple [x, y]', () => {
    expect(
      checkColumn({
        board: Fixture.testBoard,
        player: Player.One,
        point: [2, 0],
      })
    ).toEqual([[2, 2], [2, 3], [2, 4], [2, 5]])
  })
})

describe('checkRow', () => {
  it('returns `null` if no match are found for the desired row', () => {
    expect(
      checkRow({
        board: Fixture.testBoard,
        player: Player.Two,
        point: [0, 0],
      })
    ).toBe(null)
  })

  it('returns `null` if provided with 4 non consecutive cells', () => {
    expect(
      checkRow({
        board: Fixture.testBoard,
        player: Player.One,
        point: [0, 0],
      })
    ).toBe(null)
  })

  it('returns a two dimensional array containing the coordinates of the winning checkers on the horizontal axe as a tuple [x, y]', () => {
    expect(
      checkRow({
        board: Fixture.testBoard,
        player: Player.Two,
        point: [0, 1],
      })
    ).toEqual([[2, 1], [3, 1], [4, 1], [5, 1]])
  })
})
