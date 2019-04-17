import { X, Y, Point } from 'MyTypes'

interface NewCoordinates {
  up: () => IterableIterator<Point>

  _up: Point

  upRight: () => IterableIterator<Point>

  _upRight: Point

  right: () => IterableIterator<Point>

  _right: Point

  downRight: () => IterableIterator<Point>

  _downRight: Point

  /**
   * walks the board diagonally down to the right to retrieve the coordinates
   * of the most down to the right cell available for the provided input
   */
  diagonallyDownRight: () => Point

  down: () => IterableIterator<Point>

  _down: Point

  downLeft: () => IterableIterator<Point>

  _downLeft: Point

  /**
   * walks the board diagonally down to the left to retrieve the coordinates
   * of the most down to the left cell available for the provided input
   */
  diagonallyDownLeft: () => Point

  left: () => IterableIterator<Point>

  _left: Point

  upLeft: () => IterableIterator<Point>

  _upLeft: Point
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
    if (x >= 6 || y <= 0) return undefined
    const newPoint = [(x + 1) as X, (y - 1) as Y] as Point
    yield newPoint
    yield* downRight(newPoint)
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

  return {
    get _up() {
      return this.up().next().value
    },

    up: () => up(point),

    get _upRight() {
      return this.upRight().next().value
    },

    upRight: () => upRight(point),

    get _right(): Point {
      return this.right().next().value
    },

    right: () => right(point),

    get _downRight(): Point {
      return this.downRight().next().value
    },

    downRight: () => downRight(point),

    diagonallyDownRight() {
      const { done, value } = this.downRight().next()
      return value !== undefined && done === false
        ? move(value).diagonallyDownRight()
        : point
    },

    get _down(): Point {
      return this.down().next().value
    },

    down: () => down(point),

    get _downLeft(): Point {
      return this.downLeft().next().value
    },

    downLeft: () => downLeft(point),

    diagonallyDownLeft() {
      const { done, value } = this.downLeft().next()
      return done === false && value !== undefined
        ? move(value).diagonallyDownLeft()
        : point
    },

    get _left(): Point {
      return this.left().next().value
    },

    left: () => left(point),

    get _upLeft(): Point {
      return this.upLeft().next().value
    },

    upLeft: () => upLeft(point),
  }
}
