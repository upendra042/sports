const express = require('express');
const playerController = require('../controllers/playerController');
const connectEnsureLogin = require('connect-ensure-login');

const router = express.Router();

router.get('/playerdashboard', connectEnsureLogin.ensureLoggedIn(), playerController.getPlayerDashboard);
router.post('/join-event/:id', connectEnsureLogin.ensureLoggedIn(), playerController.joinEvent);
router.post('/unjoin-event/:id', connectEnsureLogin.ensureLoggedIn(), playerController.unjoinEvent);

module.exports = router;
