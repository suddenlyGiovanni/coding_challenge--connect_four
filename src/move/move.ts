import { X, Y, Coordinates } from 'MyTypes'

interface NewCoordinates {
  up: () => void | Coordinates
  upRight: () => void | Coordinates
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
export function move([x, y]: Coordinates): NewCoordinates {
  if (x < 0 || x > 6) throw '0 <= x <= 6'
  if (y < 0 || y > 5) throw '0 <= y <= 5'
  return {
    up(): void | Coordinates {
      if (y >= 5) return undefined
      const toY: Y = (y + 1) as Y
      return [x, toY]
    },

    upRight(): void | Coordinates {
      if (x >= 6 || y >= 5) return
      const toX: X = (x + 1) as X
      const toY: Y = (y + 1) as Y
      return [toX, toY]
    },

    right(): void | Coordinates {
      if (x >= 6) return undefined
      const toX: X = (x + 1) as X
      return [toX, y]
    },

    downRight(): void | Coordinates {
      if (x >= 6 || y <= 0) return undefined
      const toX: X = (x + 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },

    down(): void | Coordinates {
      if (y <= 0) return undefined
      const toY: Y = (y - 1) as Y
      return [x, toY]
    },

    downLeft(): void | Coordinates {
      if (x <= 0 || y <= 0) return undefined
      const toX: X = (x - 1) as X
      const toY: Y = (y - 1) as Y
      return [toX, toY]
    },

    diagonallyDownLeft() {
      const coordinates: Coordinates = [x, y] //?
      const downLeft = this.downLeft() //?
      if (downLeft === undefined) return coordinates
      return move(downLeft).diagonallyDownLeft() //?
    },

    left(): void | Coordinates {
      if (x <= 0) return undefined
      const toX: X = (x - 1) as X
      return [toX, y]
    },

    upLeft(): void | Coordinates {
      if (x <= 0 || y >= 5) return
      const toX: X = (x - 1) as X
      const toY: Y = (y + 1) as Y
      return [toX, toY]
    },
  }
}
