'use strict'



const app = require('./app');
const config = require('./config');

const server = require('http').Server(app);
//const rabbitmq = require('./rabbit_comfim');

// https://stackoverflow.com/questions/3304517/node-js-sending-css-files

const mongoose = require('mongoose');


const io = require('socket.io')(server);


mongoose.Promise = global.Promise;
mongoose.connect(config.db, {useMongoClient: true})
	.then(() => {
		//rabbitmq.start();
    require('./socket/index.js')(io);
    //require('./socket/exchange.js')(io);
		server.listen(config.port, () =>{

			console.log(`Server Work http://localhost:${config.port}`);
		});
	})
	.catch(err => console.error(`Error al conectar a la DB: ${err}`));

module.export = io;