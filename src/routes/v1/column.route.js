import express from 'express'
import { ColumnValidation } from '../../validations/column.validation'
import { ColumnController } from '../../controllers/column.controller'

const router = express.Router()

router.route('/')
  .post(ColumnValidation.creatNew, ColumnController.createNew)
router.route('/:id')
  .put(ColumnValidation.update, ColumnController.update)

export const ColumnRoutes = router