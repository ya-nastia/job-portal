import express from 'express';
import { 
  createJobController, 
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobStatsController,
} from '../controllers/jobsController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-job', userAuth, createJobController);

router.get('/get-jobs', userAuth, getAllJobsController);

router.patch('/update-job/:id', userAuth, updateJobController);

router.delete('/delete-job/:id', userAuth, deleteJobController);

router.get("/job-stats", userAuth, jobStatsController);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the job listing
 *           example: DHSASDHJDJHVAJDSVJAVSD
 *         company:
 *           type: string
 *           description: Company name
 *         position:
 *           type: string
 *           description: Job position
 *         status:
 *           type: string
 *           enum: [pending, reject, interview]
 *           description: Job status (pending, reject, interview)
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, contract]
 *           description: Type of work (full-time, part-time, internship, contract)
 *         workLocation:
 *           type: string
 *           description: Work location (city or country)
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the job listing
 *       example:
 *         _id: GDHJGD788BJBJ
 *         company: Some Company
 *         position: Software Engineer
 *         status: pending
 *         workType: full-time
 *         workLocation: Moscow
 *         createdBy: DHSASDHJDJHVAJDSVJAVSD
 */

/**
 *  @swagger
 *  tags:
 *    name: Job
 *    description: Job apis
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *             example:
 *               company: Some Company
 *               position: Software Engineer
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad Request - Please provide all fields
 *       401:
 *         description: Unauthorized - Auth Failed
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/job/get-jobs:
 *   get:
 *     summary: Get a list of jobs
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [all, pending, reject, interview]
 *         description: Filter jobs by status (optional)
 *       - in: query
 *         name: workType
 *         schema:
 *           type: string
 *           enum: [all, full-time, part-time, contract, freelance]
 *         description: Filter jobs by work type (optional)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for jobs by position (optional)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, oldest, a-z, z-a]
 *         description: Sort jobs (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page (optional)
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: integer
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 numOfPage:
 *                   type: integer
 *       401:
 *         description: Unauthorized - Auth Failed
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the job to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *             example:
 *               company: New Company Name
 *               position: Senior Software Engineer
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updateJob:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad Request - Please provide all fields
 *       401:
 *         description: Unauthorized - Auth Failed
 *       404:
 *         description: Job not found
 *       403:
 *         description: Forbidden - You are not authorized to update this job
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the job to be deleted
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Auth Failed
 *       404:
 *         description: Job not found
 *       403:
 *         description: Forbidden - You are not authorized to delete this job
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: integer
 *                 defaultStats:
 *                   type: object
 *                   properties:
 *                     pending:
 *                       type: integer
 *                     reject:
 *                       type: integer
 *                     interview:
 *                       type: integer
 *                 monthlyApplication:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       count:
 *                         type: integer
 *       401:
 *         description: Unauthorized - Auth Failed
 *       500:
 *         description: Internal Server Error
*/