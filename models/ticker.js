'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
const Tickerchema = new Schema({
    'btc_usd' : Number,
    'eth_usd' : Number,
    'bth_usd' : Number,
    'ltc_usd' : Number,
    'coin_usd' : Number,
    'xrp_usd' : Number,
    'dash_usd' : Number,
    'usdt_usd' : Number,
    'doge_usd' : Number,
    'bch_usd' : Number,

    'btc_change' : Number,
    'eth_change' : Number,
    'ltc_change' : Number,
    'eos_change' : Number,
    'dash_change' : Number,
    'usdt_change' : Number,
    'coin_change' : Number,
    'xrp_change' : Number,
    'doge_change' : Number,
    'bch_change' : Number

}).post('update', function (doc) {
    //console.log(this._update.$set);
    var obj = this._update.$set;
    var result = Object.entries(obj)[0];
    
    info.sockets.socket.broadcast.emit('LoadTicker', result );
    info.sockets.socket.emit('LoadTicker', result );
    
    
    
})

return module.exports = {
    infoSocket : function(socket, io){
        info.sockets = [socket, io];
    },
    module : function(){
        return mongoose.model('Ticker', Tickerchema);
    }
}