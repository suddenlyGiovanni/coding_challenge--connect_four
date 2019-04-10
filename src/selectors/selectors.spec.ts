import { getColumn, getCell, getRow, getRightDiagonal } from './selectors'
import * as Fixture from '../fixture'
import { Player } from '../index'
import { Coordinates } from 'MyTypes'

describe('getColumn', () => {
  it('happy path', () => {
    const getTestBoardColumn = getColumn(Fixture.testBoard)
    expect(getTestBoardColumn(0)).toEqual(Fixture.testBoardColumn0)
    expect(getTestBoardColumn(2)).toEqual(Fixture.testBoardColumn2)
    expect(getTestBoardColumn(6)).toEqual([Player.One])
  })
})

describe('getRow', () => {
  it('happy path', () => {
    const getTestBoardRow = getRow(Fixture.testBoard)
    expect(getTestBoardRow(1)).toEqual(Fixture.testBoardRow1)
  })
})

describe('getCell', () => {
  it('happy path', () => {
    const getTestBoardCell = getCell(Fixture.testBoard)
    expect(getTestBoardCell(0, 0)).toBe(Player.One)
    expect(getTestBoardCell(0, 1)).toBe(Player.Two)
    expect(getTestBoardCell(6, 1)).toBe(undefined)
  })
})

describe('getRightDiagonal', () => {
  const bottomLeft: Coordinates = [0, 0]
  const bottomRight: Coordinates = [6, 0]
  const topLeft: Coordinates = [0, 5]
  const topRight: Coordinates = [6, 5]

  test('happy path', () => {
    expect(getRightDiagonal(topRight)).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
      [6, 5],
    ])

    expect(getRightDiagonal(bottomLeft)).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
    ])
  })
  test('edge case: start from `topLeft`', () => {
    expect(getRightDiagonal(topLeft)).toEqual([[0, 5]])
  })

  test('edge case: start from `bottomRight`', () => {
    expect(getRightDiagonal(bottomRight)).toEqual([[6, 0]])
  })
})
