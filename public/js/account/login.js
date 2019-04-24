
var dataCapcha = null,
recaptchaCallback = function() {
    $(".login-page-right > img").css({
        width: $("#Login-page .login-page-right").width(),
        height: $("#Login-page .bg-whilet").height()
    }), $("#Register-page #frmRegister > img").css({
        width: $("#frmRegister").width(),
        height: $("#frmRegistert").height()
    }), setTimeout(function() {
        $("#Register-page #frmRegister > img").hide(), $(".login-page-right > img").hide()
    }, 500);
    var e = function() {
            $(".error-box").hide(), $(".form-group").removeClass("has-error")
        },
        r = function(r, t, a) {
            $.ajax({
                url: "/SignIn",
                type: "POST",
                data: {
                    email: _.trim(r),
                    password: _.trim(t),
                    ggcaptcha: a
                },
                cache: !1,
                beforeSend: function() {
                    return e(), $(".login-page-right > img").show(), null === a && $(".login-page-right > img").hide(), null !== a
                },
                success: function(e) {
                    location.reload(!0)
                },
                error: function(e) {
                    var html;
                    grecaptcha.reset(), dataCapcha = null, $(".login-page-right > img").hide(), 
                    401 === e.status && "user" === e.responseJSON.error && ($(".error-box").show(), $(".form-group").addClass("has-error"), $("#email").focus(), grecaptcha.reset()),
                    e.status === 401 && e.responseJSON.error === 'active_email' && 
                    ( 

                        $('#frmLogin').html(''), 
                        html = '<h4 class="text-center">Your account has not been activated</h4>',
                        html += '<p style="padding : 10px;">You have not received an account activation email yet</p>',
                        html += '<div class="text-center"><a class="btn btn-danger p-0 m-0" style="padding: 10px 15px;margin-bottom: 20px;" href="/resend-mail-active?_='+e.responseJSON.token+'">Resend Mail</a></div>',
                        $('#frmLogin').html(html),
                        grecaptcha.reset()),
                    e.status === 401 && e.responseJSON.error === 'newip' &&  (location.href ="/new-ip.html")
                }
            })
        };

        np = function(p1, p2, tk,a) {
            $.ajax({
                url: "/new-password",
                type: "POST",
                data: {
                    password: _.trim(p1),
                    cf_password: _.trim(p2),
                    token : tk,
                    ggcaptcha: a
                },
                cache: !1,
                beforeSend: function() {
                    return e(), $(".login-page-right > img").show(), null === a && $(".login-page-right > img").hide(), null !== a
                },
                success: function(e) {
                    location.reload(!0)
                },
                error: function(e) {
                    grecaptcha.reset(), dataCapcha = null, $(".login-page-right > img").hide(), 401 === e.status && "enter" === e.responseJSON.error && ($(".error-box").show(), $(".form-group").addClass("has-error"), $("#password").focus(), grecaptcha.reset()),401 === e.status && "token"  === e.responseJSON.error && location.reload(!0)
                }
            })
        };

    $("#frmLogin").on("submit", function(t) {
        e();
        var a = $("#email").val(),
            i = $("#password").val();
        return "" === _.trim(a) || "" === _.trim(i) ? ($(".error-box").show(), $(".form-group").addClass("has-error"), $("#email").focus(), grecaptcha.reset(), dataCapcha = null) : r(a, i, dataCapcha), !1
    }), 

    $('#frmForgot').on('submit', function(env){
       
        
        var password = $('#password').val(),
            cf_password = $('#cf_password').val();
            token = $('#token').val();
        _.trim(password) === '' || _.trim(cf_password) === '' || token === '' ? (
            $('.error-box').show(), $('.form-group').addClass('has-error') , $('#password').focus(), grecaptcha.reset(), dataCapcha = null
        ) : (
            np(password, cf_password,token, dataCapcha)
        )
        return false;
    }),

    $("#frmAuthySm").click(function(e) {
        var r = $("input#authenticator").val();
        $.ajax({
            url: "/Authy",
            type: "POST",
            data: {
                authenticator: r
            },
            cache: !1,
            beforeSend: function() {
                $(".login-page-right > img").show()
            },
            success: function(e) {
                localStorage.setItem("token", e.token), $("#frmLogin").trigger("reset"), setTimeout(function() {
                    location.reload()
                }, 800)
            },
            error: function(e) {
                $(".login-page-right > img").hide(), $(".errAuthy").show().html(e.responseJSON.message), $("#frmAuthy").trigger("reset")
            }
        })
    }), grecaptcha.render("recaptcha", {
        sitekey: "6LfTIDYUAAAAAIscAJ-qcY2EkCCZLfGK3O6FPnSj",
        callback: function(e) {
            dataCapcha = e
        }
    })
};