import * as R from 'ramda'
import { Player, Board, Point, ConnectFour } from 'MyTypes'
import {
  getColumnValues,
  getY,
  getRowValues,
  getX,
  getDiagonalValues,
  getPoint,
} from '../selectors/selectors'

import { move } from '../move/move'

export function checkColumn({
  player,
  board,
  point,
}: {
  player: Player
  board: Board
  point: Point
}): null | ConnectFour {
  const values = getColumnValues(board)(point)
  const playersValues = values.filter(cell => cell.value === player)
  // early returns if the total number of player checker is lower than the require victory condition
  if (playersValues.length < 4) return null

  // looks contiguous indexes
  const contiguousValues = playersValues.filter((current, index, array) => {
    const _previousY = getY(array[index - 1])
    const _currentY = getY(current)
    const _nextY = getY(array[index + 1])

    if (!_previousY && _currentY) return _currentY + 1 === _nextY

    if (!_nextY && _currentY) return _currentY - 1 === _previousY

    if (_currentY) {
      return _currentY - 1 === _previousY || _currentY + 1 === _nextY
    }
  })
  if (contiguousValues.length < 4) return null

  // connect four! return the winning cells
  return (contiguousValues.map(cell => cell.point) as unknown) as ConnectFour
}

export function checkRow({
  player,
  board,
  point,
}: {
  player: Player
  board: Board
  point: Point
}): null | ConnectFour {
  const values = getRowValues(board)(point)
  const playersValues = values.filter(cell => cell.value === player)
  // early returns if the total number of player checker is lower than the require victory condition
  if (playersValues.length < 4) return null
  // looks contiguous indexes
  const contiguousValues = playersValues.filter((current, index, array) => {
    const _previousX = getX(array[index - 1])
    const _currentX = getX(current)
    const _nextX = getX(array[index + 1])

    if (!_previousX && _currentX) return _currentX + 1 === _nextX
    if (!_nextX && _currentX) return _currentX - 1 === _previousX
    if (_currentX) {
      return _currentX - 1 === _previousX || _currentX + 1 === _nextX
    }
  })
  if (contiguousValues.length < 4) return null
  // connect four! return the winning cells
  return (contiguousValues.map(cell => cell.point) as unknown) as ConnectFour
}

export function checkDiagonalRight({
  player,
  board,
  point,
}: {
  player: Player
  board: Board
  point: Point
}): null | ConnectFour {
  const values = getDiagonalValues(board)(point)('right') //?
  const playersValues = values.filter(el => el.value === player) //?
  // early returns if the total number of player checker is lower than the require victory condition
  if (playersValues.length < 4) return null
  const contiguousValues = playersValues.filter((current, index, array) => {
    const previous = array[index - 1] //?
    const next = array[index + 1] //?
    const currentPoint = getPoint(current) //?
    const nextPoint = getPoint(next) //?
    const previousPoint = getPoint(previous) //?

    previousPoint //?
    currentPoint //?
    nextPoint //?

    if (!previousPoint && currentPoint) {
      return R.equals(move(currentPoint)._upRight, nextPoint) //?
    }

    if (!next && currentPoint) {
      return R.equals(move(currentPoint)._downLeft, previousPoint) //?
    }

    if (currentPoint) {
      return (
        R.equals(move(currentPoint)._downLeft, previousPoint) ||
        R.equals(move(currentPoint)._upRight, nextPoint)
      )
    }
  })

  contiguousValues //?
  if (contiguousValues.length !== 4) return null
  return (contiguousValues.map(el => el.point) as unknown) as ConnectFour //?
}
