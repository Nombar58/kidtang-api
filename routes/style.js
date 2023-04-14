const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

/* http://localhost:3000/style/ */
router.get('/' ,styleController.index);

/* get by id */
/* http://localhost:3000/style/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', styleController.show);

/* http://localhost:3000/style/ */
router.post('/', styleController.insert);

/* http://localhost:3000/style/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', styleController.destroy);

/* http://localhost:3000/style/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', styleController.update);

module.exports = router;