import express from 'express';
import router1 from './user.js';
import router2 from './account.js';
const router = express.Router();

// Mount user routes at the root so endpoints like /signup become /api/v1/signup
router.use('/user', router1);
router.use("/account", router2);

export default router;