'use strict'

const express = require('express');
const request = require('request');

const crlSocket = require('../controllers/socket');
const crlApi = require('../controllers/api');

const router = express.Router();

router.get('/crypto-address-validator', crlApi.CryptocurrencyAddressValidator);

module.exports = router;