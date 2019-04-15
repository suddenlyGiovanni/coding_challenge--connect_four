import { X, Y, Coordinates as Point } from 'MyTypes'

interface NewCoordinates {
  up: () => IterableIterator<Point>
  upRight: () => IterableIterator<Point>
  right: () => IterableIterator<Point>
  downRight: () => IterableIterator<Point>
  /**
   * walks the board diagonally down to the right to retrieve the coordinates
   * of the most down to the right cell available for the provided input
   */
  diagonallyDownRight: () => Point
  down: () => IterableIterator<Point>
  downLeft: () => IterableIterator<Point>
  /**
   * walks the board diagonally down to the left to retrieve the coordinates
   * of the most down to the left cell available for the provided input
   */
  diagonallyDownLeft: () => Point
  left: () => IterableIterator<Point>
  upLeft: () => IterableIterator<Point>
}

function* up([x, y]: Point): IterableIterator<Point> {
  const newPoint = [x, y + 1] as Point
  if (y >= 5) return undefined
  yield newPoint
  yield* up(newPoint)
}

function* upRight([x, y]: Point): IterableIterator<Point> {
  if (x >= 6 || y >= 5) return undefined
  const newPoint = [x + 1, y + 1] as Point //?
  yield newPoint
  yield* upRight(newPoint)
}

function* right([x, y]: Point): IterableIterator<Point> {
  if (x >= 6) return undefined
  const newPoint = [x + 1, y] as Point //?
  yield newPoint
  yield* right(newPoint)
}

function* downRight([x, y]: Point): IterableIterator<Point> {
  while (x < 6 && y > 0) {
    const newPoint = [(x + 1) as X, (y - 1) as Y] as Point
    // if (x === 5 || y === 1) return newPoint
    yield newPoint
    x++
    y--
  }
}

function* down([x, y]: Point): IterableIterator<Point> {
  if (y <= 0) return undefined
  const newPoint = [x, y - 1] as Point
  yield newPoint
  yield* down(newPoint)
}

function* downLeft([x, y]: Point): IterableIterator<Point> {
  if (x <= 0 || y <= 0) return undefined
  const newPoint = [x - 1, y - 1] as Point
  yield newPoint
  yield* downLeft(newPoint)
}

function* left([x, y]: Point): IterableIterator<Point> {
  if (x <= 0) return undefined
  const newPoint = [x - 1, y] as Point
  yield newPoint
  yield* left(newPoint)
}

function* upLeft([x, y]: Point): IterableIterator<Point> {
  if (x <= 0 || y >= 5) return
  const newPoint = [x - 1, y + 1] as Point
  yield newPoint
  yield* upLeft(newPoint)
}

/**
 * |  x-1, y-1  | x, y+1  | x+1, y+1  |
 * |  x-1, y    | x=0 y=0 | x+1, y    |
 * |  x-1, y-1  | x, y-1  | x+1, y-1  |
 */
export function move(point: Point): NewCoordinates {
  const [x, y] = point
  if (x < 0 || x > 6) throw new TypeError('0 <= x <= 6')
  if (y < 0 || y > 5) throw new TypeError('0 <= y <= 5')

  return {
    up: () => up(point),
    upRight: () => upRight(point),
    right: () => right(point),
    downRight: () => downRight(point),
    diagonallyDownRight() {
      const { done, value } = this.downRight().next()
      return value !== undefined && done === false
        ? move(value).diagonallyDownRight()
        : point
    },
    down: () => down(point),
    downLeft: () => downLeft(point),
    diagonallyDownLeft() {
      const { done, value } = this.downLeft().next()
      return done === false && value !== undefined
        ? move(value).diagonallyDownLeft()
        : point
    },
    left: () => left(point),
    upLeft: () => upLeft(point),
  }
}
