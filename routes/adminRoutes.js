const express = require('express');
const adminController = require('../controllers/adminController');
const connectEnsureLogin = require('connect-ensure-login');

const router = express.Router();

router.get('/admindashboard', connectEnsureLogin.ensureLoggedIn(), adminController.getAdminDashboard);
router.post('/create-event', connectEnsureLogin.ensureLoggedIn(), adminController.createEvent);

// Similar for edit and delete routes.

module.exports = router;
