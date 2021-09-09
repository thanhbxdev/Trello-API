import { HttpStatusCode } from '../untilities/const'
import { CardService } from '../services/card.service'
import {BoardService} from "../services/board.service";

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors:error.message
    })
  }
}
const updateCard = async (req, res) => {
  try {
    const { id }= req.params
    const result = await CardService.updateCard(id, req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors:error.message
    })
  }
}
export const CardController ={
  createNew,
  updateCard
}