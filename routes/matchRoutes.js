const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches', matchController.getMatches);
router.post('/matches', matchController.addMatch);

module.exports = router;
