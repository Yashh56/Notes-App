import {createPost,deletePost,postDetails,updatePost,userPosts} from '../controllers/PostController'
import express from 'express'
import { verifyToken } from '../utils/verifyToken'

const router = express.Router()


router.get('/user/:userId',verifyToken,userPosts)
router.post('/create',verifyToken,createPost)
// router.post('/create',createPost)
router.put('/:id',verifyToken,updatePost)
router.delete('/:id',verifyToken,deletePost)
router.get('/:id',verifyToken,postDetails)

export default router
