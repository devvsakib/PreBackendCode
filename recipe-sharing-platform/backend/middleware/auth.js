
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // Check if the request contains an authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    // Store the user and token on the request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
