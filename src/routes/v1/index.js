import express from 'express'
import { HttpStatusCode } from '../../untilities/const'
import { BoardRoutes } from './board.route'
import { ColumnRoutes } from './column.route'
import { CardRoutes } from './card.route'

const router = express.Router()


router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
  status:'OK !'
}))
router.use('/boards', BoardRoutes)
router.use('/columns', ColumnRoutes)
router.use('/cards', CardRoutes)

export const apiV1 = router