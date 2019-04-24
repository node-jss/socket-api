const amqp = require('amqplib/callback_api');
const project = require('./projectRabbitmq');
const Loginmq = require('./rabitmq/login');
const Exchangemq = require('./rabitmq/exchange').module();
const _ = require('lodash');
let amqpConn = null;

const config = require('./config');

const listWorker = ['STC','BTC','BCH','LTC','DASH',
                    'BCC','Withdraw_STC','Withdraw_BTC',
                    'Withdraw_BCH','Withdraw_LTC','Withdraw_DASH',
                    'Withdraw_BCC'
                    ];

function start() {
    
    amqp.connect(config.rabbit_link, function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });

        console.log("[AMQP] connected");
        amqpConn = conn;

        whenConnected();
    });
}

function whenConnected() {
    startPublisher();
    /*startWorker('EXC_STC', function(message, msg, ch) {
        project.process_deposit_bbl(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });
    startWorker('EXC_BTC', function(message, msg, ch) {
        project.process_deposit_btc(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });

    });
    startWorker('EXC_BCH', function(message, msg, ch) {
        project.process_deposit_bch(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });
    startWorker('EXC_LTC', function(message, msg, ch) {
        project.process_deposit_ltc(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });
    startWorker('EXC_DASH', function(message, msg, ch) {
        project.process_deposit_dash(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });
    startWorker('EXC_BCC', function(message, msg, ch) {
        project.process_deposit_bcc(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_XVG', function(message, msg, ch) {
        project.process_deposit_xvg(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_BTG', function(message, msg, ch) {
        project.process_deposit_btg(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_XZC', function(message, msg, ch) {
        project.process_deposit_xzc(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_SMART', function(message, msg, ch) {
        project.process_deposit_smart(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_LBC', function(message, msg, ch) {
        project.process_deposit_lbc(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_MONA', function(message, msg, ch) {
        project.process_deposit_mona(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_CUP', function(message, msg, ch) {
        project.process_deposit_cup(message, function(cb) {
             cb ? ch.ack(msg) : ch.ack(msg);
        });
        
    });

    startWorker('EXC_Withdraw_BTG', function(message, msg, ch) {
        project.process_withdraw('BTG',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_STC', function(message, msg, ch) {
        project.process_withdraw('STC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });
    startWorker('EXC_Withdraw_BTC', function(message, msg, ch) {
        project.process_withdraw('BTC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });
    startWorker('EXC_Withdraw_BCH', function(message, msg, ch) {
        project.process_withdraw('BCH',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        })
    });

    startWorker('EXC_Withdraw_LTC', function(message, msg, ch) {
        project.process_withdraw('LTC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        })
    });
    startWorker('EXC_Withdraw_DASH', function(message, msg, ch) {
        project.process_withdraw('DASH',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        })
    });
    startWorker('EXC_Withdraw_BCC', function(message, msg, ch) {
        project.process_withdraw('BCC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        })
    });

    startWorker('EXC_Withdraw_XVG', function(message, msg, ch) {
        project.process_withdraw('XVG',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_XZC', function(message, msg, ch) {
        project.process_withdraw('XZC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_ETH', function(message, msg, ch) {
        project.process_withdraw('ETH',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_SMART', function(message, msg, ch) {
        project.process_withdraw('SMART',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_LBC', function(message, msg, ch) {
        project.process_withdraw('LBC',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_MONA', function(message, msg, ch) {
        project.process_withdraw('MONA',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Withdraw_CUP', function(message, msg, ch) {
        project.process_withdraw('CUP',message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });


    startWorker('EXC_Remove_Withdraw', function(message, msg, ch) {
        project.process_remove_withdraw(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });


    startWorker('EXC_Remove_Order_Ico', function(message, msg, ch) {
        project.process_remove_order_ico(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Login_Rabit', function(message, msg, ch) {

        Loginmq.process_login_rabit(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Exchange_Buy', function(message, msg, ch) {

        Exchangemq.process_buy_exchange(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Exchange_Sell', function(message, msg, ch) {

        Exchangemq.process_sell_exchange(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });

    startWorker('EXC_Cancel_Exchange_Open', function(message, msg, ch) {

        Exchangemq.process_cancel_order_open(message, function(cb) {
            cb ? ch.ack(msg) : ch.ack(msg);
        });
    });*/
}

var pubChannel = null;
var offlinePubQueue = [];

function startPublisher() {

    amqpConn.createChannel(function(err, ch) {

        ch.assertQueue('EXC_LTC', {durable: true});
        ch.assertQueue('EXC_BTC', {durable: true});
        ch.assertQueue('EXC_STC', {durable: true});
        ch.assertQueue('EXC_BCC', {durable: true});
        ch.assertQueue('EXC_BCH', {durable: true});
        ch.assertQueue('EXC_DASH', {durable: true});
        ch.assertQueue('EXC_XVG', {durable: true});
        ch.assertQueue('EXC_BTG', {durable: true});
        ch.assertQueue('EXC_XZC', {durable: true});

        ch.assertQueue('EXC_SMART', {durable: true});
        ch.assertQueue('EXC_LBC', {durable: true});
        ch.assertQueue('EXC_MONA', {durable: true});
        ch.assertQueue('EXC_CUP', {durable: true});

        ch.assertQueue('EXC_Withdraw_BCC', {durable: true});
        ch.assertQueue('EXC_Withdraw_BCH', {durable: true});
        ch.assertQueue('EXC_Withdraw_BTC', {durable: true});
        ch.assertQueue('EXC_Withdraw_STC', {durable: true});
        ch.assertQueue('EXC_Withdraw_DASH', {durable: true});
        ch.assertQueue('EXC_Withdraw_LTC', {durable: true});
        ch.assertQueue('EXC_Withdraw_XVG', {durable: true});
        ch.assertQueue('EXC_Withdraw_BTG', {durable: true});
        ch.assertQueue('EXC_Withdraw_XZC', {durable: true});

        ch.assertQueue('EXC_Withdraw_SMART', {durable: true});
        ch.assertQueue('EXC_Withdraw_LBC', {durable: true});
        ch.assertQueue('EXC_Withdraw_MONA', {durable: true});
        ch.assertQueue('EXC_Withdraw_CUP', {durable: true});
        ch.assertQueue('EXC_Withdraw_ETH', {durable: true});
        ch.assertQueue('EXC_Remove_Withdraw', {durable: true});

        ch.assertQueue('EXC_Remove_Order_Ico', {durable: true});
        ch.assertQueue('EXC_Login_Rabit', {durable: true});
        ch.assertQueue('EXC_Exchange_Buy', {durable: true});
        ch.assertQueue('EXC_Exchange_Sell', {durable: true});

        ch.assertQueue('EXC_Cancel_Exchange_Open', {durable: true});
        amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
            var m = offlinePubQueue.shift();
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
    })
    
}

// method to publish a message, will queue messages internally if the connection is down and resend later
function publish(exchange, routingKey, content) {

    try {
        pubChannel.publish(exchange, routingKey, content, {
                persistent: true
            },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}

// A worker that acks messages only if processed succesfully
function startWorker(jobs, callback) {
    amqpConn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);

            

        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });
        ch.prefetch(1);
        ch.assertQueue("", {
            durable: true
        }, function(err, _ok) {
            if (closeOnErr(err)) return;
            ch.consume(jobs, function(msg) {
                callback(msg.content.toString(), msg, ch);


            }, {
                noAck: false
            });
            console.log("Worker " + jobs + " is started");
        });

    });
}


function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

module.exports = {
    start,
    publish
}