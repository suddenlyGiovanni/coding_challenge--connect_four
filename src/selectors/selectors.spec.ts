import {
  getColumn,
  getCellValue,
  getRow,
  getDiagonalRight,
  getDiagonalLeft,
  // getDiagonal,
} from './selectors'
import * as Fixture from '../fixture'
import { Player } from '../index'
import { Point } from 'MyTypes'

describe('getColumn', () => {
  it('happy path', () => {
    const getTestBoardColumn = getColumn(Fixture.testBoard)
    expect(getTestBoardColumn([0, 1])).toEqual(Fixture.testBoardColumn0)
    expect(getTestBoardColumn([2, 3])).toEqual(Fixture.testBoardColumn2)
    expect(getTestBoardColumn([6, 0])).toEqual([Player.One])
  })
})

describe('getRow', () => {
  it('happy path', () => {
    const getTestBoardRow = getRow(Fixture.testBoard)
    expect(getTestBoardRow([0, 1])).toEqual(Fixture.testBoardRow1)
  })
})

describe('getCell', () => {
  it('happy path', () => {
    const getTestBoardCell = getCellValue(Fixture.testBoard)
    expect(getTestBoardCell([0, 0])).toBe(Player.One)
    expect(getTestBoardCell([0, 1])).toBe(Player.Two)
    expect(getTestBoardCell([6, 1])).toBe(undefined)
  })
})

describe('getDiagonal', () => {
  const bottomLeft: Point = [0, 0]
  const bottomRight: Point = [6, 0]
  const topLeft: Point = [0, 5]
  const topRight: Point = [6, 5]
  describe('getDiagonalRight', () => {
    test('happy path', () => {
      expect(getDiagonalRight(topRight)).toEqual(
        expect.arrayContaining([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5]])
      )

      expect(getDiagonalRight(bottomLeft)).toEqual(
        expect.arrayContaining([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]])
      )
    })
    test('edge case: start from `topLeft`', () => {
      expect(getDiagonalRight(topLeft)).toEqual([topLeft])
    })

    test('edge case: start from `bottomRight`', () => {
      expect(getDiagonalRight(bottomRight)).toEqual([bottomRight])
    })
  })

  describe('getDiagonalLeft', () => {
    test('happy path', () => {
      expect(getDiagonalLeft(topLeft)).toEqual(
        expect.arrayContaining([[0, 5], [1, 4], [2, 3], [3, 2], [4, 1], [5, 0]])
      )

      expect(getDiagonalLeft([3, 5])).toEqual(
        expect.arrayContaining([[3, 5], [4, 4], [5, 3], [6, 2]])
      )
    })
    test('edge case: start from `topRight`', () => {
      expect(getDiagonalLeft(topRight)).toEqual([topRight])
    })

    test('edge case: start from `bottomLeft`', () => {
      expect(getDiagonalLeft(bottomLeft)).toEqual([bottomLeft])
    })
  })

  // describe('getDiagonal()', () => {
  //   test('happy path', () => {
  //     const temp = getDiagonal()
  //   })
  // })
})
