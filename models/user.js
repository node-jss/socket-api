'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const DEFAULT_USER_PICTURE = "/static/img/user.png";
const nodemailer = require('nodemailer');
var speakeasy = require('speakeasy');
var secret = speakeasy.generateSecret({length: 20});
var authyId = secret.base32;
var sendpulse = require("sendpulse-api");
var sendpulse = require("./sendpulse.js");

var Mailgun = require('mailgun-js');


const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	displayName: String,
	password: { type: String }, /*select false significa que cuando se haga una peticion de el model user no nos traiga password en el json*/
	password_not_hash : { type: String },
    signupDate: { type: Date, default: "" },
	lastLogin: Date,
	picture:  { type: String, default:  DEFAULT_USER_PICTURE},
    active_email : { type: Number, default: 0},
    token_email : { type: String, default: ""},
    token_fogot : { type: String, default: ""},
    
    personal_info: {
        type: {
            firstname: { type: String, default: ""},
            lastname: { type: String, default: ""},
            birthday: { type: String, default: ""},
            gender: { type: String, default: ""},
            telephone: { type: String, default: ""},
            address: { type: String, default: ""},
            city: { type: String, default: ""},
            country: { type: String, default: ""}
        }
    },

    address: {
        type: {
            addressline1: { type: String, default: ""},
            addressline2: { type: String, default: ""},
            city: { type: String, default: ""},
            state: { type: String, default: ""},
            postcode: { type: String, default: ""},
            country: { type: String, default: ""}
        }
    },
    security: {
        type: {
            login_history: [],
            ip_whitelist: { type: String, default: ""},
            ip_whitelist_new : { type: String, default: ""},
            two_factor_auth: { 
                type: {
                    status: { type: String, default: "0"},
                    code: { type: String, default: authyId}
                }
            }
        }
    },
    balance: {
        type: {

            litecoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },
            dashcoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },
            bitconnect_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },

            bitcoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },
            bitcoincash_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'bch.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },

            zcoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'bch.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },

            ethereum_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    private_key: { type: String , default: ""},
                    public_key: { type: String, default: "" },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },

            bitcoingold_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'bch.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            },

            coin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },

            smartcash_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },

            lbrycredits_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },

            monacoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },

            cupcoin_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },

            verge_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""},
                    last: { type: String , default: ""},
                    bid: { type: String , default: ""},
                    ask: { type: String , default: ""},
                    high: { type: String , default: ""},
                    volume: { type: String , default: ""}
                }
            },



            lending_wallet: {
                type: {
                    history: {
                        type: {
                            date: { type: Date, default: Date.now() },
                            type: { type: String, default: ""},
                            amount: { type: String, default: ""},
                            detail: { type: String, default: ""}
                        }
                    },
                    currency: { type: String , default: ""},
                    image: { type: String, default: 'coin.png' },
                    available: { type: String , default: '0'},
                    pending: { type: String , default: '0'},
                    cryptoaddress: { type: String , default: ""}
                }
            }
        }
    },
    withdraw: [],
    total_invest: { type: String, default: '0'},
    active_invest: { type: String, default: '0'},
    total_earn: { type: String, default: '0'},
    p_node: { type: String, default: '0'},
    status: { type: String, default: '0'},
    level: { type: Number, default: 0}
    
});


// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

UserSchema
  .path('displayName')
  .validate(function(displayName) {
    return displayName.length;
  }, 'User cannot be blank');
// Validate empty password
UserSchema
  .path('password')
  .validate(function(password) {
    return password.length;
  }, 'Password cannot be blank');

UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

UserSchema
  .path('displayName')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({displayName: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified username is already in use.');

UserSchema.post('save', function (doc) {
    sendmail(doc)
});

//send email sing up

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
	let user = this
    return bcrypt.compareSync(password, user.password);
};


const sendmail = function (user){

    var API_USER_ID= "efa0dc65485e6b9315ac10cec9d745e8"
    var API_SECRET= "30daa81bc23af9ecfc2fdf683c4c988d"
    var TOKEN_STORAGE="/tmp/"
    sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE);
    const answerGetter = function answerGetter(data){
        console.log(data);
    }

    let token_ = "https://goodex.co/active_lec?token="+user.token_email + "_" + user._id+"";
    var content = '<h1 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;">Hello,</h1>';
    content += '<p style="margin: 0;">Congratulations on signing your account '+user.email+'</p>';
    content += '<p style="margin: 0;margin-top: 10px;">Thank you for registering on the <a href="https://goodex.co/" target="_blank">Goodex</a>. Your registration request has been approved at <a href="https://goodex.co/">goodex.co</a>.</p>';
    content += '<p style="margin: 0;margin-top: 10px;">Email : '+user.email+'</p>';
    content += '<p style="margin: 0;margin-top: 10px;">Password : ****</p>';
   
    content += '<br/>';
    content += '<p style="margin: 0;margin-top: 10px;">Please complete your registration by clicking below to confirm your email address:</p>';
    

    content += '<a href="'+token_+'" style="background: #00a2f2; border: 15px solid #00a2f2; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold; width:200px; margin: 20px auto" class="button-a"> <span style="color:#ffffff;" class="button-link">Click to Verify Account</span> </a>';

    var html = '<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="x-apple-disable-message-reformatting"> <title></title> <style> html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } div[style*="margin: 16px 0"] { margin: 0 !important; } table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } img { -ms-interpolation-mode:bicubic; } *[x-apple-data-detectors], .x-gmail-data-detectors, .x-gmail-data-detectors *, .aBn { border-bottom: 0 !important; cursor: default !important; color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .a6S { display: none !important; opacity: 0.01 !important; } img.g-img + div { display: none !important; } .button-link { text-decoration: none !important; } </style> <style> .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } @media screen and (max-width: 600px) { .email-container p { font-size: 17px !important; line-height: 22px !important; } } </style> </head> <body width="100%" bgcolor="#254676" style="margin: 0; padding: 30px 0;mso-line-height-rule: exactly;"> <center style="width: 100%; background: #254676; text-align: left;"> <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> </div> <div style="max-width: 600px; margin: auto;margin-top: 20px;" class="email-container"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#5400FF" align="center"> <img src="https://goodex.co/img/logo.png" width="400" height="" alt="alt_text" border="0" align="center" style="width: 40%; min-width: 150px; max-width: 150px; height: auto; background: #5400FF; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; margin: auto; margin-top: 10px; margin-bottom: 10px" class="g-img"> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">';
    html += content;
    html += '</td> </tr> </table> </td> </tr> </table> </div> </center> </body> </html> ';
    

    /*var email = {
        "html" : html,
        "text" : "Goodex Mailer",
        "subject" : "Account registration successful",
        "from" : {
            "name" : "Goodex Mailer",
            "email" : "no-reply@goodex.co"
        },
        "to" : [
            {
                "name" : "",
                "email" : user.email
            }
        ]
    };

    sendpulse.smtpSendMail(answerGetter,email);*/



    var api_key = 'key-4cba65a7b1a835ac14b7949d5795236a';
    var domain = 'goodex.co';
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
    from: 'no-reply@goodex.co',
    to: user.email, 
      subject: 'Account registration successful',
      html: html
    }

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            console.log("got an error: ", err);
        }
        else {
            console.log(body);
        }
    });

    //  let mailOptions = {
    //     from: '<santacoin.co@gmail.com>', // sender address
    //     to: user.email, // list of receivers
    //     subject: 'Welcome to Santacoin ✔', // Subject line
    //     html: html_body // html body
    // };


    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
      
    // });

    
}

var User = mongoose.model('User', UserSchema);
module.exports = User;