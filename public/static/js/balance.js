function GetFormattedDate(todayTime) {
    var todayTime = new Date(todayTime);
    var month = (todayTime .getMonth() + 1);
    var day = (todayTime .getDate());
    var year = (todayTime .getFullYear());
    
    return month + "/" + day + "/" + year;
}
$(function(){

    load_withdraw_finish();
    load_withdraw_pendding();
    load_deposit_finish();
    load_deposit_pending();

    $('span[data-target="#modalDepositMONA"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'MONA'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositMONA .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositMONA"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositMONA').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositMONA"]').button('reset');
                    $('#modalDepositMONA .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositMONA #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositMONA .modal-body .wallets').html(html);
                    $('#modalDepositMONA #inputaddress').val(data.wallet);
                    $('#modalDepositMONA #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
                
            }
        });
    });
    
    $('span[data-target="#modalDepositLBC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'LBC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositLBC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositLBC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositLBC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositLBC"]').button('reset');
                    $('#modalDepositLBC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositLBC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositLBC .modal-body .wallets').html(html);
                    $('#modalDepositLBC #inputaddress').val(data.wallet);
                    $('#modalDepositLBC #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
                
            }
        });
    });

    $('span[data-target="#modalDepositSMART"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'SMART'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositSMART .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositSMART"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositSMART').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositSMART"]').button('reset');
                    $('#modalDepositSMART .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositSMART #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositSMART .modal-body .wallets').html(html);
                    $('#modalDepositSMART #inputaddress').val(data.wallet);
                    $('#modalDepositSMART #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
                
            }
        });
    });

    $('span[data-target="#modalDepositETH"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'ETH'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositETH .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositETH"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositETH').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositETH"]').button('reset');
                    $('#modalDepositETH .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositETH #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositETH .modal-body .wallets').html(html);
                    $('#modalDepositETH #inputaddress').val(data.wallet);
                    $('#modalDepositETH #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
                
            }
        });
    });

    $('span[data-target="#modalDepositXZC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'XZC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositXZC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositXZC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositXZC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositXZC"]').button('reset');
                    $('#modalDepositXZC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositXZC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositXZC .modal-body .wallets').html(html);
                    $('#modalDepositXZC #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositBTG"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'BTG'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositBTG .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositBTG"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositBTG').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositBTG"]').button('reset');
                    $('#modalDepositBTG .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositBTG #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositBTG .modal-body .wallets').html(html);
                    $('#modalDepositBTG #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositSTC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'STC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositSTC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositSTC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositSTC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositSTC"]').button('reset');
                    $('#modalDepositSTC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositSTC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositSTC .modal-body .wallets').html(html);
                    $('#modalDepositSTC #inputaddress').val(data.wallet);
                    $('#modalDepositSTC #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositCUP"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'CUP'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositCUP .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositCUP"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositCUP').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositCUP"]').button('reset');
                    $('#modalDepositCUP .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositCUP #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositCUP .modal-body .wallets').html(html);
                    $('#modalDepositCUP #inputaddress').val(data.wallet);
                    $('#modalDepositCUP #address-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + data.wallet + '" alt="">');
                }, 1000);
            }
        });
    });


    $('span[data-target="#modalDepositBCC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'BCC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositBCC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositBCC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositBCC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositBCC"]').button('reset');
                    $('#modalDepositBCC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositBCC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositBCC .modal-body .wallets').html(html);
                    $('#modalDepositBCC #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });

    /*$('span[data-target="#modalDepositXVG"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'XVG'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositXVG .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositXVG"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositXVG').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositXVG"]').button('reset');
                    $('#modalDepositXVG .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositXVG #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositXVG .modal-body .wallets').html(html);
                    $('#modalDepositXVG #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });*/

    $('span[data-target="#modalDepositDASH"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'DASH'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositDASH .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositDASH"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositDASH').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositDASH"]').button('reset');
                    $('#modalDepositDASH .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositDASH #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositDASH .modal-body .wallets').html(html);
                    $('#modalDepositDASH #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositLTC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'LTC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositLTC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositLTC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositLTC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositLTC"]').button('reset');
                    $('#modalDepositLTC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositLTC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositLTC .modal-body .wallets').html(html);
                    $('#modalDepositLTC #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositBTC"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'BTC'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositBTC .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositBTC"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositBTC').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositBTC"]').button('reset');
                    $('#modalDepositBTC .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositBTC #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositBTC .modal-body .wallets').html(html);
                    $('#modalDepositBTC #inputaddress').val(data.wallet);
                    $('#modalDepositBTC #address-qr').html('<img src="https://chart.googleapis.com/chart?chs=200x200&amp;cht=qr&amp;chl=' + data.wallet + '" alt="">');
                }, 1000);
            }
        });
    });

    $('span[data-target="#modalDepositBCH"]').on('click',function(){
        $.ajax({
            url: "/account/balance/get-wallet",
            data: {
                type : 'BCH'
            },
            type: "POST",
            beforeSend: function() {
                
                $('#modalDepositBCH .modal-body .wallets').html('<img src="/static/img/ajax-loading.gif" alt="Amc loading" style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">');
            },
            error: function(data) {
                $('span[data-target="#modalDepositBCH"]').button('reset');
                var message = data.responseJSON.message;
                showNotification('top', 'right', message, 'danger');
                $('#modalDepositBCH').modal('hide');
            },
            success: function(data) {
                setTimeout(function() {
                    $('span[data-target="#modalDepositBCH"]').button('reset');
                    $('#modalDepositBCH .modal-body .wallets').html('');
                    var html = ` <div class="address-wallet"> <div class="AccountDepositAddress"> <div class="box-center"> <div class="img-circle" id="address-qr"></div> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-social btn-fill btn-twitter copy" data-clipboard-action="copy" data-clipboard-target="#modalDepositBCH #inputaddress" type="button"> <div class="icon dripicons-copy"></div> Copy </button> </span> <input id="inputaddress" readonly="" type="text" value="" class="form-control"> </div> </div> </div> `;
                    $('#modalDepositBCH .modal-body .wallets').html(html);
                    $('#modalDepositBCH #inputaddress').val(data.wallet);
                }, 1000);
            }
        });
    })
    
    $('#frmWihtdrawSMART').on('submit', function(){
        $('#modalWithdrawSMART').modal('toggle');

        $('#Confirm-Submit-SMART input[name="address"]').val($('#frmWihtdrawSMART #address').val());
        $('#Confirm-Submit-SMART input[name="amount"]').val($('#frmWihtdrawSMART #amount_withdraw').val());

        $('#modalWithdrawConfirmSMART').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmSMART .alert').hide();
        $('#Confirm-Submit-SMART').on('submit',function(){
            $('#modalWithdrawConfirmSMART .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-SMART button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmSMART .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-SMART button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal SMART is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawLBC').on('submit', function(){
        $('#modalWithdrawLBC').modal('toggle');

        $('#Confirm-Submit-LBC input[name="address"]').val($('#frmWihtdrawLBC #address').val());
        $('#Confirm-Submit-LBC input[name="amount"]').val($('#frmWihtdrawLBC #amount_withdraw').val());

        $('#modalWithdrawConfirmLBC').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmLBC .alert').hide();
        $('#Confirm-Submit-LBC').on('submit',function(){
            $('#modalWithdrawConfirmLBC .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-LBC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmLBC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-LBC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal LBC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawMONA').on('submit', function(){
        $('#modalWithdrawMONA').modal('toggle');

        $('#Confirm-Submit-MONA input[name="address"]').val($('#frmWihtdrawMONA #address').val());
        $('#Confirm-Submit-MONA input[name="amount"]').val($('#frmWihtdrawMONA #amount_withdraw').val());

        $('#modalWithdrawConfirmMONA').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmMONA .alert').hide();
        $('#Confirm-Submit-MONA').on('submit',function(){
            $('#modalWithdrawConfirmMONA .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-MONA button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmMONA .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-MONA button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal MONA is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawXZC').on('submit', function(){
        $('#modalWithdrawXZC').modal('toggle');

        $('#Confirm-Submit-XZC input[name="address"]').val($('#frmWihtdrawXZC #address').val());
        $('#Confirm-Submit-XZC input[name="amount"]').val($('#frmWihtdrawXZC #amount_withdraw').val());

        $('#modalWithdrawConfirmXZC').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmXZC .alert').hide();
        $('#Confirm-Submit-XZC').on('submit',function(){
            $('#modalWithdrawConfirmXZC .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-XZC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmXZC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-XZC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal XZC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawETH').on('submit', function(){
        $('#modalWithdrawETH').modal('toggle');

        $('#Confirm-Submit-ETH input[name="address"]').val($('#frmWihtdrawETH #address').val());
        $('#Confirm-Submit-ETH input[name="amount"]').val($('#frmWihtdrawETH #amount_withdraw').val());

        $('#modalWithdrawConfirmETH').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmETH .alert').hide();
        $('#Confirm-Submit-ETH').on('submit',function(){
            $('#modalWithdrawConfirmETH .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-ETH button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmETH .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-ETH button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal ETH is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawBTG').on('submit', function(){
        $('#modalWithdrawBTG').modal('toggle');

        $('#Confirm-Submit-BTG input[name="address"]').val($('#frmWihtdrawBTG #address').val());
        $('#Confirm-Submit-BTG input[name="amount"]').val($('#frmWihtdrawBTG #amount_withdraw').val());

        $('#modalWithdrawConfirmBTG').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmBTG .alert').hide();
        $('#Confirm-Submit-BTG').on('submit',function(){
            $('#modalWithdrawConfirmBTG .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-BTG button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmBTG .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-BTG button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal BTG is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawBCC').on('submit', function(){
        
        $('#modalWithdrawBCC').modal('toggle');

        $('#Confirm-Submit-BCC input[name="address"]').val($('#frmWihtdrawBCC #address').val());
        $('#Confirm-Submit-BCC input[name="amount"]').val($('#frmWihtdrawBCC #amount_withdraw').val());

        $('#modalWithdrawConfirmBCC').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmBCC .alert').hide();
        $('#Confirm-Submit-BCC').on('submit',function(){
            $('#modalWithdrawConfirmBCC .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-BCC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmBCC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-BCC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal BCC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawDASH').on('submit', function(){
        $('#modalWithdrawDASH').modal('toggle');

        $('#Confirm-Submit-DASH input[name="address"]').val($('#frmWihtdrawDASH #address').val());
        $('#Confirm-Submit-DASH input[name="amount"]').val($('#frmWihtdrawDASH #amount_withdraw').val());

        $('#modalWithdrawConfirmDASH').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmDASH .alert').hide();
        $('#Confirm-Submit-DASH').on('submit',function(){
            $('#modalWithdrawConfirmDASH .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-DASH button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmDASH .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-DASH button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal DASH is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawLTC').on('submit', function(){
        $('#modalWithdrawLTC').modal('toggle');

        $('#Confirm-Submit-LTC input[name="address"]').val($('#frmWihtdrawLTC #address').val());
        $('#Confirm-Submit-LTC input[name="amount"]').val($('#frmWihtdrawLTC #amount_withdraw').val());

        $('#modalWithdrawConfirmLTC').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmLTC .alert').hide();
        $('#Confirm-Submit-LTC').on('submit',function(){
            $('#modalWithdrawConfirmLTC .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-LTC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmLTC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-LTC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal LTC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });


   
    $('#frmWihtdrawBCH').on('submit', function(){
        $('#modalWithdrawBCH').modal('toggle');

        $('#Confirm-Submit-BCH input[name="address"]').val($('#frmWihtdrawBCH #address').val());
        $('#Confirm-Submit-BCH input[name="amount"]').val($('#frmWihtdrawBCH #amount_withdraw').val());

        $('#modalWithdrawConfirmBCH').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmBCH .alert').hide();
        $('#Confirm-Submit-BCH').on('submit',function(){
            $('#modalWithdrawConfirmBCH .alert').hide();

            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-BCH button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmBCH .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-BCH button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal BCH is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000);
                }
            });
            return false;
        })
        return false;
    });


    $('#frmWihtdrawBTC').on('submit', function(){
        $('#modalWithdrawBTC').modal('toggle');

        $('#Confirm-Submit-BTC input[name="address"]').val($('#frmWihtdrawBTC #address').val());
        $('#Confirm-Submit-BTC input[name="amount"]').val($('#frmWihtdrawBTC #amount_withdraw').val());

        $('#modalWithdrawConfirmBTC').modal({
            show: 'true'
        }); 
        $('#modalWithdrawConfirmBTC .alert').hide();
        $('#Confirm-Submit-BTC').on('submit',function(){
            $('#modalWithdrawConfirmBTC .alert').hide();
            $(this).ajaxSubmit({
                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-BTC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmBTC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-BTC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal BTC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 4500);
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawSTC').on('submit', function(){
        $('#modalWithdrawSTC').modal('toggle');
        $('#Confirm-Submit-STC input[name="address"]').val($('#frmWihtdrawSTC #address').val());
        $('#Confirm-Submit-STC input[name="amount"]').val($('#frmWihtdrawSTC #amount_withdraw').val());

        $('#modalWithdrawConfirmSTC').modal({
            show: 'true'
        }); 
        
        $('#modalWithdrawConfirmSTC .alert').hide();
        $('#Confirm-Submit-STC').on('submit',function(){
            
            $('#modalWithdrawConfirmSTC .alert').hide();
           
            $('#Confirm-Submit-STC').ajaxSubmit({

                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-STC button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmSTC .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-STC button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    $('#Confirm-Submit-STC button[type="submit"]').button('reset');
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal STC is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000)
                }
            });
            return false;
        })
        return false;
    });

    $('#frmWihtdrawCUP').on('submit', function(){
        $('#modalWithdrawCUP').modal('toggle');
        $('#Confirm-Submit-CUP input[name="address"]').val($('#frmWihtdrawCUP #address').val());
        $('#Confirm-Submit-CUP input[name="amount"]').val($('#frmWihtdrawCUP #amount_withdraw').val());

        $('#modalWithdrawConfirmCUP').modal({
            show: 'true'
        }); 
        
        $('#modalWithdrawConfirmCUP .alert').hide();
        $('#Confirm-Submit-CUP').on('submit',function(){
            
            $('#modalWithdrawConfirmCUP .alert').hide();
           
            $('#Confirm-Submit-CUP').ajaxSubmit({

                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-CUP button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmCUP .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-CUP button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    $('#Confirm-Submit-CUP button[type="submit"]').button('reset');
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal CUP is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000)
                }
            });
            return false;
        })
        return false;
    });

$('#frmWihtdrawXVG').on('submit', function(){
        $('#modalWithdrawXVG').modal('toggle');
        $('#Confirm-Submit-XVG input[name="address"]').val($('#frmWihtdrawXVG #address').val());
        $('#Confirm-Submit-XVG input[name="amount"]').val($('#frmWihtdrawXVG #amount_withdraw').val());

        $('#modalWithdrawConfirmXVG').modal({
            show: 'true'
        }); 
        
        $('#modalWithdrawConfirmXVG .alert').hide();
        $('#Confirm-Submit-XVG').on('submit',function(){
            
            $('#modalWithdrawConfirmXVG .alert').hide();
           
            $('#Confirm-Submit-XVG').ajaxSubmit({

                beforeSend: function() {
                    $('.token_crt').val('');
                    $('#Confirm-Submit-XVG button[type="submit"]').button('loading');
                },
                error: function(result) 
                {
                    load_token();
                    if (result.responseJSON.message != 'Network Error')
                    {
                        $('#modalWithdrawConfirmXVG .alert').show().html(result.responseJSON.message);
                        $('#Confirm-Submit-XVG button[type="submit"]').button('reset');
                    }
                    else
                    {
                        setTimeout(function(){ location.reload(true); }, 4500);
                    }
                },
                success: function(result) 
                {
                    $('#Confirm-Submit-XVG button[type="submit"]').button('reset');
                    swal({
                    title: "Withdraw Success",
                        type: 'success',
                        text:"Please wait, your Withdrawal XVG is being processed.",
                        timer: 4000,
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload(true);
                    }, 5000)
                }
            });
            return false;
        })
        return false;
    });


    $('#modalWithdrawBTC #amount').on('input propertychange',function(){
        $('#modalWithdrawBTC #amount_withdraw').val(
            ((($('#modalWithdrawBTC #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawSTC #amount').on('input propertychange',function(){
        $('#modalWithdrawSTC #amount_withdraw').val(
            ((($('#modalWithdrawSTC #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawCUP #amount').on('input propertychange',function(){
        $('#modalWithdrawCUP #amount_withdraw').val(
            ((($('#modalWithdrawCUP #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });h

    $('#modalWithdrawCUP #amount').on('input propertychange',function(){
         $('#modalWithdrawCUP #amount_withdraw').val(
            ((($('#modalWithdrawCUP #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });

    
    $('#modalWithdrawBTG #amount').on('input propertychange',function(){
         $('#modalWithdrawBTG #amount_withdraw').val(
            ((($('#modalWithdrawBTG #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawBCH #amount').on('input propertychange',function(){
        $('#modalWithdrawBCH #amount_withdraw').val(
            ((($('#modalWithdrawBCH #amount').val() * 100000000) - (0.001 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawLTC #amount').on('input propertychange',function(){
        $('#modalWithdrawLTC #amount_withdraw').val(
            ((($('#modalWithdrawLTC #amount').val() * 100000000) - (0.01 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawDASH #amount').on('input propertychange',function(){
        $('#modalWithdrawDASH #amount_withdraw').val(
            ((($('#modalWithdrawDASH #amount').val() * 100000000) - (0.002 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawBCC #amount').on('input propertychange',function(){
        $('#modalWithdrawBCC #amount_withdraw').val(parseFloat($('#modalWithdrawBCC #amount').val())-0.001);
    });

    $('#modalWithdrawXVG #amount').on('input propertychange',function(){
        $('#modalWithdrawXVG #amount_withdraw').val(
            ((($('#modalWithdrawXVG #amount').val() * 100000000) - (0.2 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawXZC #amount').on('input propertychange',function(){
        $('#modalWithdrawXZC #amount_withdraw').val(
            ((($('#modalWithdrawXZC #amount').val() * 100000000) - (0.02 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawETH #amount').on('input propertychange',function(){
        $('#modalWithdrawETH #amount_withdraw').val(
            ((($('#modalWithdrawETH #amount').val() * 100000000) - (0.002 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawSMART #amount').on('input propertychange',function(){
        $('#modalWithdrawSMART #amount_withdraw').val(
            ((($('#modalWithdrawSMART #amount').val() * 100000000) - (0.02 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawLBC #amount').on('input propertychange',function(){
        $('#modalWithdrawLBC #amount_withdraw').val(
            ((($('#modalWithdrawLBC #amount').val() * 100000000) - (0.02 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('#modalWithdrawMONA #amount').on('input propertychange',function(){
        $('#modalWithdrawMONA #amount_withdraw').val(
            ((($('#modalWithdrawMONA #amount').val() * 100000000) - (0.02 * 100000000)) / 100000000).toFixed(8)
        );
    });

    $('.withdraw_button').on('click',function(){
        load_token();
    });


    $('.reload_history_transaction').on('click',function(){
        $(this).addClass('active');
        var type = $(this).data('type');
        type === 'pending_deposit' && load_deposit_pending();
        type === 'finish_deposit' && load_deposit_finish();
        type === 'pending_withdraw' && load_withdraw_pendding();
        type === 'finish_withdraw' && load_withdraw_finish();
    })

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

function load_token(){
    $.ajax({
        url: "/token_crt",
        data: {},
        type: "GET",
        beforeSend: function() {},
        error: function(data) {},
        success: function(data) {
            $('.token_crt').val(data.token);
        }
    });
}

function load_deposit_pending() {
    $.ajax({
        url: "/account/balance/history-deposit-pending",
        data: {},
        type: "GET",
        beforeSend: function() {
        },
        error: function() {},
        success: function(data) {
            $('.reload_history_transaction').removeClass('active');
            var html = `<div class="material-datatables"> <table id="list-yourinvestssss" class="table table-striped table-bordered table-hover" style="width:100%;cellspacing:0" > <thead> <tr> <th>Date</th>  <th>Amount </th> <th>Units</th><th>Confirmation</th><th>Tx id</th> </tr> </thead> <tbody> </tbody> </table> </div> `;
            $('#history-deposit-pending').html(html);
            $('#list-yourinvestssss').DataTable({
                "order": [
                    [0, "desc"]
                ],
                autoWidth: false,
                searching: false,
                ordering: true,
                responsive: true,
                lengthChange: false,
                destroy: true,
                paging: true,
                info: false,
                data: data.result,
                columns: [{
                    data: 'date'
                }, {
                    data: 'amount'
                }, {
                    data: 'type'
                },
                 {
                    data: 'confirm'
                }
                , {
                    data: 'txid'
                }]
            });
            
        }
    });
}

function load_deposit_finish() {
    $.ajax({
        url: "/account/balance/history-deposit-finish",
        data: {},
        type: "GET",
        beforeSend: function() {
        },
        error: function() {},
        success: function(data) {
            $('.reload_history_transaction').removeClass('active');
            var html = `<div class="material-datatables"> <table id="list-yourinvestsss" class="table table-striped table-bordered table-hover" style="width:100%;cellspacing:0" > <thead> <tr> <th>Date</th>  <th>Amount </th> <th>Units</th><th>Confirmation</th><th>Tx id</th> </tr> </thead> <tbody> </tbody> </table> </div> `;
            $('#history-deposit-finish').html(html);
            $('#list-yourinvestsss').DataTable({
                "order": [
                    [0, "desc"]
                ],
                autoWidth: false,
                searching: false,
                ordering: true,
                responsive: true,
                lengthChange: false,
                destroy: true,
                paging: true,
                info: false,
                data: data.result,
                columns: [{
                    data: 'date'
                }, {
                    data: 'amount'
                }, {
                    data: 'type'
                },
                 {
                    data: 'status'
                }
                , {
                    data: 'txid'
                }]
            });
            
        }
    });
}

function load_withdraw_finish() {
    $.ajax({
        url: "/account/balance/history-withdraw-finish",
        data: {},
        type: "GET",
        beforeSend: function() {
        },
        error: function() {},
        success: function(data) {
            $('.reload_history_transaction').removeClass('active');
            var html = `<div class="material-datatables"> <table id="list-yourinvests" class="table table-striped table-bordered table-hover" style="width:100%;cellspacing:0" > <thead> <tr> <th>Date</th>  <th>Amount </th> <th>Units</th><th>Status</th><th>Tx id</th> </tr> </thead> <tbody> </tbody> </table> </div> `;
            $('#history-withdraw-finish').html(html);
            $('#list-yourinvests').DataTable({
                "order": [
                    [0, "desc"]
                ],
                autoWidth: false,
                searching: false,
                ordering: true,
                responsive: true,
                lengthChange: false,
                destroy: true,
                paging: true,
                info: false,
                data: data.result,
                columns: [{
                    data: 'date'
                }, {
                    data: 'amount'
                }, {
                    data: 'type'
                },
                 {
                    data: 'status'
                }
                , {
                    data: 'txid'
                }]
            });
            
        }
    });
}

function load_withdraw_pendding() {
    $.ajax({
        url: "/account/balance/history-withdraw-pending",
        data: {},
        type: "GET",
        beforeSend: function() {
        },
        error: function() {},
        success: function(data) {
            $('.reload_history_transaction').removeClass('active');
            var html = `<div class="material-datatables"> <table id="list-yourinvestss" class="table table-striped table-bordered table-hover" style="width:100%;cellspacing:0" > <thead> <tr> <th>Date</th>  <th>Amount </th> <th>Units</th><th>Status</th><th><i class="fa fa-times"></i></th> </tr> </thead> <tbody> </tbody> </table> </div> `;
            $('#history-withdraw-pendding').html(html);
            $('#list-yourinvestss').DataTable({
                "order": [
                    [0, "desc"]
                ],
                autoWidth: false,
                searching: false,
                ordering: true,
                responsive: true,
                lengthChange: false,
                destroy: true,
                paging: true,
                info: false,
                data: data.result,
                columns: [{
                    data: 'date'
                }, {
                    data: 'amount'
                }, {
                    data: 'type'
                },
                 {
                    data: 'status'
                }
                , {
                    data: 'remove_order'
                }]
            });
             remove_order();
        }

    });
    
}

function remove_order(){
   
    $('.remove_order').on('click',function(){
        var id_withdraw = $(this).data('id');
        swal({
          title: "Confirm cancellation",
          text: "Are you sure you want to cancel the withdrawal?",
          type: "info",
          showCancelButton: true,
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        }, function () {
            $.ajax({
                url: "/account/balance/remove-withdraw",
                data: {
                    'id' : id_withdraw
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
}