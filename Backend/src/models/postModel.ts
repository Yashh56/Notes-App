import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    desc: {
        type : String,
    },
    username : {
        type : String,
        required : true,
    },
    categories : {
        type : Array,
    },
    userId : {
        type : String,
        required : true,
    }
}, {timestamps : true});

const Post = mongoose.model("Post", postSchema);

export default Post;