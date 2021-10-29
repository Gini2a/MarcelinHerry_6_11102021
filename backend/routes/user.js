const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const mdp = require('../middleware/mdp')


router.post('/signup', mdp, userCtrl.signup)
router.post('/login', userCtrl.login)



module.exports = router;