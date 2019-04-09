import { move } from './move'
import { X, Y } from 'MyTypes'

describe('move', () => {
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

  describe('up', () => {
    test('out of bounds at the top', () => {
      const upIterable = fromTopLeft.up() //?
      expect(upIterable.next()).toEqual({ done: true, value: undefined })
    })

    test('happy path', () => {
      const upIterable = fromBottomLeft.up() //?
      expect(upIterable.next()).toEqual({ done: false, value: [0, 1] })
      expect(upIterable.next()).toEqual({ done: false, value: [0, 2] })
      expect(upIterable.next()).toEqual({ done: false, value: [0, 3] })
      expect(upIterable.next()).toEqual({ done: false, value: [0, 4] })
      expect(upIterable.next()).toEqual({ done: false, value: [0, 5] })
      expect(upIterable.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('upRight', () => {
    test('out of bounds', () => {
      expect(fromTopLeft.upRight().next().value).toBeUndefined()
      expect(fromBottomRight.upRight().next().value).toBeUndefined()
      expect(fromTopRight.upRight().next().value).toBeUndefined()
    })
    test('happy path', () => {
      const upRightIterable = fromBottomLeft.upRight() //?
      expect(upRightIterable.next()).toEqual({ done: false, value: [1, 1] })
      expect(upRightIterable.next()).toEqual({ done: false, value: [2, 2] })
      expect(upRightIterable.next()).toEqual({ done: false, value: [3, 3] })
      expect(upRightIterable.next()).toEqual({ done: false, value: [4, 4] })
      expect(upRightIterable.next()).toEqual({ done: false, value: [5, 5] })
      expect(upRightIterable.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('right', () => {
    test('out of bounds', () => {
      expect(fromBottomRight.right().next()).toEqual({
        done: true,
        value: undefined,
      })
    })
    test('happy path', () => {
      const rightIterable = fromBottomLeft.right() //?
      expect(rightIterable.next()).toEqual({ done: false, value: [1, 0] })
      expect(rightIterable.next()).toEqual({ done: false, value: [2, 0] })
      expect(rightIterable.next()).toEqual({ done: false, value: [3, 0] })
      expect(rightIterable.next()).toEqual({ done: false, value: [4, 0] })
      expect(rightIterable.next()).toEqual({ done: false, value: [5, 0] })
      expect(rightIterable.next()).toEqual({ done: false, value: [6, 0] })
      expect(rightIterable.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('downRight', () => {
    test('out of bounds', () => {
      expect(fromTopRight.downRight().next()).toEqual({
        done: true,
        value: undefined,
      })

      expect(fromBottomLeft.downRight().next()).toEqual({
        done: true,
        value: undefined,
      })
      expect(fromBottomRight.downRight().next()).toEqual({
        done: true,
        value: undefined,
      })
    })
    test('happy path', () => {
      const downRightIterable = fromTopLeft.downRight() //?
      expect(downRightIterable.next()).toEqual({ done: false, value: [1, 4] })
      expect(downRightIterable.next()).toEqual({ done: false, value: [2, 3] })
      expect(downRightIterable.next()).toEqual({ done: false, value: [3, 2] })
      expect(downRightIterable.next()).toEqual({ done: false, value: [4, 1] })
      expect(downRightIterable.next()).toEqual({ done: false, value: [5, 0] })
      expect(downRightIterable.next()).toEqual({ done: true, value: undefined })
    })
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
