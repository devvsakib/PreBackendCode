const auth = require('../middleware/auth');

router.get('/dashboard', auth, (req, res) => {
  res.send('Welcome to your dashboard!');
});
