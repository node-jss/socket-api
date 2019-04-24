var isDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isDevice = true;
}
// khong the phong to cua so
function openPopUp(url, windowName, w, h, scrollbar) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scrollbar ;
	win = window.open(url, windowName, winprops);
	if (parseInt(navigator.appVersion) >= 4) {
		win.window.focus();
	}
}

// co the phong to cua so
var win=null;
function NewWindow(mypage,myname,w,h,scroll,pos){
	if(pos=="random"){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
	if(pos=="center"){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;}
	else if((pos!="center" && pos!="random") || pos==null){LeftPosition=0;TopPosition=20}
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=yes';
	win=window.open(mypage,myname,settings);}

// is_num
function is_num(event,f){
	if (event.srcElement) {kc =  event.keyCode;} else {kc =  event.which;}
	if ((kc < 47 || kc > 57) && kc != 8 && kc != 0) return false;
	return true;
}

function numberFormat ( number, decimals, dec_point, thousands_sep )
{
	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
	var dec = (typeof dec_point == "undefined") ? '.' : dec_point;
	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
	var abs = Math.abs(n).toFixed(prec);
	var _, i;
	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;
		_[0] = s.slice(0,i + (n < 0)) +
			_[0].slice(i).replace(/(\d{3})/g, sep+'$1');
		s = _.join(dec);
	} else {
		s = s.replace(',', dec);
	}
	return s;
}


function numberOnly (myfield){
	var rgx = /^[0-9]*\.?[0-9]*$/;
	var text = myfield.value ;
	return text.match(rgx);
}


function mixAmount(myfield){
	var thousands_sep = '.';
	myfield.value = numberFormat(parseInt(myfield.value.replace(/,/gi, '')),0,'.',thousands_sep);
}

function truncateToDecimals(num, dec ) {
	const calcDec = Math.pow(10, dec);
	return Math.trunc(num * calcDec) / calcDec;
}

/*--------------- Link advertise ----------------*/
window.rwt = function (obj, type, id) {
	try {
		if (obj === window) {
			obj = window.event.srcElement;
			while (obj) {
				if (obj.href) break;
				obj = obj.parentNode
			}
		}
		obj.href = ROOT+'?'+cmd+'=mod:advertise|type:'+type+'|lid:'+id;
		obj.onmousedown = ""
	} catch(o) {}
	return true ;
};

(function (jQuery) {
	jQuery.fn.clickoutside = function (callback) {
		var outside = 1,
			self = $(this);
		self.cb = callback;
		this.click(function () {
			outside = 0
		});
		$(document).click(function (event) {
			if (event.button == 0) {
				outside && self.cb();
				outside = 1
			}
		});
		return $(this)
	}
})(jQuery);

(function($) {
	$.fn.hoverDelay = function(f,g) {
		var cfg = {
			sensitivity: 7,
			delayOver: 150,
			delayOut: 0
		};
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );
		var cX, cY, pX, pY;

		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		var compare = function(ev,ob) {
			ob.hoverDelay_t = clearTimeout(ob.hoverDelay_t);

			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);

				ob.hoverDelay_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {

				pX = cX; pY = cY;

				ob.hoverDelay_t = setTimeout( function(){compare(ev, ob);} , cfg.delayOver );
			}
		};

		var delay = function(ev,ob) {
			ob.hoverDelay_t = clearTimeout(ob.hoverDelay_t);
			ob.hoverDelay_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		var handleHover = function(e) {
			var ev = jQuery.extend({},e);
			var ob = this;

			if (ob.hoverDelay_t) { ob.hoverDelay_t = clearTimeout(ob.hoverDelay_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				pX = ev.pageX; pY = ev.pageY;
				$(ob).bind("mousemove",track);
				if (ob.hoverDelay_s != 1) { ob.hoverDelay_t = setTimeout( function(){compare(ev,ob);} , cfg.delayOver );}

				// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				if (ob.hoverDelay_s == 1) { ob.hoverDelay_t = setTimeout( function(){delay(ev,ob);} , cfg.delayOut );}
			}
		};
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);

function load_Statistics ()
{
	$.ajax({
		async: true,
		dataType: 'json',
		url: ROOT+"load_ajax.php?do=statistics",
		type: 'POST',
		success: function (data) {
			$("#stats_online").html(data.online);
			$("#stats_totals").html(data.totals);
			$("#stats_btc").html(data.btc);
			$("#stats_eth").html(data.eth);
			$("#stats_xrp").html(data.xrp);
			$("#stats_vnd").html(data.vnd);
			$("#btc_lastprice").html(data.btc_lastprice);
			$("#price_btc_vnd").html(data.btc_vnd);

		}
	}) ;
}


function LoadAjax(doAct,mydata,ext_display) {
	$.ajax({
		async: true,
		url: ROOT+'load_ajax.php?do='+doAct,
		type: 'POST',
		data: mydata ,
		success: function (data) {
			$("#"+ext_display).html(data)
		}
	}) ;
}




/*--------------- checkMem ----------------*/
function checkMemOnline()
{
	$.ajax({
		async: true,
		dataType: 'json',
		url: ROOT+'load_ajax.php?do=check_online',
		success: function (data) {
			if(data.ok){
				location.reload(true);
			}
		}
	}) ;
}

/*--------------- doLogout ----------------*/
function doLogout()
{
	var html = '<div class="box-logout"><div class="img"><img src="'+DIR_IMAGE+'/logo.png" alt="Logo" /></div><p>Bạn có muốn thoát không ?</p></div>';


	alertify.confirm('Thông Báo', html,
		function(){
			$.ajax({
				dataType: 'json',
				url: ROOT+'load_ajax.php?do=ajax_logout',
				type: 'POST',
				success: function (data) {
					location.reload();
				}
			}) ;

		},
		function(){  }
	);


	return false;
}



/** 01. Top Nav
 **************************************************************** **/
function _topNav() {

	$("#aNotify").click(function () {
		if($("#num_notify").length){
			$.ajax({
				async: true,
				dataType: 'json',
				url:  ROOT+"load_ajax.php?do=notify" ,
				type: 'POST',
				success: function (data) {
					$("#ext_notify").html(data.html);
				}
			});
		}

	});

	$(".ll_langues .ll_ttile").click(function(){
		if(! $(this).parents(".ll_langues").hasClass("active")){
			$(this).parents(".ll_langues").addClass("active");
		}else{
			$(this).parents(".ll_langues").removeClass("active");
		}
	});
	$(window).bind('click',function(e){
		var $clicked = $(e.target);
		if(! $clicked.parents().hasClass("ll_langues")){
			$(".ll_langues").removeClass("active");
		}
	});


	$(".mmMenu ul li").each(function(){
		var countsize = $(this).find("ul li").size();
		if(countsize > 0){
			$(this).find("a:first").wrap("<div class='m-sub'></div>");
			$(this).find(".m-sub:first").append("<div class='button-submenu'></div>")
		}
	});
	$(".mmMenu ul li ul").css({'display':'none'});
	$(".mmMenu ul li .button-submenu").click(function(){
		if(! $(this).hasClass("show")){
			$(this).parent().parent().find("ul:first").stop().slideToggle(700);
			$(this).addClass("show");
			$(this).parent().parent().siblings().each(function(){
				if($(this).find(".m-sub:first").find(".button-submenu").hasClass("show")){
					$(this).find("ul:first").stop().slideToggle(700);
					$(this).find(".m-sub:first").find(".button-submenu").removeClass("show");
				}
			});
		}else{
			$(this).parent().parent().find("ul:first").stop().slideToggle(700);
			$(this).removeClass("show");
		}
	});
	$(".menu_mobile .icon_menu").click(function(event) {
		if(! $(".menu_mobile").hasClass("showmenu")){
			$(".menu_mobile").find(".divmm").addClass('show');
			$('.menu_mobile').addClass("showmenu");
			$('html').addClass("openmenu");
			$('body').css({});
		}else{
			$(".menu_mobile").find(".divmm").removeClass('show');
			$('.menu_mobile').removeClass("showmenu");
			$('html').removeClass("openmenu");
		}
	});
	$(".menu_mobile .divmm .divmmbg , .menu_mobile .divmm .mmContent .close-mmenu").click(function(event) {
		$(this).parents(".menu_mobile").find(".divmm").removeClass('show');
		setTimeout(function() {
			$('.menu_mobile').removeClass("showmenu");
			$('html').removeClass("openmenu");
		}, 500);
	});
	$(window).resize(function(){
		if($(window).innerWidth() > 991){
			$(".menu_mobile").find(".divmm").removeClass('show');
			$('.menu_mobile').removeClass("showmenu");
			$('html').removeClass("openmenu");
		}
	});

}


/** Core
 **************************************************************** **/
function TRUSTvn() {
	var Xwidth = $(window).width();

	if(Xwidth<1100){$(".floating-left").hide() ; $(".floating-right").hide()}
	_topNav();


	$(".alert-autohide").delay(5000).slideUp(200, function() {
		$(this).alert('close');
	});
	$('[data-toggle="tooltip"]').tooltip() ;



	alertify.defaults.theme.ok = "btn btn-primary";
	alertify.defaults.theme.cancel = "btn btn-danger";
	alertify.defaults.theme.input = "form-control";


	load_Statistics();

	if(mem_id>0) {
		var timeRefreshCk = (5 * 1000) ; //1 phut check 1 lan
		setInterval(function(){ checkMemOnline() },timeRefreshCk);
	}
}

/* Init */
jQuery(window).ready(function () {
	TRUSTvn();
});

