const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

/* http://localhost:3000/invoice/ */
router.get('/' ,invoiceController.index);

/* http://localhost:3000/invoice/room */
router.get('/room', invoiceController.room);

/* http://localhost:3000/invoice/:id */
router.get('/:id', invoiceController.getInvoiceWithRoom);

/* http://localhost:3000/invoice/ */
router.post('/', invoiceController.insert);

/* http://localhost:3000/invoice/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', invoiceController.destroy);

/* http://localhost:3000/invoice/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', invoiceController.update);

module.exports = router;