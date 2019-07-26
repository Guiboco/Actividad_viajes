var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Agencia de viajes' });
});


router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Agencia de viajes' });
});

router.get('/reenvio', function (req, res, next) {
  res.render('reenvio', { title: 'Agencia de viajes' });
});

router.get('/prueba', function (req, res, next) {
  res.send('esto es una prueba');
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Agencia de viajes' });
});

router.get('/recovery', function (req, res, next) {
  res.render('recovery', { title: 'Agencia de viajes' });
});


// router.get('/recoveryPass', function (req, res, next) {
//   res.render('recoveryPass', { title: 'Agencia de viajes' });
// });
// router.get('/submitPass', function (req, res, next) {
//   res.render('submitPass', { title: 'Agencia de viajes' });
// });

router.get('/success', function (req, res, next) {
  res.render('success', { title: 'Agencia de viajes' });
});

router.get('/profile', function (req, res, next) {
  res.render('profile', { title: 'Agencia de viajes' });
});

module.exports = router;
