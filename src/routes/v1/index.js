import express from 'express'
import { HttpStatusCode } from '../../untilities/const'
import { BoardRoutes } from './board.route'

const router = express.Router()


router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
  status:'OK !'
}))
router.use('/boards', BoardRoutes)

export const apiV1 = router