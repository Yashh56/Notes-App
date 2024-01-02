"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDetails = exports.deletePost = exports.updatePost = exports.createPost = exports.userPosts = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const userPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find({ userId: req.params.userId });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.userPosts = userPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newPost = new Post(req.body);
        const { title, desc, userId, username } = req.body;
        const newPost = new postModel_1.default({ title, desc, userId, username });
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findOneAndDelete(req.params.id);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.deletePost = deletePost;
const postDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.postDetails = postDetails;
//# sourceMappingURL=PostController.js.map