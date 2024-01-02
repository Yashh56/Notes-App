"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostController_1 = require("../controllers/PostController");
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
router.get('/user/:userId', verifyToken_1.verifyToken, PostController_1.userPosts);
router.post('/create', verifyToken_1.verifyToken, PostController_1.createPost);
// router.post('/create',createPost)
router.put('/:id', verifyToken_1.verifyToken, PostController_1.updatePost);
router.delete('/:id', verifyToken_1.verifyToken, PostController_1.deletePost);
router.get('/:id', verifyToken_1.verifyToken, PostController_1.postDetails);
exports.default = router;
//# sourceMappingURL=postRoute.js.map