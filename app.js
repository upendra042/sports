const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require('./db'); // PostgreSQL connection
require('dotenv').config(); // Load environment variables

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
    dialect: 'postgres', // or 'mysql' based on your setup
});

const Sport = sequelize.define('Sport', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Sport;

const app = express();

// Middleware to remove the 'Upgrade' header (optional)
app.use((req, res, next) => {
    res.removeHeader('Upgrade');
    next();
});

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Landing Page
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Sports Scheduler' });
});

// Signup Page
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Log In' });
});

// Admin Dashboard
app.get('/admindashboard', (req, res) => {
    res.render('adminDashboard', { title: 'Admin Dashboard' });
});
app.get('/play', (req,res) => {
    res.render('play', {title: 'Play'});
})
app.get('/admin', (req,res) => {
    res.render('admin', {title: 'Play'});
})
// Player Dashboard
app.get('/playerdashboard', async (req, res) => {
  res.render('playerdashboard', { title: 'Player Dashboard' });
  try {
        // Fetch sports data from the database
        const sports = await Sport.findAll(); // Assuming you are using Sequelize

        // Fetch player sessions (if required)
        const mySessions = []; // Replace with actual logic to fetch sessions
        const availableSessions = []; // Replace with actual logic to fetch available sessions

        //res.render('playerdashboard', { sports, mySessions, availableSessions });
    } catch (error) {
        console.error("Error fetching sports data:", error);
        res.status(500).send("Internal Server Error");
    }

});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  try {
      console.log('Signup attempt for email:', email); // Debug statement

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword); // Debug statement

      // Check if the user already exists
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log('Query result:', result.rows); // Debug statement

      if (result.rows.length > 0) {
          console.log('User   already exists in database'); // Debug statement
          return res.status(400).json({ error: 'User   already exists' });
      }

      // Insert user into the database
      const result2 = await pool.query(
          'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
          [email, hashedPassword, role]
      );
      console.log('User   added to database:', result2.rows[0]); // Debug statement
      //res.redirect('/login');

      res.status(201).json({ message: 'User   registered successfully!', user: result2.rows[0] });
  } catch (err) {
      console.error('Error during signup:', err); // Debug statement
      res.status(500).json({ error: 'Internal server error' });
  }
});

//Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt for email:', email); // Debug statement

        // Check if the user exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('Query result:', result.rows); // Debug statement

        if (result.rows.length === 0) {
            console.log('User not found in database'); // Debug statement
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        console.log('User details:', user); // Debug statement

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            console.log('Invalid password for user:', user.email); // Debug statement
            return res.status(400).json({ error: 'Invalid password' });
        }

        console.log('Login successful for user:', user.email); // Debug statement

        // Role-based redirection
        if (user.role === 'player') {
            console.log('Redirecting to player dashboard'); // Debug statement
            return res.redirect('/play');
        } else if (user.role === 'admin') {
            console.log('Redirecting to admin dashboard1'); // Debug statement
            return res.redirect('/admin');
        } else {
            console.log('Unknown role:', user.role); // Debug statement
            return res.status(400).json({ error: 'Invalid role' });
        }
    } catch (err) {
        console.error('Error during login:', err); // Debug statement
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Handle 404 Errors
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
