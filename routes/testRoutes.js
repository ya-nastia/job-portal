import express from 'express';
import { testPostController } from '../controllers/testController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/test/test-post:
 *   post:
 *     summary: Test Post Route
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: John
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Your name is John"
 *       500:
 *         description: Internal Server Error
 */

router.post('/test-post', userAuth, testPostController);

export default router;