import mongoose from "mongoose";
import Post from "../models/postModel";

export const userPosts = async (req, res) => {
    try {
        const posts = await Post.find({userId : req.params.userId});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
};

export const createPost = async (req, res) => {
    try {
        // const newPost = new Post(req.body);
        const { title, desc, userId,username } = req.body;
        const newPost = new Post({ title, desc, userId,username });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
};

export const updatePost = async (req, res) => {
    try { 
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete( req.params.id);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
};

export const postDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


