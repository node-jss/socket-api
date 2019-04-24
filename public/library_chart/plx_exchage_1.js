$(document).ready(function () {
	var depthDetectArrays;
	$(window).on("load resize",function(e){
		var cw = $("#depthChartContainer").innerWidth();
		$('#depthCanvas').attr({height: 200 * window.devicePixelRatio, width: cw * window.devicePixelRatio}).css({width: cw});
		var formattedOrderBook = {"asks": [], "bids": []};
		var orderBookRates = [];
		$.ajax({method: "GET", url: ROOT_MOD+"/ajax/data_depth.html"}).done(function (t) {
			orderBookRates = t;
			for (var side in orderBookRates)
			{
				for (var i in orderBookRates[side])
				{
					formattedOrderBook[side][i] = [parseFloat(orderBookRates[side][i][0]), parseFloat(orderBookRates[side][i][1])];
				}
			}
			depthDetectArrays = depthChart("depthCanvas", formattedOrderBook, false);
		});
	});
	var secondaryCurrency = "BTC";
	var primaryCurrency = "VNĐ";
	var dotRadius = $('#depthChartDot').width() / 2;
	if( dotRadius == 0){
		dotRadius = 5;
	}
	$('#depthChartContainer').on('mousemove', function (e) {
		var posX = e.pageX - this.offsetLeft;
		var h,v,l,t;
		var found = false;
		if (!(depthDetectArrays instanceof Object))return;
		bids = depthDetectArrays['bids'];
		asks = depthDetectArrays['asks'];
		if (posX<=bids[0]['h']){
			for (var x = 0; x < bids.length; x++){
				h = bids[x]['h'];
				v = bids[x]['v'];
				if (x>0)h = (h + bids[x-1]['h'])/2;
				if (posX<=h){
					found = true;
					l = bids[x]['h'];
					t = bids[x]['v'];
					var chartInfoString = "<div class='row_chart'><div>Price:</div><div>" + formatVND(bids[x]['rate']) + "</div></div>"
						+ "<div class='row_chart'><div>Sum (" + secondaryCurrency + "):</div><div>" + bids[x]['quoteSum'].toFixed(3) + "</div></div>"
						+ "<div class='row_chart'><div>Sum (" + primaryCurrency + "):</div><div>" + formatVND(bids[x]['baseSum'].toFixed(0)) + "</div></div>"
				}
			}
		} else if (posX>=asks[0]['h']){
			for (var x = 0; x < asks.length; x++){
				h = asks[x]['h'];
				v = asks[x]['v'];
				if (x>0)h = (h + asks[x-1]['h'])/2;
				if (posX>=h){
					found = true;
					l = asks[x]['h'];
					t = asks[x]['v'];
					var chartInfoString = "<div class='row_chart'><div>Price:</div><div>" + formatVND(asks[x]['rate']) + "</div></div>"
						+ "<div class='row_chart'><div>Sum (" + secondaryCurrency + "):</div><div>" + asks[x]['quoteSum'].toFixed(3) + "</div></div>"
						+ "<div class='row_chart'><div>Sum (" + primaryCurrency + "):</div><div>" + formatVND(asks[x]['baseSum'].toFixed(0)) + "</div></div>"
				}
			}
		}
		if (found){
			t += this.offsetTop;
			l += this.offsetLeft;
			var minLeft = 0;
			var minTop = this.offsetTop;
			if (t<minTop)t=minTop;

			destinationL = l;
			destinationT = t;

			$('#depthChartInfo').empty().append(chartInfoString);
			$('#depthChartInfo').not('.collapsed').css('left',destinationL + 5).css('top',destinationT - 75).css('display', 'block');
			$('#depthChartYline').not('.collapsed').css('left', destinationL).css('display', 'block');
			$('#depthChartDot').not('.collapsed').css('left', destinationL - dotRadius).css('top',destinationT - dotRadius - 2).css('display', 'block');


		} else {
			$('#depthChartInfo, #depthChartYline, #depthChartDot').css('display', 'none');
		}
	});
	$('#depthChartContainer').mouseout(function() {
		$('#depthChartInfo, #depthChartYline, #depthChartDot').css('display', 'none');

	});
});
function depthChart(canvasId, data, dark) {
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	var scaleFactor = backingScale();

	if (scaleFactor > 1) {
		if (c.style.width < 10) {
			c.style.width = c.width;
			c.style.height = c.height;
			c.width = c.width * scaleFactor;
			c.height = c.height * scaleFactor;
			var ctx = c.getContext("2d");
		}
	}
	var width = c.width;
	var height = c.height;
	// trace('depthChart: ' + width + ', ' + height);
	var marginLeft = 45 * scaleFactor;
	var marginBottom = 10 * scaleFactor;
	var paddingBottom = 10 * scaleFactor;
	var marginTop = 10 * scaleFactor;
	var marginRight = 20 * scaleFactor;

	marginRight = 0;
	marginTop = 0;
	marginBottom =  2 * scaleFactor;
	paddingBottom = 11 * scaleFactor;

	var high = 0;
	var bids = data.bids;
	var asks = data.asks;
	var totalBidVol = 0;
	var totalAskVol = 0;
	var totalBidVolBase = 0;
	var totalAskVolBase = 0;
	var vScale, hScale;
	var vShift = marginBottom + paddingBottom;
	var h, v;
	var depthDetectArrayBids = new Array();
	var depthDetectArrayAsks = new Array();
	if (dark) {
		var borderColor = "#1f3232";
		var asksStrokeColor = '#b32119'; //red
		var asksAreaColor = 'rgba(179, 33, 25, 0.25)';
		var bidsStrokeColor = '#117e1a';
		var bidsAreaColor = 'rgba(17, 126, 26, 0.25)';
		var lineColor = '#1f3232';
		var textColor = "#6f9397";
	} else {
		var borderColor = "#91abac";
		var asksStrokeColor = '#a42015';
		var asksAreaColor = 'rgba(164, 32, 21, 0.3)';
		var bidsStrokeColor = '#339349';
		var bidsAreaColor = 'rgba(51, 147, 73, 0.3)';
		var lineColor = '#c1d0d0';
		var textColor = "#1e2324";
	}

	// horiz lines
	ctx.lineWidth = 3 * scaleFactor;
	var size = Math.floor((10 * scaleFactor)).toString();
	ctx.font = size + "px Arial";
	if (bids.length < 1) return;
	ctx.clearRect(0, 0, width, height);
	if (!(bids[0] instanceof Array)) return;
	if (!(asks[0] instanceof Array)) return;
	hScale = ((width - marginLeft - marginRight) / 2) / ((asks[0][0] + bids[
			0][0]) / 2);
	for (var i = 0; i < bids.length; i++) {
		if ((i > (bids.length - (bids.length / 10))) && bids.length > 5 &&
			bids[i][1] > totalBidVol / 2) continue;
		totalBidVol += bids[i][1];
	}
	for (var i = 0; i < asks.length; i++) {
		if ((asks[i][0] * hScale) > (width - marginLeft - marginRight))
			continue;
		totalAskVol += asks[i][1];
	}
	if (high < ((totalAskVol + totalBidVol) / 2)) high = ((totalAskVol +
	totalBidVol) / 2);
	if (high > Math.min(totalAskVol,totalBidVol)*2)high = Math.min(totalAskVol,totalBidVol)*2;
	vScale = (height - marginBottom - marginTop) / high;
	var roundLength = Math.pow(10, (Math.floor(high).toString().length - 3));
	if (roundLength < 1) roundLength = 1;

	var firstBid = bids[0][0];
	var lastBid = bids[bids.length-1][0];
	var firstAsk = asks[0][0];
	var lastAsk = asks[asks.length-1][0];
	var range = lastAsk - lastBid;
	// hScale /= 2;

	// trace('high is ' + high + ', range is ' + range);
	// trace('bids from ' + firstBid + ' to ' + lastBid)
	// trace('asks from ' + firstAsk + ' to ' + lastAsk);
	// console.log(bids, asks);
	var count = 1;
	for (var i = 0; i < high; i += (high / 4)) {
		roundedI = Math.floor(i / roundLength) * roundLength;
		h = marginLeft;
		w = width - marginLeft - marginRight;
		h = 0;
		w = width;
		v = height - vShift - (roundedI * vScale);
		ctx.fillStyle = lineColor;
		// bottom line darker
		if (count++ === 1) { ctx.fillStyle = borderColor;}
		// trace('h line ' + count)
		ctx.fillRect(h, v, w, 1);
		ctx.fillStyle = textColor;
		ctx.fillText(roundedI, 0, v - 3);
		// trace(i + ', ' + roundedI);
	}

	// vertical lines
	var priceWidth = (width - marginLeft - marginRight) / hScale;
	var start = ((asks[0][0] + bids[0][0]) / 2) - (((width - marginLeft -
		marginRight) / 2) / hScale);
	// start = bids[bids.length-1][0] / hScale;
	for (var i = 0; i < priceWidth; i += 100*scaleFactor/hScale) {
		// for (var i = lastBid; i <= lastAsk; i += (range / 8)) {
		var decimals = 2;
		var counter = 1;
		while (parseFloat(i.toFixed(counter)) == 0 && decimals < 8) {
			decimals++;
			counter++;
		}
		if (i == 0) decimals = 4;
		var fixed = decimals + 2;
		if (fixed > 8) fixed = 8;
		var roundedI = parseFloat(i.toFixed(decimals)).toFixed(0);
		var roundedText = (i + start);
		roundedText = parseFloat(roundedText.toFixed(decimals)).toFixed(0);
		h = marginLeft + roundedI * hScale;
		roundedText = formatVND(roundedText);
		// trace(i + ' : ' + roundedText + ' | ' + hScale);
		ctx.fillStyle = lineColor;
		ctx.fillRect(h, marginTop, 1, height - vShift - marginTop);
		ctx.fillStyle = textColor;
		ctx.fillText(roundedText, h - (8 * (decimals + 1)), height -
			marginBottom);
	}

	// bids
	totalBidVol = bids[0][1];
	totalBidVolBase = bids[0][0] * bids[0][1];

	// bids fill area
	ctx.beginPath();
	// ctx.moveTo(marginLeft, height - vShift);
	h = bids[0][0] * hScale + marginLeft;
	v = height - (totalBidVol *
		vScale) - vShift;
	ctx.moveTo(h, height - vShift);
	ctx.lineTo(h, v);
	depthDetectArrayBids[0] = {'h': h / scaleFactor,'v': v / scaleFactor,'rate': bids[0][0],'quoteSum': totalBidVol,'baseSum': totalBidVolBase};
	var lastV = v;
	var lastH = h;
	for (var i = 1; i < bids.length; i++) {
		totalBidVol += bids[i][1];
		totalBidVolBase += bids[i][0] * bids[i][1];
		h = bids[i][0] * hScale;
		v = height - (totalBidVol * vScale);
		if (h > (width - marginLeft - marginRight)) continue;
		ctx.lineTo(h + marginLeft, v - vShift);
		lastV = v - vShift;
		lastH = h + marginLeft;
		depthDetectArrayBids[i] = {'h': (h + marginLeft) / scaleFactor,'v': (v - vShift) / scaleFactor,'rate': bids[i][0],'quoteSum': totalBidVol,'baseSum': totalBidVolBase};
	}

	ctx.lineTo(marginLeft, lastV);
	ctx.strokeStyle = bidsStrokeColor;
	ctx.stroke();
	ctx.lineTo(marginLeft, height - vShift);
	ctx.fillStyle = bidsAreaColor;
	ctx.fill();

	// bids line, original
	if (false){
		totalBidVol = bids[0][1];
		ctx.beginPath();
		ctx.moveTo(bids[0][0] * hScale + marginLeft, height - vShift);
		ctx.lineTo(bids[0][0] * hScale + marginLeft, height - (totalBidVol * vScale) - vShift);
		for (var i = 1; i < bids.length; i++) {
			totalBidVol += bids[i][1];
			h = bids[i][0] * hScale;
			v = height - (totalBidVol * vScale);
			if (h > (width - marginLeft - marginRight)) continue;
			ctx.lineTo(h + marginLeft, v - vShift);
		}
		ctx.strokeStyle = bidsStrokeColor;
		ctx.stroke();
	}

	// asks area
	totalAskVol = asks[0][1];
	totalAskVolBase = asks[0][0] * asks[0][1];

	ctx.beginPath();
	var startX = asks[0][0] * hScale + marginLeft;
	var startY = height - vShift;
	v = height - (totalAskVol *
		vScale) - vShift;
	ctx.moveTo(startX, startY);
	ctx.lineTo(startX, v);
	depthDetectArrayAsks[0] = {'h': startX / scaleFactor,'v': v / scaleFactor,'rate': asks[0][0],'quoteSum': totalAskVol,'baseSum': totalAskVolBase};
	var lastH;
	var lastV;
	for (var i = 1; i < asks.length; i++) {
		totalAskVol += asks[i][1];
		totalAskVolBase += asks[i][0] * asks[i][1];
		h = asks[i][0] * hScale;
		v = height - (totalAskVol * vScale);
		if (h < 0) continue;
		var plotX = h + marginLeft;
		var plotY = v - vShift;
		var maxX = width - marginLeft;
		// trace(i + ' : ' + Math.round(h) + ' : ' + maxX);
		lastH = plotX;
		lastV = plotY;
		if (h > maxX) {
			// trace('ask area beyond width: ' +  Math.round(lastH) +  ', ' + Math.round(lastV));
			lastV = plotY;
			ctx.lineTo(width, lastV);
			h = maxX;
			break;
		}
		ctx.lineTo(plotX, plotY);
		depthDetectArrayAsks[i] = {'h': (h + marginLeft) / scaleFactor,'v': (v - vShift) / scaleFactor,'rate': asks[i][0],'quoteSum': totalAskVol,'baseSum': totalAskVolBase};
		//trace('draw ask ' + Math.round(h + marginLeft) + ', ' + (asks[i][0]));
	}
	// ctx.lineTo(width, lastV);
	// ctx.lineTo(width, startY);
	ctx.lineTo(width, v);
	ctx.strokeStyle = asksStrokeColor;
	ctx.stroke();
	ctx.lineTo(width, startY);
	ctx.lineTo(startX, startY);
	ctx.fillStyle = asksAreaColor;
	ctx.fill();



	/// asks line, original
	if (false){
		totalAskVol = asks[0][1];
		ctx.beginPath();
		ctx.moveTo(asks[0][0] * hScale + marginLeft, height - vShift);
		ctx.lineTo(asks[0][0] * hScale + marginLeft, height - (totalAskVol * vScale) - vShift);
		for (var i = 1; i < asks.length; i++) {
			totalAskVol += asks[i][1];
			h = asks[i][0] * hScale;
			v = height - (totalAskVol * vScale);
			if (h < 0) continue;
			ctx.lineTo(h + marginLeft, v - vShift);
		}
		ctx.strokeStyle = asksStrokeColor;
		ctx.stroke();
	}
	return {'bids':depthDetectArrayBids,'asks':depthDetectArrayAsks};
}
function backingScale() {
	if ('devicePixelRatio' in window && window.devicePixelRatio > 1)
		return window.devicePixelRatio;

	return 1;
}
function formatVND(a){
	var $int = parseInt(a);
	var $text = "";
	var $price1,$price2;
	$price1 = parseInt($int / 1000);
	$price2 = $int % 1000;
	while ($price1 > 0 || $price2 > 0){
		if($text == ""){
			if($price1 > 0){
				if($price2.toString().length == 1){
					if($price2 == 0){
						$text = "000";
					}else{
						$text = "00" + $price2;
					}
				}
				if($price2.toString().length == 2){
					$text = "0" + $price2;
				}
				if($price2.toString().length == 3){
					$text = $price2;
				}
			}else{
				$text = $price2;
			}
		}else{
			if($price1 > 0){
				if($price2.toString().length == 1){
					if($price2 == 0){
						$text = "000" + "," + $text;
					}else{
						$text = "00" + $price2 + "," + $text;
					}
				}
				if($price2.toString().length == 2){
					$text = "0" + $price2 + "," + $text;
				}
				if($price2.toString().length == 3){
					$text = $price2 + "," + $text;
				}
			}else{
				$text = $price2 + "," + $text;
			}
		}
		$price2 = $price1 % 1000;
		$price1 = parseInt($price1 / 1000);
	}
	return $text;
}
