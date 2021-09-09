import express from 'express'
import { CardValidation } from '../../validations/card.validation'
import { CardController } from '../../controllers/card.controller'


const router = express.Router()

router.route('/')
  .post(CardValidation.creatNew, CardController.createNew)
router.route('/:id')
  .put(CardValidation.updateCard, CardController.updateCard)
export const CardRoutes = router