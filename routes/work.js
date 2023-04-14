const express = require('express');
const router = express.Router();
const workController = require('../controllers/worktaskController');

/* http://localhost:3000/work/ */
router.get('/', workController.index);

/* http://localhost:3000/work/job */
router.get('/job', workController.job);

/* http://localhost:3000/work/:id */
router.get('/:id', workController.getWorkWithJob);

/* http://localhost:3000/work/ */
router.post('/', workController.insert);

module.exports = router;