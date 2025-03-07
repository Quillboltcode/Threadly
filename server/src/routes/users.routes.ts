import { Router } from 'express';
import { getUserById, 
    followUser, 
    getUserSuggestions,
    getUserProfile,
    updateProfile
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';


const router = Router();
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     description: Get current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */router.get('/profile', getUserProfile, authenticate('jwt'));

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     description: Update current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.put('/profile', updateProfile, authenticate('jwt'));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     description: Get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */router.get('/:id', getUserById, authenticate('jwt') );


/**
  * @swagger
  * /api/users/follow/{id}:
  *   post:
  *     summary: Follow a user
  *     description: Follow a user by their ID
  *     tags: [User]
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: ID of the user to follow
  *     responses:
  *       200:
  *         description: Successfully followed user
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: User not found
  */router.post('/follow/:id', followUser, authenticate('jwt') );
  
/**
 * @swagger
 * /api/users/suggestions:
 *   get:
 *     summary: Get user suggestions
 *     description: Get suggested users to follow
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */router.get('/suggestions', getUserSuggestions, authenticate('jwt') );

export default router;