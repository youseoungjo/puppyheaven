const express = require('express');
const router = express.Router();
const mapController = require('../controller/mapController');

router.get('/geocode', mapController.getAddresses);

module.exports = router;