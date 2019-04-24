$(function(){

    $('#js-countDown').yuukCountDown({
        starttime: '2011/11/10 00:00:00',
        endtime: '2017/12/4 00:00:00',
        notStartCallBack: function(time){
            
        },
        startCallBack: function(time){
           
        },
        endCallBack: function(time){
                
        }
    });

    $('#js-countDown-lending').yuukCountDown({
        starttime: '2011/11/10 00:00:00',
        endtime: '2017/12/20 00:00:00',
        notStartCallBack: function(time){
            
        },
        startCallBack: function(time){
           
        },
        endCallBack: function(time){
                
        }
    });
    
    $('#js-countDown-exchange').yuukCountDown({
        starttime: '2011/11/10 00:00:00',
              endtime: '2018/1/10 00:00:00',
        notStartCallBack: function(time){
            
        },
        startCallBack: function(time){
           
        },
        endCallBack: function(time){
                
        }
    });
    $('table tr.BTC').css({'background':'#9edfff'});
    $('#method_payment').on('change',function(){
        $('#amount_coin').val('');
        $('#amount_btc').val('');
        $('table tr').css({'background':'#fff'});
        $('table tr.'+$('#method_payment').val()+'').css({'background':'#9edfff'});
        $('.unit_payment').html($('#method_payment').val());
        $('#amount_btc').attr('placeholder',''+$('#method_payment').val()+'');
    });

    $('#frmICO #amount_coin').on('input propertychange', function(){
        $('#amount_btc').val('Loading...');
        delay(function(){
            $.ajax({
                url: "/account/ico/price-coin-alt",
                data: {
                   'payment_method' : $('#method_payment').val(),
                   'amount_coin' : $('#amount_coin').val()
                },
                type: "POST",
                beforeSend: function() {

                },
                error: function(data) {

                },
                success: function(data) {
                    $('#frmICO #amount_btc').val(data.result);
                }
                    
            });
        }, 600 );
    })


    $('#frmICO').on('submit', function(){
        if ($('#amount_coin').val() == '' || isNaN($('#amount_coin').val()) || grecaptcha.getResponse() == 0){
            return false;
        }

        swal({
          title: "ICO purchasing confirmation",
          text: "You are confirming to buy "+$('#amount_coin').val()+" BBL with the price is USD "+$('#price_ico_usd').text()+" Estimated value "+$('#amount_btc').val()+" "+$('#method_payment').val()+"",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        }, function () {
            setTimeout(function() {
                $('#frmICO').ajaxSubmit({
                    beforeSend: function() {
                        
                        $('#frmICO button[type="submit"]').button('loading');
                    },
                    error: function(result) 
                    {
                        grecaptcha.reset();
                        var message = result.responseJSON.message;
                        swal({
                            title: "",
                            type: "error",
                            text:message,
                            showConfirmButton: true
                        })
                        $('#frmICO button[type="submit"]').button('reset');
                    },
                    success: function(result) 
                    {
                        grecaptcha.reset();
                        swal({
                            type: "success",
                            title: "Order Successful",
                            text:'Your ICO purchase order has been placed successfully !',
                            showConfirmButton: true
                        },
                        function(isConfirm) {
                              if (isConfirm) {
                                location.reload(true);
                              }
                          })
                        setTimeout(function() {
                            location.reload(true);
                        }, 9000);
                    }
                });
            }, 1000);
        });
        return false;
    });

    $('.remove_order_ico').on('click',function(){
        swal({
          title: "Confirm cancellation",
          text: "Are you sure you want to cancel the ICO purchase order?",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        }, function () {
            $.ajax({
                url: "/account/balance/remove-order-ico",
                data: {
                    'id' : $('.remove_order_ico').data('id')
                },
                type: "POST",
                async : true,
                beforeSend: function() {
                },
                error: function(data) {
                },
                success: function(data) {
                    location.reload('true');
                }
            });
        })
        
    });

})


function showNotification(from, align, msg, type) {
    var color = Math.floor((Math.random() * 6) + 1);
    $.notify({
        icon: "notifications",
        message: msg
    }, {
        type: type,
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
