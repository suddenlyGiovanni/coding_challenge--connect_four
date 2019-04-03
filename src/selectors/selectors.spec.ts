import { getColumn, getCell, getRow } from './selectors'
import * as Fixture from '../fixture'
import { Player } from '../index'

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
