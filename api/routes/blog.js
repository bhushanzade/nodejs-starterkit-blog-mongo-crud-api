'use strict';

var express = require('express'),
  router = express.Router();
const auth = require('../middleware/auth');

let blogController = require('../controller/blog');

// GET

router.get('', auth, blogController.allBlogs);
router.get('/search', blogController.allBlogs);
router.get('/:slug', auth, blogController.getBlogBySlug);

// POST
router.post('/create', auth, blogController.create);


// PUT
router.put('/update/:slug', auth, blogController.update);


// DLETE
router.delete('/delete/:slug', auth, blogController.deleteBySlug);


module.exports = router;