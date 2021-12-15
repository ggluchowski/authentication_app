const express = require('express');
const passport = require('passport');
const router = express.Router();

// rozkaz przejscia na strone do autoryzacji Google, gdy klikniemy w link
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

// jesli uzytkownik prawidlowo sie zalogowal to strona na sukces, inaczej porazka
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    //https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
    req.app.set('userId', res.req.user);
    return res.redirect('/user/logged');
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;