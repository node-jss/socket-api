/*var socket = io.connect('https://bitbeeline.co',{ 'forceNew': true })
socket.on('dataTicker', (data)=>{ 
	$('.price_lec_usd').html('($'+data.bbl_usd+')');
    $('.price_lec_btc').html(data.bbl_btc+' BTC');
    $('.price_btc_usd').html('$'+data.btc_usd);
  
    $('.price_ast_usd').html(data.bbl_usd);
    $('.price_bbl_bch').html(data.bbl_bch+' BCH');
	return false; 
});
socket.emit('getTicer', 'payload');*/