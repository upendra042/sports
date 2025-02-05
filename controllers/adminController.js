const { Event } = require('../models');

exports.getAdminDashboard = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { adminId: req.user.id } });
    res.render('admindashboard', { events, csrfToken: req.csrfToken(), User: req.user });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).send('Internal server error');
  }
};

exports.createEvent = async (req, res) => {
  const { title, date, time, venue, team_limit, description } = req.body;

  try {
    const event = await Event.create({
      title,
      date,
      time,
      venue,
      team_limit,
      description,
      adminId: req.user.id,
    });
    res.redirect('/admin/admindashboard');
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).send('Internal server error');
  }
};

// Similar updates for editing and deleting events.
