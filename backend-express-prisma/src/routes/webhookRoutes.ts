import { Router } from 'express';
import { handleWebhook, getMessages } from '../controllers/webhookController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, handleWebhook);
router.get('/', auth, getMessages);

export default router;