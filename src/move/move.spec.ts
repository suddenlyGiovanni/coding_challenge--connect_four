import { getCoordinates } from './move'

describe('getCoordinates', () => {
  const fromBottomLeft = getCoordinates(0, 0)
  const fromTopLeft = getCoordinates(0, 5)
  const fromBottomRight = getCoordinates(6, 0)
  const fromTopRight = getCoordinates(6, 5)

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
