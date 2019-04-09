import { X, Y, Coordinates } from 'MyTypes'

interface NewCoordinates {
  up: () => IterableIterator<void | Coordinates>
  upRight: () => IterableIterator<void | Coordinates>
  right: () => void | Coordinates
  downRight: () => void | Coordinates
  down: () => void | Coordinates
  downLeft: () => void | Coordinates
  /**
   * walks the board diagonally down to the left to retrieve the coordinates
   * of the most down to the left cell available for the provided input
   */
  diagonallyDownLeft: () => void | Coordinates
  left: () => void | Coordinates
  upLeft: () => void | Coordinates
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
      const coords = [x, y + 1] as Coordinates //?
      yield coords //?
      yield* move(coords).up() //?
    },

    *upRight() {
      if (x >= 6 || y >= 5) return undefined
      const toX: X = (x + 1) as X
      const toY: Y = (y + 1) as Y
      const coords: Coordinates = [toX, toY] //?
      yield coords //?
      yield* move(coords).upRight() //?
    },

    right() {
      if (x >= 6) return undefined
      const toX: X = (x + 1) as X
      const coords = [toX, y] as Coordinates
      return coords
    },

    downRight() {
      if (x >= 6 || y <= 0) return undefined
      const toX: X = (x + 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },

    down() {
      if (y <= 0) return undefined
      const toY: Y = (y - 1) as Y
      return [x, toY]
    },

    downLeft() {
      if (x <= 0 || y <= 0) return undefined
      const toX: X = (x - 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },

    diagonallyDownLeft() {
      coordinates //?
      const downLeft = this.downLeft() //?
      if (downLeft === undefined) return coordinates
      return move(downLeft).diagonallyDownLeft() //?
    },

    left() {
      if (x <= 0) return undefined
      const toX: X = (x - 1) as X
      return [toX, y]
    },

    upLeft() {
      if (x <= 0 || y >= 5) return
      const toX: X = (x - 1) as X
      const toY: Y = (y + 1) as Y
      return [toX, toY]
    },
  }
}
