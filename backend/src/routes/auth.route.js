import express from 'express';
import { login, logout, onboard, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post("/onboarding",protectRoute,onboard)

// check if athenticated or not 
router.get("/me", protectRoute, (req, res) => {
  const userResponse = { ...req.user._doc };
  delete userResponse.password;

  res.status(200).json({
    success: true,
    user: userResponse,
  });
});




export default router;