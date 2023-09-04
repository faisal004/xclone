import mongoose, { Schema, models } from 'mongoose'

const postSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPhoto: {
    type: String,
    required: true,
  },
  tweet: {
    type: String,
    required: true,
  },
  
},
{ timestamps: true },
)

const Post = models.Post || mongoose.model('Post',postSchema)
export default Post;