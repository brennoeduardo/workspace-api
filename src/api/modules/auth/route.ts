import { Router, Request } from 'express'

import authController from './controller'
import { authToken } from '../../middleware/auth'

const router = Router()

router.route('/')
    .post(authController.login)

router.route('/logout')
    .get(authController.logout)

interface AuthenticatedRequest extends Request {
    user?: any;
}

router.get('/check', authToken, (req: AuthenticatedRequest, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});

router.route('/confirmCode')
    .post(authController.confirmVerificationCode)

export default router