'use strict';

var express = require('express'),
  router = express.Router();

const auth = require('../middleware/auth');
let usercontroller = require('../controller/user');

// GET
router.get('/profile', auth, usercontroller.fakeUserProfile);

// POST
router.post('/login', usercontroller.fakeLoginApi);


// PUT


// DLETE


module.exports = router;