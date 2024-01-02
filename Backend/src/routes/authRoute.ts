import {signup,login, logout, refetch} from '../controllers/AuthController';
import express from 'express';

const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/refetch',refetch);


export default router;