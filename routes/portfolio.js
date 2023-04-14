const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

/* http://localhost:3000/portfolio/ */
router.get('/' ,portfolioController.index);

/* get by id */
/* http://localhost:3000/portfolio/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', portfolioController.show);

/* http://localhost:3000/portfolio/ */
router.post('/', portfolioController.insert);

/* http://localhost:3000/portfolio/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', portfolioController.destroy);

/* http://localhost:3000/portfolio/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', portfolioController.update);

module.exports = router;