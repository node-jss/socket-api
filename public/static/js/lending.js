$(function(){

    
    $('table tr.BTC').css({'background':'#9edfff'});
    $('#method_payment').on('change',function(){
        $('#amount_coin').val('');
        $('#amount_btc').val('');
        $('table tr').css({'background':'#fff'});
        $('table tr.'+$('#method_payment').val()+'').css({'background':'#9edfff'});
        $('.unit_payment').html($('#method_payment').val());
        $('#amount_btc').attr('placeholder',''+$('#method_payment').val()+'');
    });

    $('#frmLending #amount_usd').on('input propertychange', function(){
        $('#amount_bbl').val('Loading...');
        delay(function(){
            $.ajax({
                url: "/account/lending/load-price-lending",
                data: {
                   'amount_usd' : $('#amount_usd').val()
                },
                type: "POST",
                beforeSend: function() {

                },
                error: function(data) {

                },
                success: function(data) {
                    $('#frmLending #amount_bbl').val(data.result);
                }   
            });
        }, 600 );
    })


    $('#frmLending').on('submit', function(){
        if ($('#amount_bbl').val() == '' || isNaN($('#amount_usd').val()) || grecaptcha.getResponse() == 0){
            return false;
        }

        swal({
          title: "Lending confirmation",
          text: "You are confirming to Lending "+$('#amount_usd').val()+" USD with "+$('#amount_bbl').val()+" BBL Estimated value",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        }, function () {
            setTimeout(function() {
                $('#frmLending').ajaxSubmit({
                    beforeSend: function() {
                        
                        $('#frmLending button[type="submit"]').button('loading');
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
                        $('#frmLending button[type="submit"]').button('reset');
                    },
                    success: function(result) 
                    {
                        grecaptcha.reset();
                        swal({
                            type: "success",
                            title: "Lending Successful",
                            text:'Your lending request is successfully processed !',
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
