const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

/* http://localhost:3000/room/ */
router.get('/' ,roomController.index);

/* get by id */
/* http://localhost:3000/room/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', roomController.show);

/* http://localhost:3000/room/ */
router.post('/', roomController.insert);

/* http://localhost:3000/room/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', roomController.destroy);

/* http://localhost:3000/room/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', roomController.update);

module.exports = router;