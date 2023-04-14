const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

/* http://localhost:3000/calendar/ */
router.get('/' ,calendarController.index);

/* get by id */
/* http://localhost:3000/calendar/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', calendarController.show);

/* http://localhost:3000/calendar/ */
router.post('/', calendarController.insert);

/* http://localhost:3000/calendar/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', calendarController.destroy);

/* http://localhost:3000/calendar/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', calendarController.update);

module.exports = router;