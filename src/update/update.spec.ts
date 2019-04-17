import { Point } from 'MyTypes'
import { updateColumn } from './update'
import { Player } from '../index'
import * as Fixture from '../fixture'
import { getColumnValues } from '../selectors/selectors'

describe('updateColumn', () => {
  it('will throw if the column is already full', () => {
    expect(() =>
      updateColumn({
        board: Fixture.testBoard,
        player: Player.One,
        point: [2, 5],
      })
    ).toThrow('This column is already full')
  })

  it('happy path', () => {
    const board = Fixture.testBoard
    const point = [6, 0] as Point
    const updatedBoard = updateColumn({
      board: board,
      player: Player.One,
      point: point,
    })
    expect(getColumnValues(updatedBoard)(point)).toEqual([
      { point: [6, 0], value: Player.One },
      { point: [6, 1], value: Player.One },
      { point: [6, 2], value: Player.One },
    ])
  })
})
