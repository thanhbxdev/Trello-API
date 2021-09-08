import Joi from 'joi'
import { getDB } from '../config/mongodb'
import { ObjectId } from 'mongodb'

//Define Card collection

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId:Joi.string().required(), // also ObjectId when create new
  columnId:Joi.string().required(), // also ObjectId when create new
  title:Joi.string().required().min(3).max(30).trim(),
  cover:Joi.string().default(null),
  createdAt:Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(null),
  _destroy:Joi.boolean().default(false)
})

const validateSchema =async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly:false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId:ObjectId(validatedValue.boardId),
      columnId:ObjectId(validatedValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
    return await getDB().collection(cardCollectionName).findOne(result.insertedId)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {Array} ids
 * @returns {Promise<void>}
 */
const deleteMany =async (ids) => {
  try {
    const transformIds = ids.map(i => ObjectId(i))
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id:{ $in:transformIds } },
      { $set:{ _destroy:true } }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const CardModel = { cardCollectionName, createNew, deleteMany }