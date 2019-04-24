var myDataRef = new Firebase("https://wcx-io.firebaseio.com/");
     $(document).keypress(function(e) {
		if(e.which == 13 && e.target.id== 'msgIpt')
		{
			 check_user_login();
			var m = $('#msgIpt').val();
			if(u!=''&&m!='')
			{
				var start = new Date();
				myDataRef.push({name: u, text: strip_html_tags(m), date: start.getTime()});
				$('#msgIpt').val('');
			}
		}
    });	
$('#pres_tx_btnSubmit').click(function() {
	check_user_login();
	var m = $('#msgIpt').val();
	if(u!=''&&m!='')
	{
		var start = new Date();
		myDataRef.push({name: u, text: strip_html_tags(m), date: start.getTime()});
		$('#msgIpt').val('');
	}
});
function check_user_login()
{
	if(user_id==''||user_id==undefined||user_id==0)
	{
		$('#auth-modal').modal('show');
		return false;
	}
	return true;
}
myDataRef.on('child_added', function(snapshot){
        var msg = snapshot.val();
		var start = new Date();
		var time_data=start.getTime()-10;
		var timemsg=get_date(msg.date);
		if(msg.image)
		{
			var image_user=msg.image;
		}
		else
		{
			var image_user=dummyimg;
		}
        displayMsg(msg.name, msg.text,timemsg);
});
function displayMsg(name, text, time_of_msg)
{
	if(u==name)
	{
		var class1='chat_out';
		var class2='chat_outcnt';
	}
	else
	{
		var class1='chat_in';
		var class2='chat_incnt';
	}
	var msg_text='<div class="'+class1+'"><h4>'+name+'<span class="chat_min">'+time_of_msg+'</span></h4><div class="'+class2+'"><p>'+strip_html_tags(text)+'</p></div></div>';
	$('#msgList').append(msg_text);
	$('.chat_tab').mCustomScrollbar('scrollTo','bottom');
}
function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}
function get_date(dt1) 
{
	var dt2   = new Date();
	var diff =(dt2.getTime() - dt1) / 1000;
	diff /= 60;
	var time_taken = Math.abs(Math.round(diff));
	if(time_taken==0)
	{
		var text = 'Just Now';
	}
	else
	{
		if(time_taken<60)
		{
			var text = time_taken+' mins ago';
		}
		else
		{
			var hours = Math.floor( time_taken / 60);
			if(hours<24)
			{
				if(hours==1)
				{
					var text = hours+' hour ago';
				}
				else
				{
					var text = hours+' hours ago';
				}
			}
			else
			{
				var days = Math.floor( hours / 24);
				if(days==1)
				{
					var text = days+' day ago';
				}
				else
				{
					var text = days+' days ago';
				}
			}
		}
	}
	return text;
}
window.onkeydown = function(e){
   if(e.keyCode == 70 && e.ctrlKey){
	    $( "#myInput" ).focus();
       return false;
           }
}
function filter_pairs() {
  var input, filter, table, tr, td, i;
  var j=0;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("filterTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length-1; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
		j++;
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  if(j==0)
  {
	  var nomarket = document.getElementById("nomarket");
	  $("#nomarket").addClass("fd_rw");
	  nomarket.style.display = "";
  }
  else
  {
	  var nomarket = document.getElementById("nomarket");
	  $("#nomarket").removeClass("fd_rw");
	  nomarket.style.display = "none";
  }
}
function filter_pairs1() {
  var input, filter, table, tr, td, i;
  var j=0;
  input = document.getElementById("myInput1");
  filter = input.value.toUpperCase();
  table = document.getElementById("filterTable1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length-1; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
		j++;
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  if(j==0)
  {
	  var nomarket = document.getElementById("nomarket1");
	  $("#nomarket1").addClass("fd_rw");
	  nomarket.style.display = "";
  }
  else
  {
	  var nomarket = document.getElementById("nomarket1");
	  $("#nomarket1").removeClass("fd_rw");
	  nomarket.style.display = "none";
  }
}
var chartdatas;

// 	var url = base_url+'tradechart1/'+pair_id+'/'+interval+'/'+type;
// 	$.getJSON(url, function(data) {
// chatobj = new Highcharts.stockChart('container', {
//     plotOptions: {
//         candlestick: {
//             lineColor: '#00cc44',
//             upLineColor: 'red',
//             upColor: 'red',
//             downLineColor: '#00cc44',
//             downColor: '#00cc44'
//         }
//     },
//     rangeSelector: {
//     selected: 4,
//     inputEnabled: false,
//     buttonTheme: {
//         visibility: 'hidden'
//     },
//     labelStyle: {
//         visibility: 'hidden'
//     }
// },
// 	scrollbar: {
// 		enabled: false
// 	},	
// 	navigator: {
//         enabled: false
//     },	
// 	yAxis:{
// 		min: 0
// 	},
// 	chart: {
//             zoomType: 'x'
//         },
//         xAxis: {
//             type: 'datetime',
            
//         },
//     series: [{
//         type: 'candlestick',
//         name: pair,
// 		tooltip: {
// 		valueDecimals: 8
// 		},
// 		data: data
//     }]
// });
// });
// }
$( document ).ready(function() {
var url = base_url + 'tradechart/' + pair_id;
$.getJSON(url, function(data) {
chartdatas = new Highcharts.stockChart('container', {
    plotOptions: {
        candlestick: {
            lineColor: '#00cc44',
            upLineColor: 'red',
            upColor: 'red',
            downLineColor: '#00cc44',
            downColor: '#00cc44'
        }
    },
    rangeSelector : {
   inputEnabled:false,
   	enabled: false
},

   
	scrollbar: {
		enabled: false
	},	
	navigator: {
        enabled: false
    },	
    xAxis: {
            type: 'datetime',
            tickInterval: 3600 * 1000,
            ordinal: false
        },
	yAxis:{
		min: 0
	},
	chart: {
            zoomType: 'x'
        },
        xAxis: {
            type: 'datetime',
            
        },
    series: [{
        type: 'candlestick',
        name: pair,
        pointInterval:  3600 * 1000,
		tooltip: {
		valueDecimals: 8
		},
		data: data
    }]
});
});
});

function chart_data(interval,type){
	var url = base_url+'tradechart1/'+pair_id+'/'+interval+'/'+type;
	if(type=='m')
	{
		$('#h').html('Hour<span class="caret"></span>');
	}
	else if(type=='h')
	{
		$('#m').html('Min<span class="caret"></span>');
	}
	else
	{
		$('#m').html('Min<span class="caret"></span>');
		$('#h').html('Hour<span class="caret"></span>');
	}
	$('#'+type).html(interval+type+'<span class="caret"></span>');
	// var url = 'https://cdn.rawgit.com/highcharts/highcharts/2c6e896/samples/data/aapl-ohlc.json';
	$.getJSON(url, function(res) {
	chartdatas.series[0].setData(res, false);
	$('#container').highcharts().redraw();
	});
}
(function($){
			$(window).on("load",function(){

        var width = $(window).width();
      
        if(width>1024){
        $(".trade_history_scroll,.sell_order,.buy_order,.order_table_scroll,.chat_tab,.order_table_scroll1,.order_table_scroll2,.order_table_scroll3").mCustomScrollbar({
                          scrollButtons:{
                            enable:false
                          },

                      scrollbarPosition: 'inside',
                      autoExpandScrollbar:true, 
                      theme: 'minimal-dark',
                       axis:"y",
                          setWidth: "auto"
            });
          				
        }else{
    $(".trade_history_scroll,.sell_order,.buy_order,.order_table_scroll,.chat_tab,.order_table_scroll1,.order_table_scroll2,.order_table_scroll3").mCustomScrollbar({
                          scrollButtons:{
                            enable:false
                          },

                      scrollbarPosition: 'inside',
                      autoExpandScrollbar:true, 
                      theme: 'minimal-dark',
                       axis:"x",
                          setWidth: "auto"
            });
       
        }
        
				
			});
		})(jQuery);
function change_pair(url)
{
	if(pagetype=='margin')
	{
		var reurl='margin';
	}
	else
	{
		var reurl='trade';
	}
	location.href = front_url+reurl+'/'+url;
}
function calculation(a)
{
	$('.growl-close').trigger('click');
	var amount      = $("#"+a+"_amount").val();
	var buy_price   = $('#buy_price').val();
	var sell_price  = $('#sell_price').val();
	var order_type  = $('#'+a+'_order_type').val();
	if(order_type=='instant'){

        if(a=='buy'){
          var tot   = (parseFloat(amount)*parseFloat(current_buy_price)).toFixed(8);
          var fees  = (parseFloat((parseFloat(amount)*parseFloat(current_buy_price)*maker_fee/100))).toFixed(8);
		  var n = tot.toString();
		  var n1 = fees.toString();
          if(tot>0)
			{
				var tot = (parseFloat(tot)+parseFloat(fees)).toFixed(8);
			}
			else
			{
				var tot = 0;
			}
			if(amount!="" && amount!=0 && !isNaN(amount)&&n.indexOf("e")==-1&&n1.indexOf("e")==-1)
			{

				$('#buy_tot').val(tot);  
				$('#buy_fee_tot').val(fees);
			}
			else
			{
				if(n.indexOf("e")>-1||n1.indexOf("e")>-1)
				{
					$.growl.error({ message: "Please enter valid amount and price" });
					return false;
				}
				$('#buy_tot').val(0);
				$('#buy_fee_tot').val(0);
			}
        }
        else
		{
			var tot   = (parseFloat(amount)*parseFloat(current_sell_price)).toFixed(8);
			var fees = (parseFloat((parseFloat(amount)*parseFloat(current_sell_price)*taker_fee/100))).toFixed(8);
			var n = tot.toString();
			var n1 = fees.toString();
			if(tot>0)
			{
				var tot = (parseFloat(tot)-parseFloat(fees)).toFixed(8);
			}
			else
			{
				var tot = 0;
			}
			if(amount!="" && amount!=0 && !isNaN(amount)&&n.indexOf("e")==-1&&n1.indexOf("e")==-1)
			{
				$('#sell_tot').val(tot); 
				$('#sell_fee_tot').val(fees);
			}
			else
			{
				if(n.indexOf("e")>-1||n1.indexOf("e")>-1)
				{
					$.growl.error({ message: "Please enter valid amount and price" });
					return false;
				}
				$('#sell_tot').val(0);
				$('#sell_fee_tot').val(0);
			}
        }
    }
    else
	{
		if(a=='buy')
		{
			var tot   = (parseFloat(amount)*parseFloat(buy_price)).toFixed(8);
			var fees  = (parseFloat((parseFloat(amount)*parseFloat(buy_price)*maker_fee/100))).toFixed(8);
			var n = tot.toString();
			var n1 = fees.toString();
			if(tot>0)
			{
				var tot = (parseFloat(tot)+parseFloat(fees)).toFixed(8);
			}
			else
			{
				var tot = 0;
			}
			if(amount!="" && buy_price!="" && amount!=0 && buy_price!=0&&!isNaN(amount)&&n.indexOf("e")==-1&&n1.indexOf("e")==-1)
			{
				$('#buy_tot').val(tot);  
				$('#buy_fee_tot').val(fees);
			}
			else
			{
				if(n.indexOf("e")>-1||n1.indexOf("e")>-1)
				{
					$.growl.error({ message: "Please enter valid amount and price" });
					return false;
				}
				$('#buy_tot').val(0);
				$('#buy_fee_tot').val(0);
			}
		}
		else
		{
			var tot   = (parseFloat(amount)*parseFloat(sell_price)).toFixed(8);
			var fees = (parseFloat((parseFloat(amount)*parseFloat(sell_price)*taker_fee/100))).toFixed(8);
			var n = tot.toString();
			var n1 = fees.toString();
			if(tot>0)
			{
				var tot = (parseFloat(tot)-parseFloat(fees)).toFixed(8);
			}
			else
			{
				var tot = 0;
			}
			if(amount!="" && sell_price!="" && amount!="" && sell_price!=""&&!isNaN(amount)&&n.indexOf("e")==-1&&n1.indexOf("e")==-1)
			{
				$('#sell_tot').val(tot); 
				$('#sell_fee_tot').val(fees);
			}
			else
			{
				if(n.indexOf("e")>-1||n1.indexOf("e")>-1)
				{
					$.growl.error({ message: "Please enter valid amount and price" });
					return false;
				}
				$('#sell_tot').val(0);
				$('#sell_fee_tot').val(0);
			}
		}
	}
}
function change_type(a,b)
{
	if(a=='instant')
	{
		$('#'+b+'_price_sec').hide();
		$('#'+a+'_price_sec').hide();
	}
	else
	{ 
		if(a=='limit')
		{
			$('#class'+b+'price').html('Limit Price'); 
		}
		else
		{
			$('#class'+b+'price').html('Stop Price'); 
		}
		$('#'+b+'_price_sec').show(); 
	}
	calculation(b);
}
function order_placed(a)
{
	var logincheck=check_user_login();
	calculation(a);
	$('.growl-close').trigger('click');
	if(logincheck)
	{
		var c     =   $("#"+a+"_amount").val(),d = $("#"+a+"_tot").val();	
		if(isNaN(c) || isNaN(d))
		{
			$.growl.error({ message: "Please enter valid amount and price" });
			return false;
		}
		else if(c=="" || c<=0 || d=="" || d<=0)
		{
			$.growl.error({ message: "Please enter valid amount and price" });
			return false;
		}
		if(pagetype=='margin')
		{
			var loan_rate=$("#"+a+"_loan_rate").val();
			if(loan_rate==''||isNaN(loan_rate))
			{
				$.growl.error({ message: "Please enter valid loan rate" });
				return false;
			}
			else
			{
				if(lending_min_loan_rate>loan_rate)
				{
					$.growl.error({ message: "Please enter valid loan rate. Minimum loan rate is "+lending_min_loan_rate });
					return false;
				}
			}
		}
		return order_confirm(a);
	}
}
function order_confirm(a)
{
	$('.growl-close').trigger('click');
	var c  = $("#"+a+"_amount").val();
	var order_type = $("#"+a+"_order_type").val();
	if(order_type == "instant")
	{
		if(a=='buy')
		{
			var  d = current_buy_price;
		}
		else
		{
			var  d = current_sell_price;
		}
	}
	else
	{
		var  d = $("#"+a+"_price").val();
		if(order_type=='stop')
		{
			if(a=='buy')
			{
				if(parseFloat(d)<=parseFloat(current_buy_price))
				{
					$.growl.error({ message: "Please enter greater than current market price" });
					return false;
				}
			}
			else
			{
				if(parseFloat(d)>=parseFloat(current_sell_price))
				{
					$.growl.error({ message: "Please enter less than current market price" });
					return false;
				}
			}
		}
	}  
	var multiply  = parseFloat(c)*parseFloat(d);
	if(a=="buy")
	{
		var fees      = parseFloat(multiply)*maker_fee/100;
	}
	else
	{
		var fees      = parseFloat(multiply)*taker_fee/100;
	}
	if(multiply>0)
	{
		var tot = multiply+fees;
	}
	else
	{
		var tot = 0;
	}	
	if(parseFloat(tot) < parseFloat(minimum_trade_amount)){
		$.growl.error({ message: "Minimum trade amount is "+ parseFloat(minimum_trade_amount) });
		return false;
	}
	var mul = parseFloat(tot).toFixed(8);
	var to_currency1 = parseFloat(to_currency);
	if(a=="buy")
	{ 
		if(mul > to_currency1)
		{ 
			$.growl.error({ message: "Insufficient balance" });
			return false;
		}
		else
		{
			return executeOrder('buy');
		}
	}
	else
	{     
		if(from_currency < parseFloat(c))
		{
			$.growl.error({ message: "Insufficient balance" });
			return false;
		}
		else
		{
			return executeOrder('sell');
		}
	}
}
function executeOrder(a)
{
	calculation(a);
	$('.growl-close').trigger('click');
	var amount = $("#"+a+"_amount").val();
	var price = $("#"+a+"_price").val();
	var total = $("#"+a+"_tot").val(); 
	var ordertype = $("#"+a+"_order_type").val();
	if(a =='buy')
	{
		var fee=maker_fee;
	}
	else
	{
		var fee=taker_fee;
	}
	if(ordertype=='instant')
	{
		if(a =='buy')
		{
			var current_price=current_buy_price;
		}
		else
		{
			var current_price=current_sell_price;
		}
		var price = (parseFloat(current_price)).toFixed(8);
	}
	else if(ordertype=='stop')
	{
		var price = parseFloat(price);
	}
	$('.sellbutton,.buybutton').prop('disabled', true);
	if(pagetype=='margin')
	{
		var loan_rate=$("#"+a+"_loan_rate").val();
	}
	else
	{
		var loan_rate=0;
	}
	$.ajax({
		url:base_url+'createOrder',
		type: 'POST',            
		data: "amount="+amount+"&price="+price+"&total="+total+"&fee="+fee+"&ordertype="+ordertype+"&pair="+pair+"&pair_id="+pair_id+"&type="+a+"&loan_rate="+loan_rate+"&pagetype="+pagetype,
		success: function(res)
		{
			$('.sellbutton,.buybutton').prop('disabled', false);
			$("#loading_circle").hide();
			var res = res.replace(/(\r\n|\n|\r)/gm,"");
			var res1=JSON.parse(res);
			if(res1.status == "balance")
			{ 
				$.growl.error({ message: "Insufficient balance" });
				return false;
			}
			else if(res1.status == "minimum_amount")
			{ 
				$.growl.error({ message: "Minimum trade amount is "+ parseFloat(minimum_trade_amount) });
				return false;
			}
			else if(res1.status == "login")
			{ 
				location.reload();
				$.growl.error({ message: "Login to your account" });
			}
			else if(res1.status == "success")
			{ 
				$("#onload_pp").modal({show:true,backdrop: 'static', keyboard: false});
				$.growl.notice({ message: "Your order has been placed" });
				var msg=res1.msg;
				var pp_tradeid=msg.trade_id;
				$("#pp_trade_id").html('#'+pp_tradeid);
				var type=msg.Type;
				var pp_pairs=pair.split('_');
				var tot_sec=parseFloat(msg.Amount)*parseFloat(msg.Price);
				var trsde_text='';	
				if(type=='buy')
				{
					var socket = io.connect( host+'://'+window.location.hostname+':'+port );
					socket.emit('new_message', { 
					name        : "test",
					currency_id : second_id,
					date        : date,
					user_id     : user_id,
					});

					var text_pp='You have Created a buy order for <b>'+(parseFloat(msg.Amount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec)).toFixed(8)+' '+pp_pairs[1];
					if(msg.filledAmount!=0&&msg.filledAmount!='')
					{
						if(msg.status=='filled')
						{
							trsde_text='You have bought <b> '+(parseFloat(msg.Amount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec)).toFixed(8)+' '+pp_pairs[1];
							$("#partial_div").hide();
							var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(msg.Fee).toFixed(8)+'</span>';
							$("#initial_div").html('<p>'+trsde_text+'</p><p>'+price_fee+'</p><p class="trd_net">Net Total : <span>'+parseFloat(msg.Total).toFixed(8)+'</span></p>');
						}
						else if(msg.status=='partially')
						{
							$("#partial_div").show();
							var tot_sec1=(parseFloat(msg.filledAmount)*parseFloat(msg.Price)).toFixed(8);
							trsde_text='You have bought partially <b> '+(parseFloat(msg.filledAmount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec1)).toFixed(8)+' '+pp_pairs[1];
							var filledprice=msg.Price*msg.filledAmount;
							var filledfee =(parseFloat(filledprice)*parseFloat(msg.fee_per)).toFixed(8);
							filledfee =(parseFloat(filledfee)/100).toFixed(8);
							var filledtotal =(parseFloat(filledprice)+parseFloat(filledfee)).toFixed(8);
							var balance_fee=(parseFloat(msg.Fee)-parseFloat(filledfee)).toFixed(8);
							var balamount=(parseFloat(msg.Amount)-parseFloat(msg.filledAmount)).toFixed(8);
							tot_sec=(parseFloat(balamount)*parseFloat(msg.Price)).toFixed(8);
							text_pp='Created a buy order for <b>'+parseFloat(balamount).toFixed(8)+' '+pp_pairs[0]+'</b> for '+parseFloat(tot_sec).toFixed(8)+' '+pp_pairs[1];
							var price_fee1='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(filledfee).toFixed(8)+'</span>';
							var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(balance_fee).toFixed(8)+'</span>';
							var totbal=(parseFloat(msg.Total)-parseFloat(filledtotal)).toFixed(8);
							$("#initial_div").html('<p>'+trsde_text+'</p><p>'+price_fee1+'</p><p class="trd_net">Net Total : <span>'+parseFloat(filledtotal).toFixed(8)+'</span></p>');
							$("#partial_div").html('<p>'+text_pp+'</p><p>'+price_fee+'</p><p class="trd_net">Net Total : <span>'+parseFloat(totbal).toFixed(8)+'</span></p>');
						}
					}
					else
					{
						var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(msg.Fee).toFixed(8)+'</span>';
						$("#partial_div").hide();
						$("#initial_div").html('<p>'+text_pp+'</p><p>'+price_fee+'</p><p class="trd_net">Net Total : <span>'+parseFloat(msg.Total).toFixed(8)+'</span></p>');
					}
				}
				else
				{
					var socket = io.connect( host+'://'+window.location.hostname+':'+port );
					socket.emit('new_message', { 
					name        : "test",
					currency_id : first_id,
					date        : date,
					user_id     : user_id,
					});
					var text_pp='You have Created a sell order for <b>'+(parseFloat(msg.Amount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec)).toFixed(8)+' '+pp_pairs[1];
					if(msg.filledAmount!=0&&msg.filledAmount!='')
					{
						if(msg.status=='filled')
						{
							trsde_text='You have sold <b> '+(parseFloat(msg.Amount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec)).toFixed(8)+' '+pp_pairs[1];
							$("#partial_div").hide();
							var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+msg.Fee+'</span>';
							$("#initial_div").html('<p>'+trsde_text+'</p><p>'+price_fee+'</p><p class="trd_net">Net Total : <span>'+msg.Total+'</span></p>');
						}
						else if(msg.status=='partially')
						{
							$("#partial_div").show();
							var tot_sec1=(parseFloat(msg.filledAmount)*parseFloat(msg.Price)).toFixed(8);
							trsde_text='You have sold partially <b> '+(parseFloat(msg.filledAmount)).toFixed(8)+' '+pp_pairs[0]+'</b> for '+(parseFloat(tot_sec1)).toFixed(8)+' '+pp_pairs[1];
							var filledprice=(parseFloat(msg.Price)*parseFloat(msg.filledAmount)).toFixed(8);
							var filledfee =(parseFloat(filledprice)*parseFloat(msg.fee_per)).toFixed(8);
							filledfee =(parseFloat(filledfee)/100).toFixed(8);
							var filledtotal =(parseFloat(filledprice)-parseFloat(filledfee)).toFixed(8);
							var balance_fee=(parseFloat(msg.Fee)-parseFloat(filledfee)).toFixed(8);
							var price_fee1='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(filledfee).toFixed(8)+'</span>';
							var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(balance_fee).toFixed(8)+'</span>';
							var balamount=(parseFloat(msg.Amount)-parseFloat(msg.filledAmount)).toFixed(8);
							tot_sec=(parseFloat(balamount)*parseFloat(msg.Price)).toFixed(8);
							text_pp='Created a sell order for <b>'+parseFloat(balamount).toFixed(8)+' '+pp_pairs[0]+'</b> for '+parseFloat(tot_sec).toFixed(8)+' '+pp_pairs[1];
							$("#initial_div").html('<p>'+trsde_text+'</p><p>'+parseFloat(price_fee1).toFixed(8)+'</p><p class="trd_net">Net Total : <span>'+parseFloat(filledtotal).toFixed(8)+'</span></p>');
							var totbal=(parseFloat(msg.Total)-parseFloat(filledtotal)).toFixed(8);
							$("#partial_div").html('<p>'+text_pp+'</p><p>'+parseFloat(price_fee)/toFixed(8)+'</p><p class="trd_net">Net Total : <span>'+parseFloat(totbal).toFixed(8)+'</span></p>');
						}
					}
					else
					{
						var price_fee='Price : '+msg.Price+' <span class="fee_cn1">Fee : '+parseFloat(msg.Fee).toFixed(8)+'</span>';
						$("#partial_div").hide();
						$("#initial_div").html('<p>'+text_pp+'</p><p>'+price_fee+'</p><p class="trd_net">Net Total : <span>'+parseFloat(msg.Total).toFixed(8)+'</span></p>');
					}
				}
			}
			else
			{
				$.growl.error({ message: res });
			}
			load_design();
			$("#"+a+"_amount").val('');
			$("#"+a+"_price").val('');
			$("#"+a+"_tot").val('');
			$("#"+a+"_fee_tot").val('');
		},
		beforeSend:function()
		{                 
			$("#loading_circle").show();
		}
	});
	return false;
}
function load_design()
{
	$.ajax({
		url:base_url+'trade_integration/'+pair_id+'/'+user_id+'/'+pagetype,
		type: 'GET',
		success: function(res)
		{
			var browsername=navigator ? navigator.userAgent.toLowerCase() : "other";
			var resp = browsername.split(" "); 
			var lengthbrowser=resp.length;
			var getname=resp[lengthbrowser-1];
			var res1 = getname.split("/"); 
			if(res1[1]!='safari')
			{
				console.API;
				if (typeof console._commandLineAPI !== 'undefined') {
				console.API = console._commandLineAPI; //chrome
				} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
				console.API = console._inspectorCommandLineAPI; //Safari
				} else if (typeof console.clear !== 'undefined') {
				console.API = console;
				}
				// console.API.clear();
			}
			
			
			
			
			setTimeout(function(){
			load_design();
			}, 3000);
			var designs=JSON.parse(res);
			var current_trade=designs.current_trade;
			var transactionhistory=designs.transactionhistory;
			var mytransactionhistory=designs.mytransactionhistory;
			var liquidity=designs.liquidity;
			var buyResult=designs.buyResult;
			var sellResult=designs.sellResult;
			var pairs=designs.pairs;
			from_currency=designs.from_currency;
			to_currency=designs.to_currency;
			wcx_userid=designs.wcx_userid;
			current_buy_price=designs.current_buy_price;
			current_sell_price=designs.current_sell_price;
			lastmarketprice=designs.lastmarketprice;
			maker_fee=parseFloat(designs.maker).toFixed(2);
			taker_fee=parseFloat(designs.taker).toFixed(2);
			$('#maker_fee').html(maker_fee+'%');
			$('#taker_fee').html(taker_fee+'%');
			if(current_trade)
			{
				$("#last_price").html((parseFloat(current_trade['price'])).toFixed(8));
				$("#high_price").html((parseFloat(current_trade['high'])).toFixed(8));
				$("#low_price").html((parseFloat(current_trade['low'])).toFixed(8));
				$("#volume_price").html((parseFloat(current_trade['volume'])).toFixed(8));
			}
			if(transactionhistory!=0&&transactionhistory.length>0)
			{	
				var transaction_length=transactionhistory.length;
				var historys='';
				for(count = 0; count < transaction_length; count++)
				{
					var askAmount=transactionhistory[count].askAmount;
					var buyer_trade_id=transactionhistory[count].buyer_trade_id;
					var seller_trade_id=transactionhistory[count].seller_trade_id;
					var filledAmount=transactionhistory[count].filledAmount;
					filledAmount=parseFloat(filledAmount).toFixed(8);
					if(buyer_trade_id>seller_trade_id)
					{
						var type1="Buy";
						var type2="Sell";
						var askPrice=transactionhistory[count].buyaskPrice;
						askPrice=parseFloat(askPrice).toFixed(8);
						var sellaskPrice=transactionhistory[count].sellaskPrice;
						sellaskPrice=parseFloat(sellaskPrice).toFixed(8);
						var orderTime1=transactionhistory[count].buyertime;
						var orderTime2=transactionhistory[count].sellertime;
					}
					else
					{
						var type1="Sell";
						var type2="Buy";
						var askPrice=transactionhistory[count].sellaskPrice;
						askPrice=parseFloat(askPrice).toFixed(8);
						var sellaskPrice=transactionhistory[count].buyaskPrice;
						sellaskPrice=parseFloat(sellaskPrice).toFixed(8);
						var orderTime1=transactionhistory[count].buyertime;
						var orderTime2=transactionhistory[count].sellertime;
					}
					if(type1=='Buy'){var class1='success';}else{var class1='danger';}
					if(type2=='Buy'){var class2='success';}else{var class2='danger';}
					historys=historys+'<tr><td>'+orderTime1+'</td><td><span class="text-'+class1+'">'+type1+'</span></td><td><span class="text-'+class1+'">'+askPrice+'</span></td><td><span class="text-'+class1+'">'+filledAmount+'</span></td></tr>';
					historys=historys+'<tr><td>'+orderTime2+'</td><td><span class="text-'+class2+'">'+type2+'</span></td><td><span class="text-'+class2+'">'+sellaskPrice+'</span></td><td><span class="text-'+class2+'">'+filledAmount+'</span></td></tr>';
				}
				$('.transactionhistory tbody').html(historys);
			}
			else
			{
				$('.transactionhistory tbody').html('<tr class="fd_rw"><td colspan="4" class="text-center">No Trade History Found!</td></tr>');
			}
			// if(mytransactionhistory!=0&&mytransactionhistory.length>0)
			// {	
			// 	var transaction_length=mytransactionhistory.length;
			// 	var historys='';
			// 	for(count = 0; count < transaction_length; count++)
			// 	{
			// 		// var askAmount=mytransactionhistory[count].Amount;
			// 		// var buyer_trade_id=mytransactionhistory[count].trade_id;
			// 		// var Type=mytransactionhistory[count].Type;
			// 		// var Price=mytransactionhistory[count].Price;
			// 		// var status=mytransactionhistory[count].status;
			// 		// var filledAmount=mytransactionhistory[count].filledAmount;
			// 		// var orderTime=mytransactionhistory[count].orderTime;
			// 		// var orderDate=mytransactionhistory[count].orderDate;
			// 		// filledAmount=filledAmount || 0;
					
			// 		// if(status=='cancelled' && filledAmount==0)
			// 		// {
			// 		// 	continue;
			// 		// }
			// 		// // filledAmount = askAmount - filledAmount;
			// 		// if(filledAmount==0)
			// 		// {
			// 		// 	filledAmount = askAmount;
			// 		// }

			// 		// var total1 = filledAmount*Price;

			// 		// historys=historys+'<tr><td>'+Type+'</td><td>'+orderDate+' '+orderTime+'</td><td>'+parseFloat(Price).toFixed(8)+'</td><td>'+parseFloat(filledAmount).toFixed(8)+'</td><td>'+parseFloat(total1).toFixed(8)+'</td></tr>';
			// 		var askAmount=transactionhistory[count].askAmount;
			// 		var buyer_trade_id=transactionhistory[count].buyer_trade_id;
			// 		var seller_trade_id=transactionhistory[count].seller_trade_id;
			// 		var filledAmount=transactionhistory[count].filledAmount;
			// 		filledAmount=parseFloat(filledAmount).toFixed(8);
			// 		if(buyer_trade_id>seller_trade_id)
			// 		{
			// 			var type1        = "Buy";
			// 			var type2        = "Sell";
			// 			var askPrice     = transactionhistory[count].buyaskPrice;
			// 			askPrice         = parseFloat(askPrice).toFixed(8);
			// 			var sellaskPrice = transactionhistory[count].sellaskPrice;
			// 			sellaskPrice     = parseFloat(sellaskPrice).toFixed(8);
			// 			var orderTime1   = transactionhistory[count].buyertime;
			// 			var orderTime2   = transactionhistory[count].sellertime;
			// 		}
			// 		else
			// 		{
			// 			var type1        = "Sell";
			// 			var type2        = "Buy";
			// 			var askPrice     = transactionhistory[count].sellaskPrice;
			// 			askPrice         = parseFloat(askPrice).toFixed(8);
			// 			var sellaskPrice = transactionhistory[count].buyaskPrice;
			// 			sellaskPrice     = parseFloat(sellaskPrice).toFixed(8);
			// 			var orderTime1   = transactionhistory[count].buyertime;
			// 			var orderTime2   = transactionhistory[count].sellertime;
			// 			var buyerUserid   = transactionhistory[count].buyerUserid;
			// 		}
			// 		if(type1=='Buy'){var class1='success';}else{var class1='danger';}
			// 		if(type2=='Buy'){var class2='success';}else{var class2='danger';}
			// 		// historys=historys+'<tr><td>'+orderTime1+'</td><td><span class="text-'+class1+'">'+type1+'</span></td><td><span class="text-'+class1+'">'+askPrice+'</span></td><td><span class="text-'+class1+'">'+filledAmount+'</span></td></tr>';
			// 		if(buyerUserid==user_id)
			// 		{
			// 			var type = 'Buy';
			// 			class1='success'
			// 		}
			// 		else
			// 		{
			// 			var type = 'Sell';
			// 			class1='danger';
			// 		}
			// 		historys=historys+'<tr><td>'+orderTime2+'</td><td><span class="text-'+class1+'">'+type+'</span></td><td><span class="text-'+class2+'">'+sellaskPrice+'</span></td><td><span class="text-'+class2+'">'+filledAmount+'</span></td></tr>';

					
			// 	}
			// 	$('.mytradehistory').html(historys);
			// }
			// else
			// {
			// 	$('.mytradehistory').html('<tr class="fd_rw"><td colspan="4" class="text-center">No Trade History Found!</td></tr>');
			// }

			if(mytransactionhistory!=0&&mytransactionhistory.length>0)
			{	
				var transaction_length=mytransactionhistory.length;
				var historys='';
				for(count = 0; count < transaction_length; count++)
				{
					var askAmount=mytransactionhistory[count].askAmount;
					var buyer_trade_id=mytransactionhistory[count].buyer_trade_id;
					var seller_trade_id=mytransactionhistory[count].seller_trade_id;
					var filledAmount=mytransactionhistory[count].filledAmount;
					filledAmount=parseFloat(filledAmount).toFixed(8);
					if(buyer_trade_id>seller_trade_id)
					{
						var type1="Buy";
						var type2="Sell";
						var askPrice=mytransactionhistory[count].buyaskPrice;
						askPrice=parseFloat(askPrice).toFixed(8);
						var sellaskPrice=mytransactionhistory[count].sellaskPrice;
						sellaskPrice=parseFloat(sellaskPrice).toFixed(8);
						var orderTime1=mytransactionhistory[count].datetime;
						var orderTime2=mytransactionhistory[count].datetime;
						var total1 = filledAmount*askPrice;
						var buyerUserid=mytransactionhistory[count].buyerUserid;
					}
						else
					{
						var type1="Sell";
						var type2="Buy";
						var askPrice=mytransactionhistory[count].sellaskPrice;
						var buyerUserid=mytransactionhistory[count].buyerUserid;
						askPrice=parseFloat(askPrice).toFixed(8);
						var sellaskPrice=mytransactionhistory[count].buyaskPrice;
						sellaskPrice=parseFloat(sellaskPrice).toFixed(8);
						var orderTime1=mytransactionhistory[count].datetime;
						var orderTime2=mytransactionhistory[count].datetime;
						var total1 = filledAmount*sellaskPrice;
					}
					// if(type1=='Buy'){var class1='success';}else{var class1='danger';}
					// if(type2=='Buy'){var class2='success';}else{var class2='danger';}
					
					if(buyerUserid==user_id)
					{
						var type = 'Buy';
						class1='success'
					}
					else
					{
						var type = 'Sell';
						class1='danger';
					}

						// var date = stop_orders[count].datetime;
						var mydate = new Date(orderTime1);
						var str = mydate.toString("MM-dd-yyyy hh:mm:ss");
						
					historys=historys+'<tr><td>'+type+'</td><td>'+str+'</td><td>'+askPrice+'</td><td>'+filledAmount+'</td><td>'+parseFloat(total1).toFixed(8)+'</td></tr>';
					// historys=historys+'<tr><td>'+type2+'</td><td>'+orderTime2+'</td><td>'+sellaskPrice+'</td><td>'+filledAmount+'</td><td>'+parseFloat(total1).toFixed(8)+'</td></tr>';
					
				}
				$('.mytradehistory tbody .mCustomScrollBox .mCSB_container').html(historys);
			}
			else
			{
				$('.mytradehistory tbody .mCustomScrollBox .mCSB_container').html('<tr class="fd_rw"><td colspan="4" class="text-center">No Trade History Found!</td></tr>');
			}


			var orders=[];
			if(liquidity!=0)
			{
				if(liquidity['bids']!=0)
				{
					orders=liquidity['bids'];
				}
			}
			if(orders.length!=0||buyResult.length>0)
			{
				var order_table='';
				if(buyResult.length>0)
				{
					for(count = 0; count < buyResult.length; count++)
					{
						
						var price = "'"+buyResult[count]['Price']+"'";
						if(buyResult[count]['filledAmount'])
						{
							var filledamount=parseFloat(buyResult[count]['filledAmount']);
						}
						else
						{
							var filledamount=0;
						}
						
						if(orders[price]!=undefined)
						{
							orders[price] = parseFloat(orders[price])+parseFloat(buyResult[count]['Amount'])-filledamount;
						}
						else
						{
							orders[price] = parseFloat(buyResult[count]['Amount'])-filledamount;
						}
						
					}
				}
				var autoinc=0;
				for(var i in orders)
				{
					var ret = i.replace("'","");
					if(autoinc==0)
					{
						current_sell_price=parseFloat(ret).toFixed(8);
						autoinc=1;
					}
					// ret.format("MM/DD/YYYY");
					// ret.format("MM/DD/YYYY");


					var type="'sell'";
					order_table+='<tr onclick="placeorder('+type+','+parseFloat(ret).toFixed(8)+','+parseFloat(orders[i]).toFixed(8)+')"><td>'+parseFloat(ret).toFixed(8)+'</td><td>'+parseFloat(orders[i]).toFixed(8)+'</td><td>'+(parseFloat(orders[i])*parseFloat(ret)).toFixed(8)+'</td></tr>';
				}
			}
			else
			{
				order_table='<tr class="fd_rw"><td colspan="3" class="text-center">No Buy Order Found</td></tr>';
			}
			$('.buy_order tbody').html(order_table);
			var orders1=[];
			if(liquidity!=0)
			{
				if(liquidity['asks']!=0)
				{
					orders1=liquidity['asks'];
				}
			}
			if(orders1.length!=0||sellResult.length>0)
			{
				var order_table='';
				if(sellResult.length>0)
				{
					for(count = 0; count < sellResult.length; count++)
					{
						var price = "'"+sellResult[count]['Price']+"'";
						if(sellResult[count]['filledAmount'])
						{
							var filledamount=parseFloat(sellResult[count]['filledAmount']);
						}
						else
						{
							var filledamount=0;
						}
						if(orders1[price]!=undefined)
						{
							orders1[price] = parseFloat(orders1[price])+parseFloat(sellResult[count]['Amount'])-filledamount;
						}
						else
						{
							orders1[price] = parseFloat(sellResult[count]['Amount'])-filledamount;
						}
					}
				}
				var autoinc1=0;
				for(var i in orders1)
				{
					var ret = i.replace("'","");
					if(autoinc1==0)
					{
						current_buy_price=parseFloat(ret).toFixed(8);
						autoinc1=1;
					}
					var type="'buy'";
					order_table+='<tr onclick="placeorder('+type+','+parseFloat(ret).toFixed(8)+','+parseFloat(orders1[i]).toFixed(8)+')"><td>'+parseFloat(ret).toFixed(8)+'</td><td>'+parseFloat(orders1[i]).toFixed(8)+'</td><td>'+(parseFloat(orders1[i])*parseFloat(ret)).toFixed(8)+'</td></tr>';
				}
			}
			else
			{
				order_table='<tr class="fd_rw"><td colspan="3" class="text-center">No Sell Order Found</td></tr>';
			}
			$('.sell_order tbody').html(order_table);
			if(pagetype!='home')
			{
				var open_orders=designs.open_orders;
				var cancel_orders=designs.cancel_orders;
				var stop_orders=designs.stop_orders;
				if(open_orders!=0&&open_orders.length>0)
				{
					var open_length=open_orders.length;
					var open_orders_text='';
					for(count = 0; count < open_length; count++)
					{
						var activefilledAmount=open_orders[count].totalamount;
						var activePrice=open_orders[count].Price;
						activePrice=(parseFloat(activePrice)).toFixed(8);
						var activeAmount  = open_orders[count].Amount;
						if(activefilledAmount)
						{
							activefilledAmount = activeAmount-activefilledAmount;
						}
						else
						{
							activefilledAmount = activeAmount;
						}
						var date = open_orders[count].datetime;

						var mydate = new Date(date);
						var str = mydate.toString("MM-dd-yyyy hh:mm:ss");

						activefilledAmount=(parseFloat(activefilledAmount)).toFixed(8);
						var activeCalcTotal = activefilledAmount*activePrice;
						activeCalcTotal=(parseFloat(activeCalcTotal)).toFixed(8);
						var click="return cancel_order('"+open_orders[count].trade_id+"')";
						open_orders_text=open_orders_text+'<tr><td>'+open_orders[count].Type+'</td><td>'+str+'</td><td>'+activePrice+'</td><td>'+activefilledAmount+'</td><td>'+activeCalcTotal+'</td><td><a href="javascript:;" onclick="'+click+'"><i class="fa fa-times-circle pad-rht"></i></a></td></tr>';
					}
					$('.open_orders tbody .mCustomScrollBox .mCSB_container').html(open_orders_text);
				}
				else
				{
					$('.open_orders tbody .mCustomScrollBox .mCSB_container').html('<tr id="noopenorder"><td colspan="6" class="text-center">No open orders available!</td></tr>');
				}
				if(cancel_orders!=0&&cancel_orders.length>0)
				{
					var cancel_length=cancel_orders.length;
					var cancel_orders_text='';
					for(count = 0; count < cancel_length; count++)
					{
						var activePrice=cancel_orders[count].Price;
						activePrice=(parseFloat(activePrice)).toFixed(8);
						var activeAmount  = cancel_orders[count].Amount;
						var activefilledAmount=cancel_orders[count].totalamount;
						if(activefilledAmount)
						{
							activefilledAmount = activeAmount-activefilledAmount;
						}
						else
						{
							activefilledAmount = activeAmount;
						}
						activefilledAmount=(parseFloat(activefilledAmount)).toFixed(8);
						var activeCalcTotal = activefilledAmount*activePrice;
						activeCalcTotal=(parseFloat(activeCalcTotal)).toFixed(8);
						var date = cancel_orders[count].tradetime;
						var mydate = new Date(date);
						var str = mydate.toString("MM-dd-yyyy hh:mm:ss");
						cancel_orders_text=cancel_orders_text+'<tr><td>'+cancel_orders[count].Type+'</td><td>'+str+'</td><td>'+activePrice+'</td><td>'+activefilledAmount+'</td><td>'+activeCalcTotal+'</td><td>Cancelled</td></tr>';
					}
					$('.cancel_orders tbody .mCustomScrollBox .mCSB_container').html(cancel_orders_text);
				}
				else
				{
					$('.cancel_orders tbody .mCustomScrollBox .mCSB_container').html('<tr id="nocancelorder"><td colspan="6" class="text-center">No cancel orders available!</td></tr>');
				}
				if(stop_orders!=0&&stop_orders.length>0)
				{
					var stop_length=stop_orders.length;
					var stop_orders_text='';
					for(count = 0; count < stop_length; count++)
					{
						var activePrice=stop_orders[count].Price;
						activePrice=(parseFloat(activePrice)).toFixed(8);
						var activeAmount  = stop_orders[count].Amount;
						var activefilledAmount=activeAmount;
						activefilledAmount=(parseFloat(activefilledAmount)).toFixed(8);
						var activeCalcTotal = activefilledAmount*activePrice;
						activeCalcTotal=(parseFloat(activeCalcTotal)).toFixed(8);
						var click="return cancel_order('"+stop_orders[count].trade_id+"')";
						var date = stop_orders[count].datetime;
						var mydate = new Date(date);
						var str = mydate.toString("MM-dd-yyyy hh:mm:ss");
						stop_orders_text=stop_orders_text+'<tr><td>'+stop_orders[count].Type+'</td><td>'+str+'</td><td>'+activePrice+'</td><td>'+activefilledAmount+'</td><td>'+activeCalcTotal+'</td><td><a href="javascript:;" onclick="'+click+'"><i class="fa fa-times-circle pad-rht"></i></a></td></tr>';
					}
					$('.stop_orders tbody .mCustomScrollBox .mCSB_container').html(stop_orders_text);
				}
				else
				{
					$('.stop_orders tbody .mCustomScrollBox .mCSB_container').html('<tr id="nostoporder"><td colspan="6" class="text-center">No stop orders available!</td></tr>');
				}
				var input = $("#openordertext").val();
				var input1 = $("#closeordertext").val();
				var input2 =$("#stopordertext").val();
				if(input!='')
				{
					filter_openorder();
				}
				if(input1!='')
				{
					filter_closeorder();
				}
				if(input2!='')
				{
					filter_stoporder();
				}
			}
			$("#buyprice").html(current_buy_price);
			$("#to_cur_balance").html(to_currency);
			$("#sellprice").html(current_sell_price);
			$("#from_cur_balance").html(from_currency);
			var pair_length=pairs.length;
			if(pair_length>0)
			{
				var pairsymbolactive=$("#filterTable tbody .active").attr('id');
				// var pairsymbolactive=$("#filterTable1 tbody .active").attr('id');
				for(count = 0; count < pair_length; count++)
				{
					var symbols=pairs[count].from_currency_symbol+'_'+pairs[count].to_currency_symbol;
					var pairprice=$("#"+symbols+" td:eq( 1 )").html();
					var pairchange=$("#"+symbols+" td:eq( 2 ) span").html();
					pairchange = (pairchange)?pairchange.replace("%", ""):'';
					var pairvolume=$("#"+symbols+" td:eq( 3 )").html();
					var pairprice1=pairs[count].price;
					var pairchange1=pairs[count].change;
					var pairvolume1=pairs[count].volume;
					var changval=0;
					if(pairprice!=pairprice1)
					{
						changval=1;
						$("#"+symbols+" td:eq( 1 )").html(pairprice1);
					}
					if(pairchange!=pairchange1)
					{
						changval=1;
						if(pairchange1<0)
						{
							$("#"+symbols+" td:eq( 2 ) span").removeClass( "text-danger text-success" ).addClass( "text-danger" );
						}
						else
						{
							$("#"+symbols+" td:eq( 2 ) span").removeClass( "text-danger text-success" ).addClass( "text-success" );
						}
						$("#"+symbols+" td:eq( 2 ) span").html(parseFloat(pairchange1).toFixed(2));
					}
					if(pairvolume!=pairvolume1)
					{
						changval=1;
						$("#"+symbols+" td:eq( 3 )").html(pairvolume1);
					}
				}
			}
			if(pagetype=='margin')
			{
				transfer_list();
				var positions=designs.positions;
				var baseprice=designs.baseprice;
				var cond_check=0;
				var textposition='';
				if(positions!=0)
				{
					var position_count=positions.length;
					for(var posi=0;posi<position_count;posi++)
					{
						var currency_symbol = positions[posi].currency_symbol;
						var Price           = positions[posi].Price;
						var Amount          = positions[posi].Amount;
						var rate            = positions[posi].rate;
						var status          = positions[posi].status;
						var tot_minutes     = positions[posi].date_diff;
						var swapamount      = positions[posi].swap_amount;
						if(currency_symbol!='BTC')
						{
							var borrow = swapamount*Price;
						}
						else
						{
							var borrow = swapamount;
						}
						var borrow_estimate=(borrow*20)/100;
						if(pair_id == positions[posi].pair && status=='filled')
						{
							cond_check=1;
							var swapamount1=swapamount;
							if(positions[posi].Type=='buy')
							{
								var current_price   = current_sell_price;
								var base_price      = Price+((Price*baseprice)/100);
								var currentprice    = (swapamount1*Price)-borrow_estimate;
								var liqutationprice = currentprice/swapamount1;
								var profitloss      = (parseFloat(((current_price*Amount)-(Price*Amount)))).toFixed(8);
							}
							else
							{
								var current_price   = current_buy_price;
								var base_price      = Price-((Price*baseprice)/100);
								swapamount      	= '-'+swapamount;
								var currentprice    = (swapamount1*Price)+borrow_estimate;
								var liqutationprice = currentprice/swapamount1;
								var profitloss      = (parseFloat(((Price*Amount)-(current_price*Amount)))).toFixed(8);
							}
							var range             = positions[posi].range;
							var minutes           = range*24*60;
							var interest          = (parseFloat(((swapamount1*rate)/100))).toFixed(8);
							var min_interest      = interest/minutes;
							var tot_interest      = (parseFloat((min_interest*tot_minutes))).toFixed(8);
							if(positions[posi].Type=='buy'){var positiontype="Long";}else{var positiontype="Short";}
							textposition=textposition+'<tr><td>'+positiontype+'</td><td>'+swapamount+currency_symbol+'</td><td>'+parseFloat(base_price).toFixed(8)+'</td><td>'+(parseFloat(liqutationprice)).toFixed(8)+'</td><td>'+profitloss+'</td><td>'+tot_interest+'</td><td><a href="javascript:;" onclick="return cancel_order('+positions[posi].trade_id+')">Close</a></td></tr>';
						}
					}
				}
				if(textposition!='')
				{
					$("#onpositiondiv").show();
					$("#nopositiondiv").hide();
					$("#openpositionstable tbody").html(textposition);
				}
				else
				{
					$("#onpositiondiv").hide();
					$("#nopositiondiv").show();
				}
			}
		}
	});
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
		if ((charCode > 34 && charCode < 41) || (charCode > 47 && charCode < 58) || (charCode == 46) || (charCode == 8) || (charCode == 9))
        return true;
    return false;
}
load_design();
setTimeout(function(){
$('.chat_tab').mCustomScrollbar('scrollTo','bottom');
}, 3000);
$("#sell_order_table li").click(function() {
	
});
function transfer_balance()
{
	var amount = $("#amount").val();
	var currency = $("#currency").val();
	var from_account = $("#from_account").val();
	var to_account = $("#to_account").val();
	var avail_balance=wallet_balance[from_account][currency];
	
	if(amount=="" || amount==0 || isNaN(amount))
	{
		$.growl.error({ message: "Please enter valid amount" });
		return false;
	}
	
	if(parseFloat(avail_balance)<parseFloat(amount))
	{
		$.growl.error({ message: "Insufficient balance in "+from_account+" account" });
		return false;
	}
	$.ajax({
		url:base_url+'balance_transfer',
		type: 'POST',            
		data: "amount="+amount+"&currency="+currency+"&from_account="+from_account+"&to_account="+to_account,
		success: function(res)
		{
			$('.button_transfer').prop('disabled', false);
			var res = res.replace(/(\r\n|\n|\r)/gm,"");
			if(res == "balance")
			{ 
				$.growl.error({ message: "Insufficient balance in "+from_account+" account" });
			}
			else if(res == "login")
			{ 
				$.growl.error({ message: "Login to your account" });
			}
			else if(res == "success")
			{ 
				 $("#amount").val('');
				$.growl.notice({ message: "Transfer balance is successfully completed" });
				transfer_list();
			}
			else
			{
				$.growl.error({ message: res });
			}
		},
		beforeSend:function()
		{                 
			$('.button_transfer').prop('disabled', true);
		}
	});
}
function transfer_list()
{
	$.ajax({
				url:base_url+'transfer_list',
				type: 'GET',
				success: function(res)
				{
					var res1=JSON.parse(res);
					$("#transfercoins tbody").html(res1.coindetails);
					$("#transferestimatecoins tbody").html(res1.estimatedetails);
					wallet_balance = JSON.parse(res1.wallet);
				}
				});
}
function change_to_account(from_account)
{
	if(from_account=='Exchange AND Trading')
	{
		var to_text='<option value="Margin Trading">Margin Trading</option><option value="Lending">Lending</option>';
	}
	else if(from_account=='Margin Trading')
	{
		var to_text='<option value="Exchange AND Trading">Exchange AND Trading</option><option value="Lending">Lending</option>';
	}
	else
	{
		var to_text='<option value="Exchange AND Trading">Exchange AND Trading</option><option value="Margin Trading">Margin Trading</option>';
	}
	$("#to_account").html(to_text);
}
function placeorder(type,price,amount,ordertype)
{
	if(ordertype==''||ordertype==undefined)
	{
		ordertype='limit';
	}
	$("#"+type+"_order_type").val(ordertype);
	$("#"+type+"_amount").val(parseFloat(amount).toFixed(8));
	$("#"+type+"_price").val(price);
	change_type(ordertype,type);
}
function setorder(column,type)
{
	var balance=parseFloat($("#"+column).html());
	if(balance>0)
	{
		if(type=='buy')
		{
			var amount=(100*balance)/((100*current_buy_price)+(current_buy_price*maker_fee));
			placeorder(type,current_buy_price,amount,'instant');
		}
		else
		{
			placeorder(type,current_sell_price,balance,'instant');
		}
	}
}
function balanceTransferChangeCurrency(currencyid,balancetype,balance)
{
	$("#currency").val(currencyid);
	if(balancetype&&balancetype!=undefined)
	{
		$("#from_account").val(balancetype);
		change_to_account(balancetype);
	}
	if(balance&&balance!=undefined)
	{
		$("#amount").val(parseFloat(balance).toFixed(8));
	}
	else
	{
		$("#amount").val('');
	}
}