import { Router } from 'express';
import { handleWebhook, getMessages, testing } from '../controllers/webhookController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, handleWebhook);
router.get('/', auth, getMessages);
router.get('/testing', testing);

export default router;