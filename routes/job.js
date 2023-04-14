const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/* http://localhost:3000/job/ */
router.get('/' ,jobController.index);

/* get by id */
/* http://localhost:3000/job/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', jobController.show);

/* http://localhost:3000/job/ */
router.post('/', jobController.insert);

/* http://localhost:3000/job/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', jobController.destroy);

/* http://localhost:3000/job/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', jobController.update);

module.exports = router;