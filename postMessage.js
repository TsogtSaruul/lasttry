const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    name: String,
    creator: String,
    drink: String, 
    category: String, 
    alcoholic: String, 
    glass: String, 
    instructions: String, 
    ingredient1: String,
    ingredient2: String,
    ingredient3: String,
    measure: String,
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: { type: Date, default: new Date() },
    dateModified: { type: Date, default: new Date() },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
