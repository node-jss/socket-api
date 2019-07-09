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
const Transactionchema = new Schema({
    'btc' : {
        'eth' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'xrp' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'bnb' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'ltc' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'eos' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'ada' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'fun' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'trx' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'xlm' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'doge' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         
         'neo' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'tnt' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'nano' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'iota' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'qtum' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        }
    },
    'eth' : {
        'waves' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'bnb' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'link' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'wtc' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'xrp' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'trx' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'ppt' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'eos' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'mft' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'kmd' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
        'ltc' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'ada' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'tnb' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'zec' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
         'xlm' : {
            'vol' : Number,
            'price' : Number,
            'change' : Number,
            'trade' : Number
        },
    }

}).post('update', function (doc) {
    var obj = this._update.$set;
    var result = Object.entries(obj)[0];
    
    /*info.sockets.socket.broadcast.emit('LoadTransaction', result );
    info.sockets.socket.emit('LoadTransaction', result );*/
    
})

return module.exports = {
    infoSocket : function(socket, io){
        info.sockets = [socket, io];
    },
    module : function(){
        return mongoose.model('Transaction', Transactionchema);
    }
}