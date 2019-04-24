'use strict'

const mongoose = require('mongoose');
const service = require('../services');
const moment = require('moment');
const _ = require('lodash');
const Ticker = require('../models/ticker').module();
const config = require('../config');
var info = {
    socket: null,
    io: null,
    get sockets() {
        return {
        	socket : this.socket,
        	io : this.io
        };
    },
    set sockets (infoSocket) {
        this.socket = infoSocket[0] || null;
        this.io = infoSocket[1] || null;
    }
}

const binance = require('node-binance-api')().options({
  APIKEY: config.APIKEY_BINANCE,
  APISECRET: config.APISECRET_BINANCE,
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
var data_update;
setTimeout(function() {
	binance.websockets.prevDay(['BTCUSDT','ETHUSDT','LTCUSDT','DASHUSDT','XRPUSDT','EOSUSDT','TUSDUSDT'], (error, response) => {
	  	//console.log("%"+response.symbol+" :"+response.priceChange);
	  	if (response.symbol == 'BTCUSDT')
	  		data_update = {$set : {'btc_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'ETHUSDT')
	  		data_update = {$set : {'eth_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'LTCUSDT')
	  		data_update = {$set : {'ltc_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'DASHUSDT')
	  		data_update = {$set : {'dash_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'XRPUSDT')
	  		data_update = {$set : {'xrp_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'EOSUSDT')
	  		data_update = {$set : {'eos_change': parseFloat(response.priceChange)}};
	  	if (response.symbol == 'USDTTUSD')
	  		data_update = {$set : {'usdt_change': parseFloat(response.priceChange)}};
	  	Ticker.update({},data_update,(err,responses)=>{
		})
	});

	binance.websockets.trades(['BTCUSDT','ETHUSDT','LTCUSDT','DASHUSDT','XRPUSDT','EOSUSDT','TUSDUSDT'], (trades) => {
	  	//console.log("USD "+trades.s+" : "+trades.p);
	  	if (trades.s == 'BTCUSDT')
	  		data_update = {$set : {'btc_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'ETHUSDT')
	  		data_update = {$set : {'eth_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'LTCUSDT')
	  		data_update = {$set : {'ltc_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'DASHUSDT')
	  		data_update = {$set : {'dash_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'XRPUSDT')
	  		data_update = {$set : {'xrp_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'EOSUSDT')
	  		data_update = {$set : {'eos_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'USDTTUSD')
	  		data_update = {$set : {'usdt_usd': parseFloat(trades.p)}};

	  	Ticker.update({},data_update,(err,responses)=>{
		})

	});
}, 6000);



/*function process_buy_exchange(){
	console.log("1231231");
	
}

setTimeout(function() {
	info.socket.socket.emit('info', '12312312');
	info.sockets.socket.broadcast.emit('info', '12312312')
}, 15000);
*/


return module.exports = {
	infoSocket : function(socket, io){
		info.sockets = [socket, io];
	},
	module : function(){
		return {
			process_buy_exchange
		}
	}
}