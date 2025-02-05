const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      role,
    });
    res.redirect('/auth/signin');
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send('Internal server error');
  }
};

exports.signin = passport.authenticate('local', {
  failureRedirect: '/auth/signin',
  failureFlash: true,
}), (req, res) => {
  if (req.user.role === 'admin') {
    res.redirect('/admin/admindashboard');
  } else if (req.user.role === 'player') {
    res.redirect('/player/playerdashboard');
  } else {
    res.status(403).send('Unauthorized');
  }
};
