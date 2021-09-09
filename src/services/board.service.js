import { BoardModel } from '../models/board.model'
import { cloneDeep } from 'lodash'
import { ColumnModel } from '../models/column.model'
import { CardModel } from '../models/card.model'

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
const updateBoard = async (id, data) => {
  try {
    const updateData ={
      ...data,
      updatedAt:Date.now()
    }
    if (updateData._id) delete updateData._id
    if (updateData.columns) delete updateData.columns
    const updatedBoard = await BoardModel.update(id, updateData)
    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardService = {
  createNew,
  getFullBoard,
  updateBoard
}