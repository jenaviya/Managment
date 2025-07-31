import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', authenticateJWT, dashboardController.getDashboardStats);

export default router;