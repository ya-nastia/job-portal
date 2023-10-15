import express from 'express';
import { updateUserController, getUserController } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/update-user', userAuth, updateUserController);

router.post("/get-user", userAuth, getUserController);

export default router;

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: User apis
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               lastName:
 *                 type: string
 *               location:
 *                 type: string
 *             example:
 *               name: John
 *               email: johndoe@example.com
 *               lastName: Doe
 *               location: Moscow
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *             example:
 *               user:
 *                 id: GDHJGD788BJBJ
 *                 name: John
 *                 lastName: Doe
 *                 email: johndoe@example.com
 *                 location: Moscow
 *               token: <your-auth-token>
 *       400:
 *         description: Bad Request - Please provide all fields
 *       401:
 *         description: Unauthorized - Auth Failed
 *       500:
 *         description: Internal Server Error
 */