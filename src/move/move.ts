import { X, Y, Coordinates } from 'MyTypes'

interface NewCoordinates {
  up: () => IterableIterator<void | Coordinates>
  upRight: () => IterableIterator<void | Coordinates>
  right: () => IterableIterator<void | Coordinates>
  downRight: () => IterableIterator<void | Coordinates>
  down: () => IterableIterator<void | Coordinates>
  downLeft: () => IterableIterator<void | Coordinates>
  /**
   * walks the board diagonally down to the left to retrieve the coordinates
   * of the most down to the left cell available for the provided input
   */
  diagonallyDownLeft: () => Coordinates
  left: () => IterableIterator<void | Coordinates>
  upLeft: () => IterableIterator<void | Coordinates>
}

/**
 * |  x-1, y-1  | x, y+1  | x+1, y+1  |
 * |  x-1, y    | x=0 y=0 | x+1, y    |
 * |  x-1, y-1  | x, y-1  | x+1, y-1  |
 */
export function move(coordinates: Coordinates): NewCoordinates {
  const [x, y] = coordinates
  if (x < 0 || x > 6) throw '0 <= x <= 6'
  if (y < 0 || y > 5) throw '0 <= y <= 5'

  return {
    *up() {
      if (y >= 5) return undefined
      const coords: Coordinates = [
        x, //
        (y + 1) as Y, //
      ]
      yield coords
      yield* move(coords).up()
    },

    *upRight() {
      if (x >= 6 || y >= 5) return undefined
      const coords: Coordinates = [
        (x + 1) as X, //
        (y + 1) as Y, //
      ]
      yield coords
      yield* move(coords).upRight()
    },

    *right() {
      if (x >= 6) return undefined
      const coords: Coordinates = [
        (x + 1) as X, //
        y, //
      ]
      yield coords
      yield* move(coords).right()
    },

    *downRight() {
      if (x >= 6 || y <= 0) return undefined
      const coords: Coordinates = [
        (x + 1) as X, //
        (y - 1) as Y, //
      ]
      yield coords
      yield* move(coords).downRight()
    },

    *down() {
      if (y <= 0) return undefined
      const coords: Coordinates = [
        x, //
        (y - 1) as Y, //
      ]
      yield coords
      yield* move(coords).down()
    },

    *downLeft() {
      if (x <= 0 || y <= 0) return undefined
      const coords: Coordinates = [
        (x - 1) as X, //
        (y - 1) as Y, //
      ]
      yield coords
      yield* move(coords).downLeft()
    },

    diagonallyDownLeft() {
      const downLeftIterable = this.downLeft()
      const { done, value } = downLeftIterable.next()
      if (done === false && value !== undefined) {
        return move(value).diagonallyDownLeft()
      }
      return coordinates
    },

    *left() {
      if (x <= 0) return undefined
      const coords: Coordinates = [
        (x - 1) as X, //
        y, //
      ]
      yield coords
      yield* move(coords).left()
    },

    *upLeft() {
      if (x <= 0 || y >= 5) return
      const coords: Coordinates = [
        (x - 1) as X, //
        (y + 1) as Y, //
      ]
      yield coords
      yield* move(coords).upLeft()
    },
  }
}
