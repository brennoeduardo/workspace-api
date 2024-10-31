import { Router } from 'express';

import taskRouter from './modules/task/routes';
import userRouter from './modules/user/routes'
import authRouter from './modules/auth/route'

import { authToken } from '../api/middleware/auth';

const router = Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/tasks', authToken, taskRouter);
router.use('/user', userRouter)

export default router;