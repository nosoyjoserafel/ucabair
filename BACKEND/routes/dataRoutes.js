const express = require('express');
const router = express.Router();
const { getData, postData } = require('../controllers/dataController');

//router.get('/', getData);

router.post('/submit-user', postData);

module.exports = router;