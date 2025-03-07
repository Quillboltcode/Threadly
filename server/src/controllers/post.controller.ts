import { Request, Response, NextFunction } from 'express';
import { IPost, Post } from '../models/Post';
import { Like } from '../models/Like';
import { asyncHandler } from '../utils/AsyncHandler';
import { User } from '../models/User';


// Get all posts
export const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get query parameters with defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 posts per page

    // Ensure page and limit are valid
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: "Page and limit must be positive numbers" });
    }

    const skip = (page - 1) * limit;

    // Fetch posts with pagination
    const posts = await Post.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
      .catch((err) =>{ 
        if (err.name === 'CastError') {
          return res.status(400).json({ message: "Invalid page or limit" });
        } else {
          throw err;
        }
        })
      .then((posts) => {
        if (!posts) {
          return res.status(404).json({ message: "No posts found" });
        }
        return posts;
      })
      .catch((err) =>
        {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      });


    // Get total count for pagination info
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      totalPosts,
      page,
      totalPages: Math.ceil(totalPosts / limit),
      limit,
      posts,
    });
  }
);

// Get single post
export const getPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  }
);

// Create post
export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const { content } = req.body;
    const post = new Post({
      content,
      author: req.user._id,
    });
    const savePost = await post.save();
    const { _id, ...postWithoutIdAndVersion } = savePost.toObject();
    res.status(201).json(postWithoutIdAndVersion);
  }
);

// Update post
export const updatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }
    
    post.content = content;
    await post.save();
    res.status(200).json(post);
  }
);

// Delete post
export const deletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }
    
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  }
);

// Like/Unlike post
export const toggleLike = asyncHandler(
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({ 
      post: post._id, 
      user: req.user._id 
    });

    if (existingLike) {
      await existingLike.deleteOne();
      post.likeCount--;
    } else {
      await Like.create({ 
        post: post._id, 
        user: req.user._id 
      });
      post.likeCount++;
    }

    await post.save();
    res.status(200).json(post);
  }
);

// Add comment to post
// param: postId, content, author.
export const addComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const newComment = {
        content,
        image : req.file ? req.file.path : null,
        author: req.user._id,
        createdAt: new Date()
      };
      
    post.comments.push(newComment as any);
    
    await post.save();
    res.status(201).json(post);
  }
);

export const getFeedPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const currentUser = await User.findById(req.user._id);
  
  // Get posts from current user and followed users
  const posts = await Post.find({
    $or: [
      { author: req.user._id }, // Current user's posts
      { author: { $in: currentUser.following } } // Posts from followed users
    ]
  })
    .sort({ createdAt: -1 }) // Most recent first
    .skip(skip)
    .limit(limit)
    .populate('author', 'username avatar')
    .populate('comments.author', 'username avatar');

  const total = await Post.countDocuments({
    $or: [
      { author: req.user._id },
      { author: { $in: currentUser.following } }
    ]
  });

  res.json({
    posts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total
  });
});
