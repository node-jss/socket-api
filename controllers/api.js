'use strict'

const mongoose = require('mongoose');
const service = require('../services');
const moment = require('moment');
const _ = require('lodash');
const Ticker = require('../models/ticker').module();
const config = require('../config');


const CAValidator = require('crypto-address-validator');

function CryptocurrencyAddressValidator(req, res){
	var wallet = req.query.wallet;
	var currency = req.query.currency;
	if (currency != 'TBT')
	{
		var valid = CAValidator.validate(wallet, currency);

		if(valid)
			return res.status(200).send({message: true})
		else
		    return res.status(200).send({message: false})
	}
	else
	{
		return res.status(200).send({message: true})
	}
}

module.exports = {
	CryptocurrencyAddressValidator
}