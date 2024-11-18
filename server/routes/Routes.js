import express from 'express'
import { getStatistics, getTransaction } from '../controller/Product_controller.js';

const router = express.Router()

router.get('/transaction',getTransaction);
router.get('/statistics',getStatistics)

export default router;