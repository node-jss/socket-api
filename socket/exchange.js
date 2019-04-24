// 'use strict';
const Ticker = require('../models/ticker');
const IcoSum = require('../models/icosum');
const request = require('request');
const mongoose = require('mongoose');

function onDisconnect(socket) {
}

function onConnect(socket,io) {
 
	socket.on('info', function (data) {
		console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
	});
	
	require('../models/exchange/orderbuy').infoSocket(socket, io);
	require('../models/exchange/ordersell').infoSocket(socket, io);
	require('../models/exchange/markethistory').infoSocket(socket, io);
	require('../models/exchange/volume').infoSocket(socket, io);
	require('../rabitmq/exchange').infoSocket(socket, io);
	require('../rabitmq/exchange_process').infoSocket(socket, io);
}

module.exports = function (io) {
  	
  	io.on('connection', function (socket) {
	    socket.on('disconnect', function () {
	      	onDisconnect(socket);
	    });

		    // Call onConnect.
	    onConnect(socket,io);
	    
  	});
};
