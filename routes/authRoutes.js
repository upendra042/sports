const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/signup', (req, res) => res.render('signup', { csrfToken: req.csrfToken() }));
router.post('/signup', authController.signup);

router.get('/signin', (req, res) => res.render('login', { csrfToken: req.csrfToken() }));
router.post('/signin', authController.signin);

module.exports = router;
