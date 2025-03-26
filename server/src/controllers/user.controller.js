
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// Get current user's profile
export const getUserProfile = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  }
);

// Update user profile
export const updateProfile = asyncHandler(
  async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }
);

// Get user by ID
export const getUserById = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }
);

// Follow/Unfollow user
export const followUser = asyncHandler(
  async (req, res, next) => {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    // const isFollowing = currentUser.following.includes(userToFollow._id);
    // cast to array of interface of smaller user interface with username, email, avatar, id. The array is then Promise<User[]> to return to client for display and cache
    const isFollowing = currentUser.following.some(
      (id) => id.toString() === userToFollow._id.toString()

    );

    if (isFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: userToFollow._id }
      });
      await User.findByIdAndUpdate(userToFollow._id, {
        $pull: { followers: req.user._id }
      });
      res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      // Follow
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: userToFollow._id }
      });
      await User.findByIdAndUpdate(userToFollow._id, {
        $push: { followers: req.user._id }
      });
      res.status(200).json({ message: 'User followed successfully' });
    }
  }
);

// Get user suggestions

export const getUserSuggestions = asyncHandler(
  async (req, res, next) => {
    const currentUser = await User.findById(req.user._id);
    const suggestions = await User.find({
      _id: { 
        $nin: [...currentUser.following, req.user._id] 
      }
    }).limit(5);
    
    res.status(200).json(suggestions);
  }
);
