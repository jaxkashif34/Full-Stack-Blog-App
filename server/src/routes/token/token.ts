import express from 'express';
const router = express.Router();
import { getNewToken } from '../../controller/token';

router.get('/get-tkn', getNewToken);

export default router;
