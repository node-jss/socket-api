var loadInterval;
var html_loadding = '<div class="ajax-loading"><span><i class="fa fa-spinner fa-pulse"></i> Loadding ...</span></div>';
vnTExchange = {


    templateConfirm:function(data)
    {

        var html = '<div id="form-container"><form role="form" class="form-horizontal">'

          + '<div class="form-group"  >'
          + '<div class="col-sm-4">Quantity:</div>'
          + '<div class="col-sm-8"><div class="input-group"><input class="form-control text-right number_vnd"  readonly="readonly" value="'+data.amount+'" type="text"><span class="input-group-addon">'+data.coin+'</span></div></div>'
          + '</div>'

          + '<div class="form-group"  >'
          + '<div class="col-sm-4">Price:</div>'
          + '<div class="col-sm-8"><div class="input-group"><input class="form-control text-right number_vnd"  readonly="readonly" value="'+numberFormat(data.price)+'" type="text"><span class="input-group-addon">VNĐ</span></div></div>'
          + '</div>'

          + '<div class="form-group"  >'
          + '<div class="col-sm-4">Subtotal:</div>'
          + '<div class="col-sm-8"><div class="input-group"><input class="form-control text-right number_vnd"  readonly="readonly" value="'+numberFormat(data.price_trade)+'" type="text"><span class="input-group-addon">VNĐ</span></div></div>'
          + '</div>'

          + '<div class="form-group"  >'
          + '<div class="col-sm-4">Commission:</div>'
          + '<div class="col-sm-8"><div class="input-group"><input class="form-control text-right number_vnd"  readonly="readonly" value="'+numberFormat(data.price_fee)+'" type="text"><span class="input-group-addon">VNĐ</span></div></div>'
          + '</div>'

          + '<div class="form-group"  >'
          + '<div class="col-sm-4">Total:</div>'
          + '<div class="col-sm-8"><div class="input-group"><input class="form-control text-right number_vnd"  readonly="readonly" value="'+numberFormat(data.price_total)+'" type="text"><span class="input-group-addon">VNĐ</span></div></div>'
          + '</div>'

          + '</form></div>'

          + '<div class="bs-callout bs-callout-warning">'
          + '<h4>Disclaimer</h4>'
          + ' <p>Please verify this order before confirming. All orders are final once submitted and we will be unable to issue you a refund.</p>'
          + '</div>';


        return html;
    },

    do_Buy:function(coin)
    {
        var amount =$("#buy_amount").val();
        var price =  $("#buy_price").val();
        var fee =  $("#buy_fee").val();
        price.replace(/\$|\,/g,'');


        var ok_send = 1;
        if(amount==0 || amount=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_amount_empty']);
        }
        if(price==0 || price=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_price_empty']);
        }

        if(ok_send==1){

            var price_trade = amount * price;
            var price_fee =  ( fee/100) * price_trade;
            var price_total = price_trade + price_fee ;

            var data_tpl = {"coin":coin,"price": price ,"amount": amount ,"price_trade": price_trade  ,"price_fee": price_fee  ,"price_total": price_total };

            var html = vnTExchange.templateConfirm(data_tpl);
            alertify.confirm('Confirm', html,
              function(){

                  var mydata = 'coin='+coin+'&amount='+amount+'&price='+price;
                  $.ajax({
                      async: true,
                      dataType: 'json',
                      url:  ROOT_MOD+"/ajax/buy.html" ,
                      type: 'POST',
                      data: mydata ,
                      success: function (data) {
                          if(data.ok){
                              vnTExchange.reLoadExchange();
                              $("#buy_has_vnd").attr("data-price",data.price_vnd);
                              $("#buy_has_vnd").html('<span class="number_vnd">'+data.price_vnd+'</span>');
                              $("#stop_has_price").attr("data-price",data.price_vnd);
                              $("#stop_has_price").html('<span class="number_vnd">'+data.price_vnd+'</span>');
                              
                              alertify.alert().set({onshow:function(){setTimeout(function() {alertify.alert().close();}, 3000);}});
                              alertify.alert(js_lang['announce'],data.mess );

                          }else{
                              alertify.alert(js_lang['error'],data.mess);
                          }

                      }
                  });

              },
              function(){  }
            );


        }


    },

    do_Sell:function(coin)
    {
        var amount =$("#sell_amount").val();
        var price =  $("#sell_price").val();
        var fee =  $("#sell_fee").val();
        price.replace(/\$|\,/g,'');

        var ok_send = 1;
        if(amount==0 || amount=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_amount_empty']);
        }
        if(price==0 || price=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_price_empty']);
        }
        if(ok_send){

            var price_trade = amount * price;
            var price_fee =  ( fee/100) * price_trade;
            var price_total = price_trade - price_fee ;

            var data_tpl = {"coin":coin,"price": price ,"amount": amount ,"price_trade": price_trade  ,"price_fee": price_fee  ,"price_total": price_total };
            var html = vnTExchange.templateConfirm(data_tpl);
            alertify.confirm('Confirm', html,
              function(){

                  var mydata = 'coin='+coin+'&amount='+amount+'&price='+price;
                  $.ajax({
                      async: true,
                      dataType: 'json',
                      url:  ROOT_MOD+"/ajax/sell.html" ,
                      type: 'POST',
                      data: mydata ,
                      success: function (data) {
                          if(data.ok){
                              vnTExchange.reLoadExchange();
                              $("#sell_has_coin").attr("data-amount",data.coin_mount);
                              $("#sell_has_coin").html(data.coin_mount);
                              $("#stop_has_coin").attr("data-amount",data.coin_mount);
                              $("#stop_has_coin").html(data.coin_mount);

                              alertify.alert().set({onshow:function(){setTimeout(function() {alertify.alert().close();}, 3000);}});
                              alertify.alert(js_lang['announce'],data.mess  );
                          }else{
                              alertify.alert(js_lang['error'],data.mess);
                          }

                      }
                  });

              },
              function(){  }
            );



        }

    },

    do_StopLimit:function(type,coin)
    {
        var amount =$("#stop_Amount").val();
        var price_stop =  $("#stop_stop").val();
        price_stop.replace(/\$|\,/g,'');
        var price_limit =  $("#stop_limit").val();
        price_limit.replace(/\$|\,/g,'');


        var ok_send = 1;
        if(amount==0 || amount=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_amount_empty']);
        }
        if(price_stop==0 || price_stop=='' || price_limit==0 || price_limit=='' ){
            ok_send =0 ;
            alertify.alert(js_lang['error'],js_lang['err_price_empty']);
        }

        if(ok_send==1){

            if(type== "sell" ){
                var mess_confirm = js_lang['mess_stop_limit_sell'];

            }else{
                var mess_confirm = js_lang['mess_stop_limit_buy'];
            }

            mess_confirm = mess_confirm.replace(/{price_stop}/gi,$.number( price_stop, 0, '.', ','));
            mess_confirm = mess_confirm.replace(/{amount}/gi, amount +" "+coin);
            mess_confirm = mess_confirm.replace(/{price}/gi, $.number( price_limit, 0, '.', ',') );
 
            var html = '<div class="mess-confirm">'+mess_confirm+'</div>';
            alertify.confirm('Confirm', html,
              function(){

                  var mydata = 'type='+type+'&coin='+coin+'&price_stop='+price_stop+'&price_limit='+price_limit+'&amount='+amount;
                  $.ajax({
                      async: true,
                      dataType: 'json',
                      url:  ROOT_MOD+"/ajax/stop_limit.html" ,
                      type: 'POST',
                      data: mydata ,
                      success: function (data) {
                          if(data.ok){
                              vnTExchange.reLoadExchange();

                              alertify.alert().set({onshow:function(){setTimeout(function() {alertify.alert().close();}, 3000);}});
                              alertify.alert(js_lang['announce'],data.mess  );

                          }else{
                              alertify.alert(js_lang['error'],data.mess);
                          }

                      }
                  });


              },
              function(){  }
            );

        }


    },



    load_OrderBuy:function()
    {


        var mydata = 'coin='+coin  ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/order_buy.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                $("#ajax_order_buy").html(html_loadding);
            },
            success: function (data) {
                if(data.ok){
                    $("#ajax_order_buy").html(data.html);
                    $("#total_order_buy").html(data.total);

                    $("#order_buy tr").click(function(e){
                        var $amount = parseFloat($(this).find(".amount").data("amount"));
                        var $price = parseFloat($(this).find(".price").data("price"));
                        var $total = parseFloat($(this).find(".total").data("price"));
                        var $size =  $(this).prevAll().size();
                        if( $size > 0){
                            $(this).prevAll().each(function (e) {
                                $amount += parseFloat($(this).find(".amount").data("amount"));
                            });
                        }
                        $("#sell_amount").val($amount);
                        $("#sell_price").val($price);
                        $("#sell_total").val($total);

                        $("#buy_amount").val('');
                        $("#buy_price").val($price);
                        $("#buy_total").val('');
                    });
                    $("#buy_total").bind("blur keyup",function(e){
                        var $amount = $("#buy_amount").val();
                        var $total = $("#buy_total").val();
                        var $price = $("#buy_price").val();
                        $("#buy_amount").val(parseFloat($total / $price).toFixed(8));
                    });
                }

            }
        });



    },
    load_OrderSell:function()
    {

        var mydata = 'coin='+coin  ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/order_sell.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                $("#ajax_order_sell").html(html_loadding);
            },
            success: function (data) {
                if(data.ok){
                    $("#ajax_order_sell").html(data.html);
                    $("#total_order_sell").html(data.total);

                    $("#order_sell tr").click(function(e){
                        var $amount = parseFloat($(this).find(".amount").data("amount"));
                        var $price = parseFloat($(this).find(".price").data("price"));
                        var $total = parseFloat($(this).find(".total").data("price"));
                        var $size =  $(this).prevAll().size();
                        if( $size > 0){
                            $(this).prevAll().each(function (e) {
                                $amount += parseFloat($(this).find(".amount").data("amount"));
                            });
                        }
                        $("#buy_amount").val($amount);
                        $("#buy_price").val($price);
                        $("#buy_total").val($total);

                        $("#sell_amount").val('');
                        $("#sell_price").val($price);
                        $("#sell_total").val('');

                    });
                    $("#sell_total").bind("blur keyup",function(e){
                        var $amount = $("#sell_amount").val();
                        var $total = $("#sell_total").val();
                        var $price = $("#sell_price").val();
                        $("#sell_amount").val(parseFloat($total / $price).toFixed(8));
                    });
                }

            }
        });



    },

    load_BuySelOrder:function()
    {

        var mydata = 'coin='+coin  ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/buy_sell_order.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                $("#ajax_order_sell").html(html_loadding);
                $("#ajax_order_buy").html(html_loadding);
            },
            success: function (data) {

                if(data.buy_data){
                    var buy_html='';
                    for (var i = 0; i < data.buy_data.length; i++) {
                        item = data.buy_data[i];
                        buy_html += '<tr>';
                        buy_html += '<td style="width: 23%;" class="price" data-price="'+item.price+'"><span class="number_vnd">'+item.price+'</span></td>';
                        buy_html += '<td style="width: 23%;" class="amount" data-amount="'+item.amount+'">'+item.amount+'</td>';
                        buy_html += '<td style="width: 20%;" class="currency" data-price="'+item.total_price+'"><span class="number_vnd">'+item.total_price+'</span></td>';
                        buy_html += '<td style="width: 26%;" class="total" data-price="'+item.total_sum+'"><span class="number_vnd">'+item.total_sum+'</span></td>';
                        //thinn630
                        if(item.note == 1){
                            buy_html += '<td class="my_ico" style="text-align: center;"></td>'; 
                        }else{
                            buy_html += '<td style="width: 8%;"></td>';
                        }
                        buy_html += '</tr>';
                    }
                    $("#ajax_order_buy").html(buy_html);
                }
                if(data.sell_data){
                    var sell_html='';
                    for (var i = 0; i < data.sell_data.length; i++) {
                        item = data.sell_data[i];
                        sell_html += '<tr>';
                        sell_html += '<td style="width: 23%;" class="total" data-price="'+item.total_sum+'"><span class="number_vnd">'+item.total_sum+'</span></td>';
                        sell_html += '<td style="width: 23%;" class="currency" data-price="'+item.total_price+'"><span class="number_vnd">'+item.total_price+'</span></td>';
                        sell_html += '<td style="width: 23%;" class="amount" data-amount="'+item.amount+'">'+item.amount+'</td>';
                        sell_html += '<td style="width: 23%;" class="price" data-price="'+item.price+'"><span class="number_vnd">'+item.price+'</span></td>';
                        //thinn630
                        if(item.note == 1){
                            sell_html += '<td class="my_ico" style="text-align: center;"></td>'; 
                        }else{
                            sell_html += '<td style="width: 8%;"></td>';
                        }
          
                        sell_html += '</tr>';
                    }
                    $("#ajax_order_sell").html(sell_html);
                }

                $("#total_order_buy").html(data.buy_total);
                $("#total_order_sell").html(data.sell_total);


                vnTExchange.initBuySellOrder();
                $('.number_vnd').number( true, 0 );
            }
        });

    },


    load_MyOpenOrders:function(p)
    {

        var mydata = 'coin='+coin+'&p='+p ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/my_open_orders.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                if(p==0) {
                    $("#html_my_open_orders").html(html_loadding);
                }
            },
            success: function (data) {
                if(data.ok){
                    $("#html_my_open_orders").html(data.html);
                    $("#nav_my_open_orders").html(data.nav);

                    $('[data-toggle="tooltip"]').tooltip() ;
                }

            }
        });
    },

    doDelOrder:function(type,id)
    {

        var html = '<div class="mess-confirm">'+js_lang['are_you_sure_del']+'</div>';
        alertify.confirm('Confirm', html,
          function(){

              var mydata = 'coin='+coin+'&type='+type+'&id='+id ;
              $.ajax({
                  async: true,
                  dataType: 'json',
                  url:  ROOT_MOD+"/ajax/del_my_order.html" ,
                  type: 'POST',
                  data: mydata ,
                  success: function (data) {
                      if(data.ok){
                          $("#order-"+type+id).remove();
                          alertify.alert(js_lang['announce'],data.mess);
                      }else{
                          alertify.alert(js_lang['error'],data.mess);
                      }

                  }
              });


          },
          function(){  }
        );


    },



    load_TradeHistory:function(p)
    {

        var mydata = 'coin='+coin+'&p='+p ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/trade_history.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                if(p==0) {
                    $("#html_trade_history").html(html_loadding);
                }
            },
            success: function (data) {
                if(data.ok){
                    var html='';

                    for (var i = 0; i < data.items.length; i++) {
                        item = data.items[i];
                        html += '<tr>';
                        html += '<td class="text-center">'+ item.date_match +'</td>';
                        html += '<td class="text-center"><span class="command_'+ item.type +'">'+ item.text_type +'</span></td>';
                        html += '<td class="text-right"><span class="number_vnd">'+ item.price +'</span></td>';
                        html += '<td class="text-right">'+ item.amount +'</td>';
                        html += '<td class="text-right"><span class="number_vnd">'+ item.total_price +'</span></td>';
                        html += '</tr>';
                    }

                    $("#html_trade_history").html(html);
                    $("#nav_trade_history").html(data.nav);

                }

            }
        });



    },

    load_MyTradeHistory:function(p)
    {

        var mydata = 'coin='+coin+'&p='+p ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT_MOD+"/ajax/my_trade_history.html" ,
            type: 'POST',
            data: mydata ,
            beforeSend: function(){
                if(p==0){
                    $("#html_my_trade_history").html(html_loadding);
                }
            },
            success: function (data) {
                if(data.ok){
                    var html='';

                    for (var i = 0; i < data.items.length; i++) {
                        item = data.items[i];
                        html += '<tr>';
                        html += '<td class="text-center">'+ item.date_match +'</td>';
                        html += '<td class="text-center"><span class="command_'+ item.type +'">'+ item.text_type +'</span></td>';
                        html += '<td class="text-right"><span class="number_vnd">'+ item.price +'</span></td>';
                        html += '<td class="text-right">'+ item.amount +'</td>';
                        html += '<td class="text-right"><span class="number_vnd">'+ item.total_price +'</span></td>';
                        html += '</tr>';
                    }

                    $("#html_my_trade_history").html(html);
                    $("#nav_my_trade_history").html(data.nav);

                } 

            }
        });



    },


    load_Markets:function (json){
        $.each(json, function (key, data) {
            var marketObj ="market"+key;
            $("#"+marketObj+"_lastprice").html(data.last_price);
            $("#"+marketObj+"_coin24hr").html(data.coin_24hr);

            if(parseFloat(data.perChange24hr) < 0){
                perChange24hr = '<span class="color_down">'+data.perChange24hr+'</span>';
            }else{
                perChange24hr = '<span class="color_up">+'+data.perChange24hr+'</span>';
            }

            $("#"+marketObj+"_change24hr").html(perChange24hr);
            /*$.each(data, function (index, data) {

            })*/
        })
    },

    returnTicker:function (){
        var mydata = 'coin='+coin ;
        $.ajax({
            async: true,
            dataType: 'json',
            url:  ROOT+"api/ticker.php" ,
            type: 'POST',
            data: mydata ,
            success: function (data) {
                var last_price = data[coin].last_price;
                var last_price_thinn = data[coin].last_price;
                var perChange24hr = data[coin].high24hr ;
                var high24hr = data[coin].high24hr;
                var low24hr = data[coin].low24hr;
                var coin_24hr = data[coin].coin_24hr;
                var price_24hr = data[coin].price_24hr;
                var price_lowest_ask = data[coin].lowestAsk;
                var price_highest_bid =  data[coin].highestBid;

                if(parseFloat(data[coin].perChange24hr) < 0){
                    perChange24hr = '<span class="color_down">'+data[coin].perChange24hr+'%</span>';
                }else{
                    perChange24hr = '<span class="color_up">+'+data[coin].perChange24hr+'%</span>';
                }

                $("#last_price").html(last_price);
                $("#last_price_thinn").html(last_price_thinn);
                $("#change_24hr").html(perChange24hr);
                $("#high_24hr").html(high24hr);
                $("#low_24hr").html(low24hr);

                $("#coin_24hr").html(coin_24hr);
                $("#price_24hr").html(price_24hr);


                $("#buy_price_lowest").attr("data-price",price_lowest_ask);
                $("#buy_price_lowest").html('<span class="number_vnd">'+price_lowest_ask+'</span>');
                if($("#buy_price").val()=='' || $("#buy_price").val()==0) {
                    $("#buy_price").val(price_lowest_ask);
                }

                $("#sell_price_highest").attr("data-price",price_highest_bid);
                $("#sell_price_highest").html('<span class="number_vnd">'+price_highest_bid+'</span>');
                if($("#sell_price").val()=='' || $("#sell_price").val()==0) {
                    $("#sell_price").val(price_highest_bid);
                }

                vnTExchange.load_Markets(data) ;


                $('.number_vnd').number( true, 0 );

            }
        });

    },

    autoLoadExchange:function (){
        vnTExchange.returnTicker();
        /*vnTExchange.load_OrderBuy();
        vnTExchange.load_OrderSell();
        vnTExchange.load_TradeHistory(1);*/
    },

    reLoadExchange:function (){
        $("#sell_amount").val('');
        $("#sell_price").val('');
        $("#sell_total").val('');

        $("#buy_amount").val('');
        $("#buy_price").val('');
        $("#buy_total").val('');

        vnTExchange.returnTicker();
        vnTExchange.load_BuySelOrder();


        vnTExchange.load_MyOpenOrders(1);
        vnTExchange.load_OrderSell(1);
        vnTExchange.load_MyTradeHistory(0);
        vnTExchange.load_TradeHistory(0);
    },

    initBuySellOrder:function()
    {

        $("#order_sell tr").click(function(e){

            var $amount = parseFloat($(this).find(".amount").data("amount"));
            var $price = parseFloat($(this).find(".price").data("price"));
            var $total = parseFloat($(this).find(".total").data("price"));
            var $size =  $(this).prevAll().size();
            if( $size > 0){
                $(this).prevAll().each(function (e) {
                    $amount += parseFloat($(this).find(".amount").data("amount"));
                });
            }
            $("#buy_amount").val($amount);
            $("#buy_price").val($price);
            $("#buy_total").val($total);


            $("#sell_amount").val('');
            $("#sell_price").val($price);
            $("#sell_total").val('');

        });
        $("#order_buy tr").click(function(e){
            var $amount = parseFloat($(this).find(".amount").data("amount"));
            var $price = parseFloat($(this).find(".price").data("price"));
            var $total = parseFloat($(this).find(".total").data("price"));
            var $size =  $(this).prevAll().size();
            if( $size > 0){
                $(this).prevAll().each(function (e) {
                    $amount += parseFloat($(this).find(".amount").data("amount"));
                });
            }
            $("#sell_amount").val($amount);
            $("#sell_price").val($price);
            $("#sell_total").val($total);

            $("#buy_amount").val('');
            $("#buy_price").val($price);
            $("#buy_total").val('');

        });

    },

    init:function()
    {

        vnTExchange.initBuySellOrder();

        $(".style-scroll").mCustomScrollbar({
            theme:"light-thick",
            scrollbarPosition:"outside"
        });
        $(".table_makets tr").click(function (e) {
            var $href = $(this).data("link");
            window.location.href = $href;
        });

        $('.number_vnd').number( true, 0 );
        $('#buy_price , #buy_total , #buy_payment , #stop_stop , #stop_limit , #stop_total , #sell_price , #sell_total , #sell_payment').number( true, 0 );

        $( ".num_amount" ).on('input', function() {
            var value=$(this).val().replace(/[^0-9.]*/g, '');
            value=value.replace(/\.{2,}/g, '.');
            value=value.replace(/\.,/g, ',');
            value=value.replace(/\,\./g, ',');
            value=value.replace(/\,{2,}/g, ',');
            value=value.replace(/\.[0-9]+\./g, '.');
            $(this).val(value)

        });

        /*$(".num_amount").bind("blur keyup",function(e){
            var str = $(this).val();
            if(str.indexOf(".") != -1) {
                $(this).number( true, 8 );
            }
        });*/


        $("#buy_price , #buy_amount").bind("blur keyup",function(e){
            var $amount = $("#buy_amount").val();
            var $total = $("#buy_total").val();
            var $price = $("#buy_price").val();
            var $fee = parseFloat($("#buy_fee").val());

            var $price_trade = $amount * $price;
            var $price_fee =  ( $fee/100) * $price_trade;
            var $price_total = $price_trade + $price_fee ;

            $("#buy_total").val($price_total);
        });

        $("#buy_total").bind("blur keyup",function(e){
            var $total = $("#buy_total").val();
            var $price = $("#buy_price").val();
            var $fee = parseFloat($("#buy_fee").val());
            var $price_trade =   ($total*100) / (100 + $fee);
            var $buy_amount = parseFloat($price_trade / $price) ;
           // $("#ext_buy_amount").html($buy_amount) ;
            $("#buy_amount").val(truncateToDecimals($buy_amount,8));
        });

        $("#buy_has_vnd").click(function(e){
            var $total = $(this).data("price");
            $("#buy_total").val($total);
            $("#buy_total").trigger("blur");
        });
        $("#buy_price_lowest").click(function(e){
            var $price = $(this).data("price");
            $("#buy_price").val($price);
            $("#buy_price").trigger("blur");
        });



        $("#sell_price , #sell_amount").bind("blur keyup",function(e){
            var $amount = $("#sell_amount").val();
            var $total = $("#sell_total").val();
            var $price = $("#sell_price").val();

            var $fee = parseFloat($("#sell_fee").val());

            var $price_trade = $amount * $price;
            var $price_fee =  ( $fee/100) * $price_trade;
            var $price_total = $price_trade - $price_fee ;

            $("#sell_total").val($price_total);
        });
        $("#sell_total").bind("blur keyup",function(e){
            var $amount = $("#sell_amount").val();
            var $total = $("#sell_total").val();
            var $price = $("#sell_price").val();

            var $fee = parseFloat($("#sell_fee").val());
            var $price_trade =   ($total*100) / (100 - $fee);

            $("#sell_amount").val(parseFloat($price_trade / $price).toFixed(8));
        });

        $("#sell_has_coin").click(function(e){
            var $amount = $(this).data("amount");
            $("#sell_amount").val($amount);
            $("#sell_amount").trigger("blur");
        });

        $("#sell_price_highest").click(function(e){
            var $price = $(this).data("price");
            $("#sell_price").val($price);
            $("#sell_price").trigger("blur");
        });


        $("#stop_limit , #stop_Amount").bind("blur keyup",function(e){
            var $amount = $("#stop_Amount").val();
            var $total = $("#stop_total").val();
            var $price = $("#stop_limit").val();
            $("#stop_total").val($amount * $price);
        });
        $("#stop_total").bind("blur keyup",function(e){
            var $amount = $("#stop_Amount").val();
            var $total = $("#stop_total").val();
            var $price = $("#stop_limit").val();
            $("#stop_Amount").val(parseFloat($total / $price).toFixed(8));
        });


        $("#stop_has_coin").click(function(e){
            var $amount = $(this).data("amount");
            var $total = $("#stop_total").val();
            var $price = $("#stop_limit").val();
            $("#stop_Amount").val($amount);
            $("#stop_total").val($amount * $price);
        });

        $("#stop_has_price").click(function(e){
            var $amount = $("#stop_Amount").val();
            var $total = $(this).data("price");
            var $price = $("#stop_limit").val();
            $("#stop_total").val($total);
            $("#stop_Amount").val(parseFloat($total / $price).toFixed(8));
        });

        $(".clear_action").click(function(e){
            alertify.confirm("Are you clear ?",
              function(){
                  alertify.success('Ok');
              },
              function(){
                  alertify.error('Cancel');
              }).setHeader('Report');
        });



        $("#tab_market li:first a").addClass("current");
        var $data_id = '#' + $("#tab_market li:first a").data("id");
        $($data_id).addClass("current");
        $("#tab_market li a").click(function(e){
            if($(this).parents("#markets_coin").hasClass("acitve-hidden")){
                $(this).parents(".show_hide").removeClass("acitve-hidden");
                $(this).parents(".show_hide").find(".content-sh").stop().slideToggle(700,function(){
                    $(this).css({'height':'auto'});
                });
            }
            if(! $(this).hasClass("current")){
                var $data_id = '#' + $(this).data("id");
                $("#tab_market li a").removeClass("current");
                $(this).addClass("current");
                $("#markets_coin .item").removeClass("current");
                $($data_id).addClass("current");
            }
        });
        $("#tab_trade_title li:first a").addClass("current");
        var $data_id_trade = '#' + $("#tab_trade_title li:first a").data("id");
        $($data_id_trade).addClass("current");
        $("#tab_trade_title li a").click(function(e){
            if(! $(this).hasClass("current")){
                var $data_id_trade = '#' + $(this).data("id");
                $("#tab_trade_title li a").removeClass("current");
                $(this).addClass("current");
                $("#tab_trade_content .style_box_table").removeClass("current");
                $($data_id_trade).addClass("current");
            }
        });
        $(".show_hide .icon-sh a").click(function(e){
            if(! $(this).parents(".show_hide").hasClass("acitve-hidden")){
                $(this).parents(".show_hide").addClass("acitve-hidden");
                $(this).parents(".show_hide").find(".content-sh").stop().slideToggle(700,function(){
                    $(this).css({'height':'auto'});
                });
            }else{
                $(this).parents(".show_hide").removeClass("acitve-hidden");
                $(this).parents(".show_hide").find(".content-sh").stop().slideToggle();
            }
        });


        var $width = $(window).innerWidth();
        $(window).resize(function(){
            var $ww = $(window).innerWidth();
            if($ww > 991){
                if($width <= 991){
                    $(".show_hide").removeClass("acitve-hidden");
                    $(".show_hide .content-sh").css({'display':'block'});
                }
            }else{
                if($width > 991){
                    $(".show_hide").removeClass("acitve-hidden");
                    $(".show_hide .content-sh").css({'display':'block'});
                }
            }
            $width = $ww;
        });

    }
};


$(document).ready(function(){
    vnTExchange.init();
    clearInterval(loadInterval);
    loadInterval = setInterval(vnTExchange.autoLoadExchange, timeRefreshInterval);
});
