import { ColumnModel } from '../models/column.model'
import { BoardModel } from '../models/board.model'

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)

    // update columnOrder
    await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString())
    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (id, data) => {
  try {
    const updateData ={
      ...data,
      updatedAt:Date.now()
    }
    return await ColumnModel.update(id, updateData)
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = {
  createNew,
  update
}