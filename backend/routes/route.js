import express from 'express';
import router1 from './user.js';
const router = express.Router();

// Mount user routes at the root so endpoints like /signup become /api/v1/signup
router.use('/', router1);

export default router;