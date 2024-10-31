import { Router } from 'express'

import authController from './controller'

const router = Router()

router.route('/')
    .post(authController.login)

router.route('/confirmCode')
    .post(authController.confirmVerificationCode)

export default router