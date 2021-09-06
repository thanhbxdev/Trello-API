import { ColumnModel } from '../models/column.model'

const createNew = async (data) => {
  try {
    return await ColumnModel.createNew(data)
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