const { Match } = require('../models');

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.findAll();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMatch = async (req, res) => {
  try {
    const { team1, team2, date, location } = req.body;
    const newMatch = await Match.create({ team1, team2, date, location });
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
