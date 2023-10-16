import express from 'express';
import rateLimit from 'express-rate-limit';
import { loginController, registerController } from '../controllers/authController.js';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7', 
	legacyHeaders: false,
});

const router = express.Router();

router.post('/register', limiter, registerController);

router.post('/login', limiter, loginController)

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        name:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User last name
 *        email:
 *          type: string
 *          description: User email address
 *        password:
 *          type: string
 *          description: User password should be greater then 6 characters
 *        location:
 *          type: string
 *          description: User city or country
 *      example:
 *        id: GDHJGD788BJBJ
 *        name: John
 *        lastName: Doe
 *        email: johndoe@gmail.com
 *        password: test@123
 *        location: Moscow
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: Authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: Register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: johndoe123
 *      responses:
 *        201:
 *          description: User created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: User created successfully
 *                  user:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: John
 *                      lastName:
 *                        type: string
 *                        example: Doe
 *                      email:
 *                        type: string
 *                        example: johndoe@gmail.com
 *                      location:
 *                        type: string
 *                        example: Russia
 *                  token:
 *                    type: string
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Login user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               email:
 *                 type: string
 *                 example: johndoe4@gmail.com
 *               password:
 *                 type: string
 *                 example: johndoe123
 *    responses:
 *      200:
 *        description: Login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: Login successfully
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                token:
 *                  type: string
 *      500:
 *        description: Internal server error
 */