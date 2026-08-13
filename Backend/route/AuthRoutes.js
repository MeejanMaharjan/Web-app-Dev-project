import { Router } from 'express'
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/AuthController.js'
import { authenticationMiddleware } from '../middlewares/Auth.js'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.get('/me', authenticationMiddleware, getCurrentUser)

export default authRouter
