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
      expect(upIterable.next() /* ?*/).toStrictEqual({
        done: true,
        value: undefined,
      })
    })

    test('edge case', () => {
      const upIterable = move([0, 4]).up() //?
      expect(
        upIterable.next() //?
      ).toStrictEqual({ done: false, value: [0, 5] })

      expect(
        upIterable.next() //?
      ).toStrictEqual({ done: true, value: undefined })
    })

    test('happy path', () => {
      const upIterable = move([0, 0]).up() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => upIterable.next()
      expect(next()).toStrictEqual({ done: false, value: [0, 1] })
      expect(next()).toStrictEqual({ done: false, value: [0, 2] })
      expect(next()).toStrictEqual({ done: false, value: [0, 3] })
      expect(next()).toStrictEqual({ done: false, value: [0, 4] })
      expect(next()).toStrictEqual({ done: false, value: [0, 5] })
      expect(next()).toStrictEqual({ done: true, value: undefined })
    })
  })

  describe('upRight', () => {
    test('out of bounds', () => {
      expect(fromTopLeft.upRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
      expect(fromBottomRight.upRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
      expect(fromTopRight.upRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })

    test('temp', () => {
      const tempIterable = move([1, 0]).upRight() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => tempIterable.next()
      expect(next()).toStrictEqual({
        done: false,
        value: [2, 1],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [3, 2],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [4, 3],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [5, 4],
      })

      expect(next()).toStrictEqual({
        done: false,
        value: [6, 5],
      })
    })

    test('happy path', () => {
      const upRightIterable = fromBottomLeft.upRight() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => upRightIterable.next()
      expect(next()).toStrictEqual({
        done: false,
        value: [1, 1],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [2, 2],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [3, 3],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [4, 4],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [5, 5],
      })
      expect(next()).toStrictEqual({
        done: true,
        value: undefined,
      })
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
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => rightIterable.next()
      expect(next()).toStrictEqual({ done: false, value: [1, 0] })
      expect(next()).toStrictEqual({ done: false, value: [2, 0] })
      expect(next()).toStrictEqual({ done: false, value: [3, 0] })
      expect(next()).toStrictEqual({ done: false, value: [4, 0] })
      expect(next()).toStrictEqual({ done: false, value: [5, 0] })
      expect(next()).toStrictEqual({ done: false, value: [6, 0] })
      expect(next()).toStrictEqual({ done: true, value: undefined })
    })
  })

  describe('downRight', () => {
    test('out of bounds', () => {
      expect(fromTopRight.downRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })

      expect(fromBottomLeft.downRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
      expect(fromBottomRight.downRight().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
    test('happy path', () => {
      const downRightIterable = fromTopLeft.downRight() //?
      expect(downRightIterable.next()).toStrictEqual({
        done: false,
        value: [1, 4],
      })
      expect(downRightIterable.next()).toStrictEqual({
        done: false,
        value: [2, 3],
      })
      expect(downRightIterable.next()).toStrictEqual({
        done: false,
        value: [3, 2],
      })
      expect(downRightIterable.next()).toStrictEqual({
        done: false,
        value: [4, 1],
      })
      expect(downRightIterable.next()).toStrictEqual({
        done: false,
        value: [5, 0],
      })
      expect(downRightIterable.next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('down', () => {
    test('out of bounds', () => {
      expect(fromBottomLeft.down().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
    test('happy path', () => {
      const downIterable = fromTopLeft.down() //?
      expect(downIterable.next()).toStrictEqual({ done: false, value: [0, 4] })
      expect(downIterable.next()).toStrictEqual({ done: false, value: [0, 3] })
      expect(downIterable.next()).toStrictEqual({ done: false, value: [0, 2] })
      expect(downIterable.next()).toStrictEqual({ done: false, value: [0, 1] })
      expect(downIterable.next()).toStrictEqual({ done: false, value: [0, 0] })
      expect(downIterable.next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('downLeft', () => {
    test('out of bounds', () => {
      expect(fromTopLeft.downLeft().next()).toEqual({
        done: true,
        value: undefined,
      })
      expect(fromBottomRight.downLeft().next()).toEqual({
        done: true,
        value: undefined,
      })
      expect(fromBottomLeft.downLeft().next()).toEqual({
        done: true,
        value: undefined,
      })
    })

    test('happy path', () => {
      const downLeftIterable = fromTopRight.downLeft() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => downLeftIterable.next()
      expect(next()).toStrictEqual({
        done: false,
        value: [5, 4],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [4, 3],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [3, 2],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [2, 1],
      })
      expect(next()).toStrictEqual({
        done: false,
        value: [1, 0],
      })
      expect(next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('diagonallyDownLeft', () => {
    it('returns original coordinate if already at the bottom end', () => {
      expect(fromBottomLeft.diagonallyDownLeft()).toEqual([0, 0])
    })

    test('happy path', () => {
      expect(fromTopRight.diagonallyDownLeft()).toEqual([1, 0])
      expect(move([5, 5]).diagonallyDownLeft()).toEqual([0, 0])
      expect(move([4, 5]).diagonallyDownLeft()).toEqual([0, 1])
      expect(move([0, 5]).diagonallyDownLeft()).toEqual([0, 5])
    })
  })

  describe('diagonallyDownRight', () => {
    it('returns original coordinate if already at the bottom end', () => {
      expect(fromBottomRight.diagonallyDownRight()).toEqual([6, 0])
      expect(fromBottomLeft.diagonallyDownRight()).toEqual([0, 0])
    })

    test('happy path', () => {
      expect(fromTopLeft.diagonallyDownRight()).toEqual([5, 0])
      expect(move([0, 4]).diagonallyDownRight()).toEqual([4, 0])
      expect(move([3, 4]).diagonallyDownRight()).toEqual([6, 1])
    })
  })

  describe('left', () => {
    test('out of bounds', () => {
      expect(fromTopLeft.left().next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })

    test('happy path', () => {
      const leftIterable = fromTopRight.left() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => leftIterable.next()
      expect(next()).toStrictEqual({ done: false, value: [5, 5] })
      expect(next()).toStrictEqual({ done: false, value: [4, 5] })
      expect(next()).toStrictEqual({ done: false, value: [3, 5] })
      expect(next()).toStrictEqual({ done: false, value: [2, 5] })
      expect(next()).toStrictEqual({ done: false, value: [1, 5] })
      expect(next()).toStrictEqual({ done: false, value: [0, 5] })
      expect(next()).toStrictEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('upLeft', () => {
    test('out of bounds', () => {
      expect(fromBottomLeft.upLeft().next().value).toBeUndefined()
      expect(fromTopRight.upLeft().next().value).toBeUndefined()
      expect(fromTopLeft.upLeft().next().value).toBeUndefined()
    })
    test('happy path', () => {
      const upLeftIterable = fromBottomRight.upLeft() //?
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const next = () => upLeftIterable.next()
      expect(next()).toEqual({ done: false, value: [5, 1] })
      expect(next()).toEqual({ done: false, value: [4, 2] })
      expect(next()).toEqual({ done: false, value: [3, 3] })
      expect(next()).toEqual({ done: false, value: [2, 4] })
      expect(next()).toEqual({ done: false, value: [1, 5] })
      expect(next()).toEqual({ done: true, value: undefined })
    })
  })
})
