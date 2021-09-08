import { BoardModel } from '../models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)

    const transformBoard = cloneDeep(board)
    // Filter deleted
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
    // Add cart to each column
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })

    // remove cards data from board
    delete transformBoard.cards

    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  getFullBoard
}