import express from 'express';
import { checkoutController, paymentVerification, userOrderController } from '../controllers/paymentControllers.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/checkout',checkoutController)
router.post('/payment-verification',requireSignIn,paymentVerification)
router.get('/all-order',requireSignIn,userOrderController)




export default router;