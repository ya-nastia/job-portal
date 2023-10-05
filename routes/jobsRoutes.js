import express from 'express';
import { 
  createJobController, 
  getAllJobsController,
  updateJobController,
  deleteJobController,
} from '../controllers/jobsController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-job', userAuth, createJobController);

router.get('/get-jobs', userAuth, getAllJobsController);

router.patch('/update-job/:id', userAuth, updateJobController);

router.delete('/delete-job/:id', userAuth, deleteJobController);

export default router;