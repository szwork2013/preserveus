'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.put('/:id', auth.isAuthenticated(), controller.update);


router.get('/:id', auth.isAuthenticated(), controller.show);


router.post('/', controller.create);
router.post('/mobile', controller.createMobile);

router.get('/activate/:id/:activationHash', controller.activate);

router.get('/profile/:id', auth.isAuthenticated(), controller.show);

router.get('/:id/profile', auth.isAuthenticated(), controller.profile);


module.exports = router;
