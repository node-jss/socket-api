'use strict'

const mongoose = require('mongoose');
const service = require('../services');
const moment = require('moment');
const _ = require('lodash');
const Ticker = require('../models/ticker').module();
const Transaction = require('../models/transaction').module();
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
	binance.websockets.prevDay(false, (error, response) => {
	  	
	  	if (response.symbol == 'BTCUSDT')
	  		data_update = {$set : {'btc_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'ETHUSDT')
	  		data_update = {$set : {'eth_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'LTCUSDT')
	  		data_update = {$set : {'ltc_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'DASHUSDT')
	  		data_update = {$set : {'dash_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'XRPUSDT')
	  		data_update = {$set : {'xrp_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'EOSUSDT')
	  		data_update = {$set : {'eos_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'TUSDUSDT')
	  		data_update = {$set : {'usdt_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})
	  	if (response.symbol == 'BCHABCUSDT')
	  		data_update = {$set : {'bch_change': parseFloat(response.percentChange)}};
	  		Ticker.update({},data_update,(err,responses)=>{
			})

	  	if (response.symbol == 'ETHBTC')
		{
			data_update = {$set : {
				'btc.eth.vol': parseFloat(response.quoteVolume),
				'btc.eth.price': parseFloat(response.bestAsk),
				'btc.eth.change': parseFloat(response.percentChange),
				'btc.eth.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'EOSBTC')
		{
			data_update = {$set : {
				'btc.eos.vol': parseFloat(response.quoteVolume),
				'btc.eos.price': parseFloat(response.bestAsk),
				'btc.eos.change': parseFloat(response.percentChange),
				'btc.eos.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'XLMBTC')
		{
			data_update = {$set : {
				'btc.xlm.vol': parseFloat(response.quoteVolume),
				'btc.xlm.price': parseFloat(response.bestAsk),
				'btc.xlm.change': parseFloat(response.percentChange),
				'btc.xlm.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'IOTABTC')
		{
			data_update = {$set : {
				'btc.iota.vol': parseFloat(response.quoteVolume),
				'btc.iota.price': parseFloat(response.bestAsk),
				'btc.iota.change': parseFloat(response.percentChange),
				'btc.iota.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'NANOBTC')
		{
			data_update = {$set : {
				'btc.nano.vol': parseFloat(response.quoteVolume),
				'btc.nano.price': parseFloat(response.bestAsk),
				'btc.nano.change': parseFloat(response.percentChange),
				'btc.nano.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'NEOBTC')
		{
			data_update = {$set : {
				'btc.neo.vol': parseFloat(response.quoteVolume),
				'btc.neo.price': parseFloat(response.bestAsk),
				'btc.neo.change': parseFloat(response.percentChange),
				'btc.neo.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'QTUMBTC')
		{
			data_update = {$set : {
				'btc.qtum.vol': parseFloat(response.quoteVolume),
				'btc.qtum.price': parseFloat(response.bestAsk),
				'btc.qtum.change': parseFloat(response.percentChange),
				'btc.qtum.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'DOGEBTC')
		{
			data_update = {$set : {
				'btc.doge.vol': parseFloat(response.quoteVolume),
				'btc.doge.price': parseFloat(response.bestAsk),
				'btc.doge.change': parseFloat(response.percentChange),
				'btc.doge.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'TNTBTC')
		{
			data_update = {$set : {
				'btc.tnt.vol': parseFloat(response.quoteVolume),
				'btc.tnt.price': parseFloat(response.bestAsk),
				'btc.tnt.change': parseFloat(response.percentChange),
				'btc.tnt.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'LTCBTC')
		{
			data_update = {$set : {
				'btc.ltc.vol': parseFloat(response.quoteVolume),
				'btc.ltc.price': parseFloat(response.bestAsk),
				'btc.ltc.change': parseFloat(response.percentChange),
				'btc.ltc.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'TRXBTC')
		{
			data_update = {$set : {
				'btc.trx.vol': parseFloat(response.quoteVolume),
				'btc.trx.price': parseFloat(response.bestAsk),
				'btc.trx.change': parseFloat(response.percentChange),
				'btc.trx.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'ADABTC')
		{
			data_update = {$set : {
				'btc.ada.vol': parseFloat(response.quoteVolume),
				'btc.ada.price': parseFloat(response.bestAsk),
				'btc.ada.change': parseFloat(response.percentChange),
				'btc.ada.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'FUNBTC')
		{
			data_update = {$set : {
				'btc.fun.vol': parseFloat(response.quoteVolume),
				'btc.fun.price': parseFloat(response.bestAsk),
				'btc.fun.change': parseFloat(response.percentChange),
				'btc.fun.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'BNBBTC')
		{
			data_update = {$set : {
				'btc.bnb.vol': parseFloat(response.quoteVolume),
				'btc.bnb.price': parseFloat(response.bestAsk),
				'btc.bnb.change': parseFloat(response.percentChange),
				'btc.bnb.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'XRPBTC')
		{
			data_update = {$set : {
				'btc.xrp.vol': parseFloat(response.quoteVolume),
				'btc.xrp.price': parseFloat(response.bestAsk),
				'btc.xrp.change': parseFloat(response.percentChange),
				'btc.xrp.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'ZECETH')
		{
			data_update = {$set : {
				'eth.zec.vol': parseFloat(response.quoteVolume),
				'eth.zec.price': parseFloat(response.bestAsk),
				'eth.zec.change': parseFloat(response.percentChange),
				'eth.zec.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'TNBETH')
		{
			data_update = {$set : {
				'eth.tnb.vol': parseFloat(response.quoteVolume),
				'eth.tnb.price': parseFloat(response.bestAsk),
				'eth.tnb.change': parseFloat(response.percentChange),
				'eth.tnb.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'MFTETH')
		{
			data_update = {$set : {
				'eth.mft.vol': parseFloat(response.quoteVolume),
				'eth.mft.price': parseFloat(response.bestAsk),
				'eth.mft.change': parseFloat(response.percentChange),
				'eth.mft.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'WTCETH')
		{
			data_update = {$set : {
				'eth.wtc.vol': parseFloat(response.quoteVolume),
				'eth.wtc.price': parseFloat(response.bestAsk),
				'eth.wtc.change': parseFloat(response.percentChange),
				'eth.wtc.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'LINKETH')
		{
			data_update = {$set : {
				'eth.link.vol': parseFloat(response.quoteVolume),
				'eth.link.price': parseFloat(response.bestAsk),
				'eth.link.change': parseFloat(response.percentChange),
				'eth.link.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'WAVESETH')
		{
			data_update = {$set : {
				'eth.waves.vol': parseFloat(response.quoteVolume),
				'eth.waves.price': parseFloat(response.bestAsk),
				'eth.waves.change': parseFloat(response.percentChange),
				'eth.waves.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'PPTETH')
		{
			data_update = {$set : {
				'eth.ppt.vol': parseFloat(response.quoteVolume),
				'eth.ppt.price': parseFloat(response.bestAsk),
				'eth.ppt.change': parseFloat(response.percentChange),
				'eth.ppt.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'LTCETH')
		{
			data_update = {$set : {
				'eth.ltc.vol': parseFloat(response.quoteVolume),
				'eth.ltc.price': parseFloat(response.bestAsk),
				'eth.ltc.change': parseFloat(response.percentChange),
				'eth.ltc.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'XLMETH')
		{
			data_update = {$set : {
				'eth.xlm.vol': parseFloat(response.quoteVolume),
				'eth.xlm.price': parseFloat(response.bestAsk),
				'eth.xlm.change': parseFloat(response.percentChange),
				'eth.xlm.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'KMDETH')
		{
			data_update = {$set : {
				'eth.kmd.vol': parseFloat(response.quoteVolume),
				'eth.kmd.price': parseFloat(response.bestAsk),
				'eth.kmd.change': parseFloat(response.percentChange),
				'eth.kmd.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'EOSETH')
		{
			data_update = {$set : {
				'eth.eos.vol': parseFloat(response.quoteVolume),
				'eth.eos.price': parseFloat(response.bestAsk),
				'eth.eos.change': parseFloat(response.percentChange),
				'eth.eos.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'TRXETH')
		{
			data_update = {$set : {
				'eth.trx.vol': parseFloat(response.quoteVolume),
				'eth.trx.price': parseFloat(response.bestAsk),
				'eth.trx.change': parseFloat(response.percentChange),
				'eth.trx.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}
		if (response.symbol == 'ADAETH')
		{
			data_update = {$set : {
				'eth.ada.vol': parseFloat(response.quoteVolume),
				'eth.ada.price': parseFloat(response.bestAsk),
				'eth.ada.change': parseFloat(response.percentChange),
				'eth.ada.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'BNBETH')
		{
			data_update = {$set : {
				'eth.bnb.vol': parseFloat(response.quoteVolume),
				'eth.bnb.price': parseFloat(response.bestAsk),
				'eth.bnb.change': parseFloat(response.percentChange),
				'eth.bnb.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

		if (response.symbol == 'XRPETH')
		{
			data_update = {$set : {
				'eth.xrp.vol': parseFloat(response.quoteVolume),
				'eth.xrp.price': parseFloat(response.bestAsk),
				'eth.xrp.change': parseFloat(response.percentChange),
				'eth.xrp.trade': parseFloat(response.numTrades),
			}};
			Transaction.update({},data_update,(err,responses)=>{
			})
			var data_socket = [response.symbol,parseFloat(response.quoteVolume),parseFloat(response.bestAsk),parseFloat(response.percentChange),parseFloat(response.numTrades)];
			info.sockets.socket.broadcast.emit('LoadTransaction', data_socket );
    		info.sockets.socket.emit('LoadTransaction', data_socket );
		}

	});

	binance.websockets.trades(['BTCUSDT','ETHUSDT','LTCUSDT','DASHUSDT','XRPUSDT','EOSUSDT','TUSDUSDT','BCHABCUSDT'], (trades) => {
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
	  	if (trades.s == 'TUSDUSDT')
	  		data_update = {$set : {'usdt_usd': parseFloat(trades.p)}};
	  	if (trades.s == 'BCHABCUSDT')
	  		data_update = {$set : {'bch_usd': parseFloat(trades.p)}};
	  	Ticker.update({},data_update,(err,responses)=>{
		})

	});

	/*binance.websockets.prevDay(false, (error, response) => {
		if (response.symbol == 'ETHBTC')
		{
			data_update = {$set : {
				'eth.btc.vol': parseFloat(trades.p),
				'eth.btc.price': parseFloat(trades.p),
				'eth.btc.change': parseFloat(trades.p),
				'eth.btc.trade': parseFloat(trades.p),
			}};
			console.log(response.quoteVolume,response.bestAsk,response.percentChange,response.numTrades	);
		}
	});*/

}, 6000);

const CAValidator = require('crypto-address-validator');

function CryptocurrencyAddressValidator(req, res){
	var wallet = req.params.wallet;
	var valid = CAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
	if(valid)
		return res.status(200).send({message: true})
	else
	    return res.status(200).send({message: false})
}


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
			
		}
	}
}