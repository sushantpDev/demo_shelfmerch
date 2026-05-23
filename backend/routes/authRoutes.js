import express from 'express';
import { getToastAuthUrl, handleToastCallback, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/toast-url', getToastAuthUrl);
router.post('/callback', handleToastCallback);
router.post('/logout', logout);

export default router;
