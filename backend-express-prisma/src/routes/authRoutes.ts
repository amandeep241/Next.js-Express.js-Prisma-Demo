import { Router } from 'express';
import { RequestHandler } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

router.post('/login', login as RequestHandler);
router.post('/register', register as RequestHandler);

export default router;