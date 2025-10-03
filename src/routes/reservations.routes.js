const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservations.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);
router.delete('/:id', controller.remove);

module.exports = router;
