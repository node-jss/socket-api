// 'use strict';

const request = require('request');
const mongoose = require('mongoose');

function onDisconnect(socket) {
}

function onConnect(socket,io) {
 	//console.log(io);
	socket.on('info', function (data) {
		console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
	});
	
	require('../models/ticker').infoSocket(socket, io);
	require('../models/transaction').infoSocket(socket, io);
	require('../controllers/socket').infoSocket(socket, io);
}

module.exports = function(io){
	io.on('connection', function (socket) {
		//console.log(socket);
	    socket.on('disconnect', function () {
	      	onDisconnect(socket);
	    });
		    // Call onConnect.
	    onConnect(socket,io);
	    
  	});

}