const express = require('express');
const router = express.Router();
const roomTypeController = require('../controllers/roomTypeController');

/* http://localhost:3000/room/ */
router.get('/' ,roomTypeController.index);

/* get by id */
/* http://localhost:3000/room/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', roomTypeController.show);


module.exports = router;