const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
  const userID = req.app.get('userId');
  if (!userID) {
    res.redirect('/user/no-permission');
  } else {
    next();
  }
}

router.get('/logged', isLogged, (req, res) => {
  res.render('logged', { name: req.user.displayName, picture: req.user.photos[0].value });
});

router.get('/profile', isLogged, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  res.render('settings');
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

module.exports = router;