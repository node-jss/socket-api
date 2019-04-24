'use strict'
const mongoose = require('mongoose');
const User = require('./models/user');
const service = require('./services');
const moment = require('moment');
const bitcoin = require('bitcoin');
var config = require('./config');
const amqp = require('amqplib/callback_api');
const Deposit = require('./models/deposit');
const Order = require('./models/order');
const Withdraw = require('./models/withdraw');
var sendpulse = require("sendpulse-api");

var bcypher = require('blockcypher');
var bcapi = new bcypher('eth','main','0a3479e109804df88900d1c85dd6e1ac');

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/eth"));

var _ = require('lodash');

const STCclient = new bitcoin.Client({
    host: config.BBL.host,
    port: config.BBL.port,
    user: config.BBL.user,
    pass: config.BBL.pass,
    timeout: config.BBL.timeout
});

const XVGclient = new bitcoin.Client({
    host: config.XVG.host,
    port: config.XVG.port,
    user: config.XVG.user,
    pass: config.XVG.pass,
    timeout: config.XVG.timeout
});

const BTCclient = new bitcoin.Client({
    host: config.BTC.host,
    port: config.BTC.port,
    user: config.BTC.user,
    pass: config.BTC.pass,
    timeout: config.BTC.timeout
});

const BCHclient = new bitcoin.Client({
    host: config.BCH.host,
    port: config.BCH.port,
    user: config.BCH.user,
    pass: config.BCH.pass,
    timeout: config.BCH.timeout
});
const LTCclient = new bitcoin.Client({
    host: config.LTC.host,
    port: config.LTC.port,
    user: config.LTC.user,
    pass: config.LTC.pass,
    timeout: config.LTC.timeout
});

const DASHclient = new bitcoin.Client({
    host: config.DASH.host,
    port: config.DASH.port,
    user: config.DASH.user,
    pass: config.DASH.pass,
    timeout: config.DASH.timeout
});

const BCCclient = new bitcoin.Client({
    host: config.BCC.host,
    port: config.BCC.port,
    user: config.BCC.user,
    pass: config.BCC.pass,
    timeout: config.BCC.timeout
});

const BTGclient = new bitcoin.Client({
    host: config.BTG.host,
    port: config.BTG.port,
    user: config.BTG.user,
    pass: config.BTG.pass,
    timeout: config.BTG.timeout
});

const XZCclient = new bitcoin.Client({
    host: config.XZC.host,
    port: config.XZC.port,
    user: config.XZC.user,
    pass: config.XZC.pass,
    timeout: config.XZC.timeout
});
const SMARTclient = new bitcoin.Client({
    host: config.SMART.host,
    port: config.SMART.port,
    user: config.SMART.user,
    pass: config.SMART.pass,
    timeout: config.SMART.timeout
});

const LBCclient = new bitcoin.Client({
    host: config.LBC.host,
    port: config.LBC.port,
    user: config.LBC.user,
    pass: config.LBC.pass,
    timeout: config.LBC.timeout
});

const MONAclient = new bitcoin.Client({
    host: config.MONA.host,
    port: config.MONA.port,
    user: config.MONA.user,
    pass: config.MONA.pass,
    timeout: config.MONA.timeout
});

const CUPclient = new bitcoin.Client({
    host: config.CUP.host,
    port: config.CUP.port,
    user: config.CUP.user,
    pass: config.CUP.pass,
    timeout: config.CUP.timeout
});
var getUser = function(id_user,callback){
    User.findById(id_user, function(err, user) {
        err || !user ? callback(null) : callback(user);
    });
}

var Create_Withdraw = function(name,user,amount,address,fee,callback){
    let newWithdraw = new Withdraw();   
    var today = moment();
    newWithdraw.amount = amount;
    newWithdraw.user_id = user._id;
    newWithdraw.status = 0;
    newWithdraw.username = user.displayName;
    newWithdraw.wallet = address;
    newWithdraw.txid = '';
    newWithdraw.fee = fee;
    newWithdraw.date = moment(today).format();
    newWithdraw.type = name;
    newWithdraw.save((err, WithdrawStored)=>{
        err ? callback(false) : callback(true);
    });
}

var update_balace = function(name , new_ast_balance,user_id,callback){

    var obj = null;
    if (name === 'BTC') obj =  { 'balance.bitcoin_wallet.available': parseFloat(new_ast_balance) }
    if (name === 'BCH') obj =  {'balance.bitcoincash_wallet.available' : parseFloat(new_ast_balance)};
    if (name === 'BCC') obj = {'balance.bitconnect_wallet.available' : parseFloat(new_ast_balance)};
    if (name === 'LTC') obj = {'balance.litecoin_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'STC') obj = {'balance.coin_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'DASH') obj = {'balance.dashcoin_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'XVG') obj = {'balance.verge_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'BTG') obj = {'balance.bitcoingold_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'XZC') obj = {'balance.zcoin_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'ETH') obj = {'balance.ethereum_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'SMART') obj = {'balance.smartcash_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'LBC') obj = {'balance.lbrycredits_wallet.available': parseFloat(new_ast_balance)};
    if (name === 'MONA') obj = {'balance.monacoin_wallet.available': parseFloat(new_ast_balance)};

    if (name === 'CUP') obj = {'balance.cupcoin_wallet.available': parseFloat(new_ast_balance)};


    User.update({ _id :user_id }, { $set : obj }, function(err, UsersUpdate){
        err ? callback(false) : callback(true);
    });
}

function process_withdraw(name, string_receiverabit,callback){

    var build_String = string_receiverabit.split("_");
    var id_user = build_String[0];
    var amount = parseFloat(build_String[1]);
    var address = build_String[2];
    var numWallet = null;
    var free = 0

    getUser(id_user,function(user){

        if (user) {
            if (name === 'BTC') { numWallet = user.balance.bitcoin_wallet.available ,  free = 100000  };
            if (name === 'BCH') { numWallet = user.balance.bitcoincash_wallet.available ,  free = 100000 };
            if (name === 'BCC') { numWallet = user.balance.bitconnect_wallet.available ,  free = 100000 };
            if (name === 'LTC') { numWallet = user.balance.litecoin_wallet.available ,  free = 1000000 };
            if (name === 'STC') { numWallet = user.balance.coin_wallet.available ,  free = 100000 };
            if (name === 'XVG') { numWallet = user.balance.verge_wallet.available ,  free = 20000000 };
            if (name === 'DASH') { numWallet = user.balance.dashcoin_wallet.available ,  free = 200000 };
            if (name === 'BTG') { numWallet = user.balance.bitcoingold_wallet.available ,  free = 100000 };
            if (name === 'XZC') { numWallet = user.balance.zcoin_wallet.available ,  free = 2000000 };
            if (name === 'ETH') { numWallet = user.balance.ethereum_wallet.available ,  free = 200000 };
            
            if (name === 'SMART') { numWallet = user.balance.smartcash_wallet.available ,  free = 200000 };
            if (name === 'LBC') { numWallet = user.balance.lbrycredits_wallet.available ,  free = 200000 };
            if (name === 'MONA') { numWallet = user.balance.monacoin_wallet.available ,  free = 200000 };

            if (name === 'CUP') { numWallet = user.balance.cupcoin_wallet.available ,  free = 100000 };
            var ast_balance = parseFloat(numWallet);
            if (parseFloat(ast_balance) < parseFloat(amount)+ parseFloat(free)) {


                callback(false);
            }
            else{
                Create_Withdraw(name,user,amount,address,free,function(cb){
                    if (cb){
                        var new_ast_balance = (parseFloat(ast_balance) - parseFloat(amount) - parseFloat(free)).toFixed(8);
                        update_balace(name, new_ast_balance,user._id,function(calb){
                            calb ? callback(true) : callback(false);
                        })
                    }
                    else{
                        callback(false);
                    }
                })
            }
        }
        else {
            callback(false);
        }
    });
};

var newDepositObj = function(data, amount, address, tx ,name){
    var today = moment();

    return new Deposit({
        "user_id" : data._id,
        "amount" : amount*100000000,
        "confirm" : 0,
        "username" : data.displayName,
        "wallet" : address,
        "txid" : tx,
        "type" : name,
        "date" : moment(today).format(),
        "status" : 0
    })
}   

var getNameCoin = function(name, address){
    if (name === 'BCH') return {'balance.bitcoincash_wallet.cryptoaddress' : address};
    if (name === 'BTC') return {'balance.bitcoin_wallet.cryptoaddress': address};
    if (name === 'BCC') return {'balance.bitconnect_wallet.cryptoaddress' : address};
    if (name === 'LTC') return {'balance.litecoin_wallet.cryptoaddress': address};
    if (name === 'STC') return {'balance.coin_wallet.cryptoaddress': address};
    if (name === 'DASH') return {'balance.dashcoin_wallet.cryptoaddress': address};
    if (name === 'XVG') return {'balance.verge_wallet.cryptoaddress': address};
    if (name === 'BTG') return {'balance.bitcoingold_wallet.cryptoaddress': address};
    if (name === 'XZC') return {'balance.zcoin_wallet.cryptoaddress': address};
    if (name === 'ETH') return {'balance.ethereum_wallet.cryptoaddress': address};

    if (name === 'SMART') return {'balance.smartcash_wallet.cryptoaddress': address};
    if (name === 'LBC') return {'balance.lbrycredits_wallet.cryptoaddress': address};
    if (name === 'MONA') return {'balance.monacoin_wallet.cryptoaddress': address};
    if (name === 'CUP') return {'balance.cupcoin_wallet.cryptoaddress': address};
    return {'balance.dashcoin_wallet.cryptoaddress' : 'sdkjafhkjarthyiuertyiury'}
}

var fnFindAddress = function(name, amount, address,tx ,callback){
    
    User.findOne(
        getNameCoin(name,address)
    ,function (err, data) {

        err || !data ? callback(false) : (
            name == 'BTC' && checkF1refferal(data),
            newDepositObj(data, amount, address, tx, name).save(( err, DepositStored)=>{

                sendmail_deposit(data._id,address,amount,name,tx,function(cbb){
                    console.log(cbb);
                });
                
                err ? callback(false) : callback(true)
            })
        );
    });
}

var checkF1refferal = function(users){
    console.log(users.p_node,'STC',500000000);
    Deposit.count({
        $and : [
        {'user_id' : users._id}, 
        { 'type': 'BTC' }]
    }, (err, sum) => {
        if (!err && sum == 0)
        {

            update_wallet_user(users.p_node,'STC',500000000);
        }
    });
}

function update_wallet_user(user_id,wallet,amount){
    
    get_balance(wallet,user_id,function(available){
        var new_ast_balance = parseFloat(available) + parseFloat(amount);
        update_balace(wallet , new_ast_balance,user_id,function(cb){
            
        })
    })
        
}

var checkTxdepo = function(name, tx, callback){
    Deposit.count({
        $and : [
        {'txid' : tx}, 
        { 'type': name }]
    }, (err, sum) => {
        err || sum > 0 ? callback(false) : callback(true);
    });
}

var getTransaction = function(client , tx, callback){
    client.getTransaction(tx, function (err, transaction) {
        err || !transaction ? callback(null) : callback(transaction);
    })
}


var process_deposit = function(name, client, tx ,callback){

    var details = null;
    getTransaction (client, tx, function(transaction){
        transaction !== null ? (
            
            details = transaction.details.filter(function (self) {
                return self.category === 'receive'
            }),

            details.length > 0 ? (
                checkTxdepo(name, tx, function(check){
                    console.log(check);
                    check ? _.forEach(details, function(value,index ){
                        console.log(value.amount , value.address);
                        fnFindAddress(name, value.amount, value.address, tx, function(cb){

                            details.length - 1 === index && callback(true) ;
                            
                        })

                    }) : callback(true);
                })
            ) : callback(false)
        ) : callback(false)
    });         
};

var get_balance =function(name,user_id,callback){
    var balance = 0;
    User.findOne({'_id' : user_id},(err,data)=>{
        (!err && data)? (
            name === 'BTC' && callback(data.balance.bitcoin_wallet.available),
            name === 'BCH' && callback(data.balance.bitcoincash_wallet.available),
            name === 'BCC' && callback(data.balance.bitconnect_wallet.available),
            name === 'LTC' && callback(data.balance.litecoin_wallet.available),
            name === 'STC' && callback(data.balance.coin_wallet.available),
            name === 'DASH' && callback(data.balance.dashcoin_wallet.available),
            name === 'XVG' && callback(data.balance.verge_wallet.available),
            name === 'BTG' && callback(data.balance.bitcoingold_wallet.available),
            name === 'XZC' && callback(data.balance.zcoin_wallet.available),
            name === 'ETH' && callback(data.balance.ethereum_wallet.available),

            name === 'SMART' && callback(data.balance.smartcash_wallet.available),
            name === 'LBC' && callback(data.balance.lbrycredits_wallet.available),
            name === 'MONA' && callback(data.balance.monacoin_wallet.available),
            name === 'CUP' && callback(data.balance.cupcoin_wallet.available)
        ) : callback (balance) 
    })
}

function process_remove_withdraw(string_receiverabit,callback){
    var id_withdraw = string_receiverabit;
    Withdraw.findOne(
    { $and : [{_id : id_withdraw},{status : 0}]},(err,data)=>{
        var query;
        var data_update;
        err || ! data ? (
            callback(false)
        ) :
        (
            query = {_id:id_withdraw},
            data_update = {
                $set : {
                    'status': 8
                }
            },
            Withdraw.update(query, data_update, function(err, Users){
                !err ? (
                    get_balance(data.type,data.user_id,function(ast_balance){
                        var new_ast_balance = (parseFloat(ast_balance) + parseFloat(data.amount) + parseFloat(data.fee)).toFixed(8);
                        update_balace(data.type , new_ast_balance,data.user_id,function(cb){
                            cb ? callback(true) : callback(false)
                        })
                    })
                ) : callback(false)
            })
        )
    });
}

function process_remove_ico(order_id,callback){
    
    Order.findOne(
    { $and : [{_id : order_id},{status : 0}]},(err,data)=>{
        var query;
        var data_update;
        console.log(data);
        err || ! data ? (
            callback(false)
        ) :
        (
            query = {_id:order_id},
            data_update = {
                $set : {
                    'status': 3
                }
            },
            
            Order.update(query, data_update, function(err, Users){
                !err ? (
                    get_balance(data.method_payment,data.user_id,function(ast_balance){
                        var new_ast_balance = (parseFloat(ast_balance) + parseFloat(data.amount_payment)).toFixed(8);
                        update_balace(data.method_payment , new_ast_balance,data.user_id,function(cb){
                            cb ? callback(true) : callback(false)
                        })
                    })
                ) : callback(false)
            })
        )
    });
}
function process_deposit_eth(req, res){
    var dataCb = req.body;
    
    console.log(dataCb);
    console.log("11111111111111111111111");
    var eth_outputs = dataCb.outputs;
    var amountETH= eth_outputs[0].value;
    var valueE = web3.fromWei(amountETH, 'ether');
    console.log(valueE);
    var tx = dataCb.hash;
    console.log(tx);
    checkTxdepo('ETH', tx, function(check){
        console.log(check);
        var arrAddress = eth_outputs[0].addresses[0];
        check ? (
            fnFindAddress('ETH', valueE, '0x'+arrAddress, tx, function(cb){
                res.status(200).send('complete')
            })
        ): res.status(200).send('error')
    })
}

function process_deposit_bbl(tx , callback){
    process_deposit('STC', STCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}


function process_deposit_btc(tx,callback){
    process_deposit('BTC', BTCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_bch(tx , callback){
    process_deposit('BCH', BCHclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_ltc(tx , callback){
    process_deposit('LTC', LTCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_btg(tx , callback){
    process_deposit('BTG', BTGclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_dash(tx , callback){
    process_deposit('DASH', DASHclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_bcc(tx , callback){
    process_deposit('BCC', BCCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_xvg(tx , callback){
    process_deposit('XVG', XVGclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_xzc(tx , callback){
    process_deposit('XZC', XZCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_smart(tx , callback){
    process_deposit('SMART', SMARTclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_lbc(tx , callback){
    process_deposit('LBC', LBCclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_deposit_mona(tx , callback){
    process_deposit('MONA', MONAclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}


function process_deposit_cup(tx , callback){
    process_deposit('CUP', CUPclient , tx, function(cb){
        cb ? callback(true) : callback(false)
    });
}

function process_remove_order_ico(id_order , callback){
    process_remove_ico(id_order, function(cb){
        cb ? callback(true) : callback(false)
    });
}

const sendmail_deposit = function (user_id,wallet,amount,type,txid,callback){
    User.findOne({'_id' : user_id},(err,user)=>{
        /*var API_USER_ID= "e0690653db25307c9e049d9eb26e6365"
        var API_SECRET= "3d7ebbb8a236cce656f8042248fc536e"
        var TOKEN_STORAGE="/tmp/"
        sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE);
        const answerGetter = function answerGetter(data){
            console.log(data);
        }
        var today = moment();

        var content = '<h2 style="margin: 0;margin-top: 10px;">Bitbeeline Deposit</h2>';
        content += '<p style="margin: 0;margin-top: 20px; font-size: 14px">Dear '+user.displayName+'</p>';
        content += '<p style="margin: 0;margin-top: 10px;font-size: 14px">Your request to deposit '+amount+' '+type+' to '+wallet+' being processed.</p>';
        content += '<p style="margin: 0;margin-top: 10px;font-size: 14px">Deposit Time: '+moment(today).format('MM/DD/YYYY LT')+'</p>';
        content += '<p style="margin: 0;margin-top: 10px;font-size: 14px">TxID: '+txid+'</p>';
        content += '<br/>';
        content += '<p style="margin: 0;margin-top: 10px;font-size: 14px;">Regards</p>';
        content += '<p style="margin: 0;margin-top: 10px;font-size: 14px;">Bitbeeline Support</p>';
        
        var html = '<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="x-apple-disable-message-reformatting"> <title></title> <style> html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } div[style*="margin: 16px 0"] { margin: 0 !important; } table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } img { -ms-interpolation-mode:bicubic; } *[x-apple-data-detectors], .x-gmail-data-detectors, .x-gmail-data-detectors *, .aBn { border-bottom: 0 !important; cursor: default !important; color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .a6S { display: none !important; opacity: 0.01 !important; } img.g-img + div { display: none !important; } .button-link { text-decoration: none !important; } </style> <style> .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } @media screen and (max-width: 600px) { .email-container p { font-size: 17px !important; line-height: 22px !important; } } </style> </head> <body width="100%" bgcolor="#222222" style="margin: 0;     padding: 30px 0;mso-line-height-rule: exactly;"> <center style="width: 100%; background: #222222; text-align: left;"> <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> </div> <div style="max-width: 600px; margin: auto;margin-top: 20px;" class="email-container"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#00A2F2" align="center"> <img src="https://bitbeeline.co/assets/img/logo.png" width="120" height="" alt="alt_text" border="0" align="center" style="width: 15%; min-width: 120px; max-width: 200px; height: auto; background: #00A2F2; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; margin: auto;" class="g-img"> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr><td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">';
        html += content;
        html += '</td> </tr> </table> </td> </tr></tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;"> <p style="margin: 0;">You received this message because you registered an account and accepted to use our services. Thank you</p> </td> </tr> </table> </td> </tr> </table> <table style="table-layout:fixed;width:100%;margin:0 auto;background-color:#fff; margin-top: 20px;padding: 20px;"> <tbody> <tr style="color:#799eb2; padding: 20px;"> <td style="text-align:left;padding-top:30px; padding-left: 40px">Get Bitbeeline on your phone</td> <td style="text-align:right;padding-top:30px;padding-right: 40px">Follow our updates</td> </tr> <tr> <td style="text-align:left;padding-left: 40px"> <a href="https://bitbeeline.co" style="text-decoration:none"> <img style="width:97px;padding-right:5px" src="https://ci4.googleusercontent.com/proxy/_WaQMacvsKYTJOOGhioMR8OF_BU2S8Zym04san2sSmT62yfAPXDPLCkPttHDl1D4cINvDg=s0-d-e1-ft#http://i.imgur.com/NLjQwKZ.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> <a href="https://bitbeeline.co" style="text-decoration:none"> <img style="width:97px;padding-right:5px" src="https://ci6.googleusercontent.com/proxy/PdRspPI2qeGPVehi1uAs-ySzy0eDR9_NgrkyvGE0GEyqpZfn8t8gv2jjm5wWp5WBi1cTfQ=s0-d-e1-ft#http://i.imgur.com/dyZhztJ.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> </td> <td style="text-align:right;padding-right: 40px"> <a href="https://www.facebook.com/sharer/sharer.php?u=https://bitbeeline.co&title=Bitbeeline" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=vi&amp;q=https://www.facebook.com/groups/SantaCoin/&amp;source=gmail&amp;ust=1509335829271000&amp;usg=AFQjCNHvknyoKoZhymbsaULxwxDAQXg9Lg"> <img width="40" style="padding-left:5px" src="https://imgur.com/3COJChV.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> <a href="https://twitter.com/intent/tweet?text=https://bitbeeline.co&title=Bitbeeline" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=vi&amp;q=https://twitter.com/SANTA_COIN&amp;source=gmail&amp;ust=1509335829271000&amp;usg=AFQjCNG0JpTzMgnqtsH5bejKGUdHsTpu8Q"> <img width="40" style="padding-left:5px" src="https://imgur.com/xB1yYPh.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> <a target="_blank" href="https://plus.google.com/up/accounts/upgrade/?continue=https://bitbeeline.co&title=Bitbeeline" style="text-decoration:none"> <img width="40" style="padding-left:5px" src="https://imgur.com/q8WrSm1.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> <a href="https://www.reddit.com/submit?url=https://bitbeeline.co&title=Bitbeeline" style="text-decoration:none"> <img width="40" style="padding-left:5px" src="https://i.imgur.com/JDHVtUW.png" class="m_-6763735527889058547CToWUd CToWUd"> </a> </td> </tr> </tbody> </table> </div> </center> </body> </html>';
        
        var email = {
            "html" : html,
            "text" : "Bitbeeline",
            "subject" : "Bitbeeline Deposit Notification",
            "from" : {
                "name" : "Bitbeeline Mailer",
                "email" : "no-reply@bitbeeline.co"
            },
            "to" : [
                {
                    "name" : "",
                    "email" : user.email
                }
            ]
        };
        sendpulse.smtpSendMail(answerGetter,email);*/
        callback(true);
    })
}


module.exports = {
    process_withdraw,
    process_deposit_bbl,
    process_deposit_eth,
    process_deposit_btg,
    process_deposit_btc,
    process_deposit_bch,
    process_deposit_ltc,
    process_deposit_dash,
    process_deposit_bcc,
    process_deposit_xvg,
    process_deposit_xzc,

    process_deposit_smart,
    process_deposit_lbc,
    process_deposit_mona,
    process_deposit_cup,
    process_remove_withdraw,
    process_remove_order_ico
}