const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateAuthPayload } = require('../utils/validation');

const register = async (req, res) => {
  try {
    const validation = validateAuthPayload(req.body, { requireUsername: true });
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const { username, email, password } = validation.value;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'An account with that email or username already exists.' });
    }

    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create account right now.' });
  }
};

const login = async (req, res) => {
  try {
    const validation = validateAuthPayload(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const { email, password } = validation.value;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ error: 'Unable to log in right now.' });
  }
};

module.exports = { register, login };
