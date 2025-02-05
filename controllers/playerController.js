const { Event, PlayerEvent } = require('../models');

exports.getPlayerDashboard = async (req, res) => {
  try {
    const events = await Event.findAll();
    const joinedEvents = await PlayerEvent.findAll({ where: { playerId: req.user.id } });
    const joinedEventIds = joinedEvents.map(je => je.eventId);

    res.render('playerdashboard', { events, joinedEventIds, csrfToken: req.csrfToken(), User: req.user });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).send('Internal server error');
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const playerEventExists = await PlayerEvent.findOne({ where: { playerId: req.user.id, eventId: id } });
    if (playerEventExists) {
      return res.status(400).send('Already joined this event');
    }

    await PlayerEvent.create({ playerId: req.user.id, eventId: id });
    res.redirect('/player/playerdashboard');
  } catch (error) {
    console.error('Error joining event:', error.message);
    res.status(500).send('Internal server error');
  }
};

exports.unjoinEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const playerEvent = await PlayerEvent.findOne({ where: { playerId: req.user.id, eventId: id } });

    if (!playerEvent) {
      return res.status(404).send('Not joined in this event');
    }

    await playerEvent.destroy();
    res.redirect('/player/playerdashboard');
  } catch (error) {
    console.error('Error unjoining event:', error.message);
    res.status(500).send('Internal server error');
  }
};
