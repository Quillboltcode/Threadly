import Express ,{ Router } from 'express';
import { register,login, verify, logout } from '../controllers/auth.controller';
import { authenticate, authorize, googleAuthCallback } from '../middleware/auth.middleware';
const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Authentication failed
 *       500:
 *         description: Internal server error
 */router.post('/login', login);

 /**
  * @swagger
  * /api/auth/logout:
  *   post:
  *     summary: Logout a user
  *     tags:
  *       - Authentication
  *     responses:
  *       200:
  *         description: Logout successful
  *       401:
  *         description: Not authenticated
  */router.post('/logout', logout);

  /**
   * @swagger
   * /api/auth/verify:
   *   get:
   *     summary: Verify user authentication token
   *     tags:
   *       - Authentication
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token is valid
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *       401:
   *         description: Invalid or expired token
   */router.get('/verify', verify);


// Google OAuth routes
/**
 * @swagger
 * /api/auth/google:
 *  get:
 *    summary: Redirect to Google OAuth login page
 *    tags:
 *      - Authentication
 *    responses:
 *      200:
 *        description: Redirect to Google OAuth login page
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */router.get('/google', authenticate('google'));

/**
 * @swagger
 * /api/auth/google/callback:
 *  get:
 *    summary: Handle Google OAuth callback
 *    tags:
 *      - Authentication
 *    responses:
 *      200:
 *        description: Successful login
 */router.get('/google/callback', googleAuthCallback);


router.get('/admin-only', 
   authenticate('jwt'), 
   authorize(['admin']), 
   (req, res) => {
     res.json({ message: 'Admin access granted' });
   }
 );
 
 //multi-role route
 router.get('/moderator-admin', 
   authenticate('jwt'), 
   authorize(['admin', 'moderator']), 
   (req, res) => {
     res.json({ message: 'Moderator or Admin access granted' });
   }
 );
export default router;