import { move } from './move'
import { X, Y } from 'MyTypes'

describe('getCoordinates', () => {
  const fromBottomLeft = move([0, 0])
  const fromTopLeft = move([0, 5])
  const fromBottomRight = move([6, 0])
  const fromTopRight = move([6, 5])

  test('it throws if the provided coords are already out of bounds', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const columnOutOfBoundsLeft = () => move([-1 as X, 0])
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const columnOutOfBoundsRight = () => move([7 as X, 0])
    expect(columnOutOfBoundsLeft).toThrow('0 <= x <= 6')
    expect(columnOutOfBoundsRight).toThrow('0 <= x <= 6')

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const rowOutOfBoundsBottom = () => move([0, -1 as Y])
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const rowOutOfBoundsTop = () => move([0, 6 as Y])
    expect(rowOutOfBoundsBottom).toThrow('0 <= y <= 5')
    expect(rowOutOfBoundsTop).toThrow('0 <= y <= 5')
  })

  test('up', () => {
    expect(fromBottomLeft.up()).toEqual([0, 1])
    // out of bounds at the top
    expect(fromTopLeft.up()).toBe(undefined)
  })

  test('upRight', () => {
    expect(fromBottomLeft.upRight()).toEqual([1, 1])
    expect(fromTopLeft.upRight()).toBeUndefined()
    expect(fromBottomRight.upRight()).toBeUndefined()
    expect(fromTopRight.upRight()).toBeUndefined()
  })

  test('right', () => {
    expect(fromBottomLeft.right()).toEqual([1, 0])
    expect(fromBottomRight.right()).toBeUndefined()
  })

  test('downRight', () => {
    expect(fromTopLeft.downRight()).toEqual([1, 4])
    expect(fromTopRight.downRight()).toBeUndefined()
    expect(fromBottomLeft.downRight()).toBeUndefined()
    expect(fromBottomRight.downRight()).toBeUndefined()
  })

  test('down', () => {
    expect(fromTopLeft.down()).toEqual([0, 4])
    expect(fromBottomLeft.down()).toBeUndefined()
  })

  test('downLeft', () => {
    expect(fromTopRight.downLeft()).toEqual([5, 4])
    expect(fromTopLeft.downLeft()).toBeUndefined()
    expect(fromBottomRight.downLeft()).toBeUndefined()
    expect(fromBottomLeft.downLeft()).toBeUndefined()
  })

  describe('toDeadDownLeft', () => {
    test('happy path', () => {
      expect(fromTopRight.diagonallyDownLeft()).toEqual([1, 0])
      expect(move([5, 5]).diagonallyDownLeft()).toEqual([0, 0])
    })

    it('returns original coordinate if already at the bottom end', () => {
      expect(fromBottomLeft.diagonallyDownLeft()).toEqual([0, 0])
    })
  })

  test('left', () => {
    expect(fromTopRight.left()).toEqual([5, 5])
    expect(fromTopLeft.left()).toBeUndefined()
  })

  test('upLeft', () => {
    expect(fromBottomRight.upLeft()).toEqual([5, 1])
    expect(fromBottomLeft.upLeft()).toBeUndefined()
    expect(fromTopRight.upLeft()).toBeUndefined()
    expect(fromTopLeft.upLeft()).toBeUndefined()
  })
})
