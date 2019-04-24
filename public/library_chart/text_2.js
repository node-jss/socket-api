function standardChart(n) {
    function r() {
        var i, r, u;
        var parser = new UAParser();
        var device = parser.getDevice();
        if (device.type == 'mobile'){
            stxx.setMaxTicks(25);
        }else{
            stxx.setMaxTicks(25);
        }
        stxx.chart.yAxis.width = 65;
        stxx.chart.yAxis.decimalPlaces = 0;
        stxx.chart.yAxis.maxDecimalPlaces = 0;
        stxx.reverseMouseWheel = !0;
        stxx.layout.crosshair = !0;
        stxx.preferences.currentPriceLine = true;
        stxx.preferences.whitespace=0;


        i = {};
        dh={};
        r = {"Up Volume": "#8cc176", "Down Volume": "#b82c0c"};
        STX.Studies.quickAddStudy(stxx, "vol undr", i, r);
        stxx.newChart(n.market.marketName, null, null, null);
        u = {refreshInterval: 30};
        stxx.attachQuoteFeed(new STX.QuoteFeed.BittrexFeed, u);
        t.changePeriodicity(30);
        STXChart.prototype.formatPrice = function (n, t) {
            if (!n || typeof n == "undefined")return "";
            if (t || (t = this.currentPanel), t || (t = this.chart.panel), !t)return n;
            var i = t.chart.yAxis.decimalPlaces;
            return n.toFixed(i)
        };
        window.fullScreenMode || toggleFullScreenMode()
    }

    function u() {
        var n, t;
        STX.ThemeManager.builtInThemes = {Light: !0, Dark: !0};
        STX.MenuManager.makeMenus();
        STX.MenuManager.registerChart(stxx);
        n = STX.StorageManager.get("themes");
        n ? STX.ThemeManager.setThemes(JSON.parse(n), stxx) : STX.ThemeManager.loadBuiltInTheme(stxx, "Light");
        STX.ThemeManager.themesToMenu($$("customThemeSelector"), $$("builtInThemeSelector"), stxx, STX.StorageManager.callbacker("themes"));
        t = new STX.DrawingToolbar($$$(".stx-wrapper .stx-toolbar"), stxx);
        STX.TimeZoneWidget.initialize(STX.StorageManager.get("timezone"), STX.StorageManager.callbacker("timezone"));
        r()
    }

    var t = this, i = {
        day: {label: "1 D", period: 1, interval: "day", timeUnit: null},
        "3d": {label: "3 D", period: 3, interval: "day", timeUnit: null},
        week: {label: "1 W", period: 7, interval: "day", timeUnit: null},
        month: {label: "1 Mo", period: 30, interval: "day", timeUnit: null},
        "1": {label: "1 Min", period: 1, interval: 1, timeUnit: "minute"},
        "5": {label: "5 Min", period: 1, interval: 5, timeUnit: "minute"},
        "15": {label: "15 Min", period: 3, interval: 5, timeUnit: "minute"},
        "30": {label: "30 Min", period: 1, interval: 30, timeUnit: "minute"},
        hour: {label: "1 Hr", period: 1, interval: 1, timeUnit: "hour"}
    };
    t.changePeriodicity = function (n) {
        var t = i[n];
        //console.log(n + " " + t.period + " " + t.interval + " " + t.timeUnit);
        stxx.setPeriodicityV2(t.period, t.interval, t.timeUnit, function (n) {

            n || ($$$("#periodBtn").childNodes[0].data = t.label)
        })
    };
    u()
}
function changePeriodicity(n) {

    bittrex.market.chart.changePeriodicity(n)
}
function createStudy() {
    STX.Studies.go($$("studyDialog"), stxx)
}
function createVolumePanel() {
    stxx && stxx.chart.dataSet && (stxx.panelExists("vchart") || (stxx.createPanel("Volume", "vchart", 100), stxx.draw()))
}
function toggleVolumeUnderlay() {
    stxx && stxx.chart.dataSet && stxx.setVolumeUnderlay(!stxx.layout.volumeUnderlay)
}
function toggleLog() {
    stxx.layout.semiLog = !stxx.layout.semiLog;
    STX.swapClassName($$$(".stx-logscale"), stxx.layout.semiLog.toString(), (!stxx.layout.semiLog).toString());
    stxx.draw();
    stxx.changeOccurred("layout");
    stxx.doDisplayCrosshairs()
}
function studyDialog(n, t) {

    if (stxx && stxx.chart.dataSet) {
        $$("studyDialog").querySelectorAll(".title")[0].innerHTML = n.innerHTML;
        STX.Studies.studyDialog(stxx, t, $$("studyDialog"));
        var i = STX.ipad ? 400 : 0;
        setTimeout(function () {
            STX.DialogManager.displayDialog("studyDialog")
        }, i)
    }
}
/*function prependHeadsUpHR() {
    var t = this.barFromPixel(this.cx), n = this.chart.xaxis[t];
    $$("huOpen").innerHTML = "";
    $$("huClose").innerHTML = "";
    $$("huHigh").innerHTML = "";
    $$("huLow").innerHTML = "";
    $$("huVolume").innerHTML = "";
    $$("huBaseVolume").innerHTML = "";
    n != null && n.data && ($$("huOpen").innerHTML = 'this.formatPrice(n.data.Open)', $$("huClose").innerHTML = this.formatPrice(n.data.Close), $$("huHigh").innerHTML = this.formatPrice(n.data.High), $$("huLow").innerHTML = this.formatPrice(n.data.Low), $$("huVolume").innerHTML = STX.condenseInt(n.data.Volume), $$("huBaseVolume").innerHTML = this.formatPrice(n.data.BaseVolume))
}*/
function resizeContainers() {
    var t;
    STX.ipad && STX.isIOS7or8 && (STX.appendClassName($$$("html"), "ipad ios7"), $$$("body").style.height = STX.pageHeight() + "px");
    var i = $$$(".chartContainer"), n = $$$(".stx-wrapper"), r = $$$(".stx-panel-side"), u = 2;
    r && r.offsetLeft && (u = n.offsetWidth - r.offsetLeft);
    i.style.width = n.offsetWidth - u + "px";
    t = 2;
    $$$(".stx-footer") && (t = $$$(".stx-footer").offsetHeight);
    i.style.height = STX.pageHeight() - STX.getPos(i).y - t + "px";
    n.style.height = STX.pageHeight() - STX.getPos(n).y - t + "px";
    stxx && stxx.chart.canvas != null && stxx.resizeChart()
}
function toggleFullScreenMode() {
    var t = $$$(".stx-wrapper"), n;
    window.fullScreenMode ? (window.fullScreenMode = !1, t.style.position = null, t.style.left = null, t.style.top = null, t.style.width = null, n = $$$(".chartContainer"), n.style.height = n.prevHeight, n.style.width = n.prevWidth, t.style.height = null, t.style.width = null, resizeScreen()) : (window.fullScreenMode = !0, n = $$$(".chartContainer"), n.prevHeight = n.clientHeight + "px", n.prevWidth = n.clientWidth + "px", t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px", t.style.width = "100%", resizeScreen());
    stxx.draw()
}
function resizeScreen() {
    stxx && stxx.chart.canvas != null && (window.fullScreenMode ? resizeContainers() : stxx.resizeChart())
}
function showAttribution() {
    if ($$$(".attribution").className = "attribution", stxx.chart.attribution) {
        var n = stxx.chart.attribution.source, t = $$$(".attribution");
        STX.appendClassName(t, n.toLowerCase());
        n && n != "chartiq" && STX.appendClassName(t, stxx.chart.attribution.exchange.toLowerCase())
    }
}
function formatCurency(a){
    return a.toFixed(8);
}
function prependHeadsUpHR() {
    var t = Math.floor((STXChart.crosshairX - this.left) / this.layout.candleWidth), n = this.chart.xaxis[t];
    $$("huOpen").innerHTML = "";
    $$("huClose").innerHTML = "";
    $$("huHigh").innerHTML = "";
    $$("huLow").innerHTML = "";
    $$("huVolume").innerHTML = "";
    $$("huBaseVolume").innerHTML = "";
    n != null && n.data && ($$("huOpen").innerHTML = formatCurency(n.data.Open), $$("huClose").innerHTML = formatCurency(n.data.Close), $$("huHigh").innerHTML = formatCurency(n.data.High), $$("huLow").innerHTML = formatCurency(n.data.Low), $$("huVolume").innerHTML = STX.condenseInt(n.data.Volume), $$("huBaseVolume").innerHTML = this.formatPrice(n.data.BaseVolume))
}
var stxx = new STXChart({container: $$$(".chartContainer"), reverseMouseWheel: !0}), TickType;
$(function () {
    bittrex.market.chart = new standardChart(bittrex);
    window.onmessage = function (n) {
        n.data == "helloChild" && alert("It works!")
    };
    window.top.postMessage("helloParent", "*")
});
TickType = {
    ONE_MIN: "oneMin",
    FIVE_MIN: "fiveMin",
    THIRTY_MIN: "thirtyMin",
    ONE_HOUR: "hour",
    ONE_DAY: "day",
    properties: {
        oneMin: {name: "1 Minute"},
        fiveMin: {name: "5 Minutes"},
        thirtyMin: {name: "30 Minutes"},
        hour: {name: "1 Hour"},
        day: {name: "1 Day"}
    }
};
STX.QuoteFeed.BittrexFeed = function () {
};
STX.QuoteFeed.BittrexFeed.stxInheritsFrom(STX.QuoteFeed);
STX.QuoteFeed.BittrexFeed.prototype.fetch = function (n, t) {
    "use strict";
    var e = this, i = function (n) {
        var t = TickType.ONE_MIN;
        switch (n.interval) {
            case"minute":
                switch (n.period) {
                    case 1:
                        t = TickType.ONE_MIN;
                        break;
                    case 5:
                        t = TickType.FIVE_MIN;
                        break;
                    case 30:
                        t = TickType.THIRTY_MIN
                }
                break;
            case"hour":
                t = TickType.ONE_HOUR;
                break;
            case"days":
            case"day":
                t = TickType.ONE_DAY
        }
        return t
    }, r = function (n) {

        var i = [], t, r;
        if (n)for (t = 0; t < n.length; t++)r = n[t], i[t] = {}, i[t].DT = new moment(r.T + " Z").millisecond(0).second(0).toDate(), i[t].Open = parseFloat(r.O), i[t].High = parseFloat(r.H), i[t].Low = parseFloat(r.L), i[t].Close = parseFloat(r.C), i[t].Volume = parseFloat(r.V);
        return i
    }, u = function (n) {
        var t = {error: n};
        return t == 404 && (t.moreAvailable = !1), t
    }, f = function (n, t, f, e, o) {
        var h = i(e), s;
        s = "/exchange/json";
        e.update && (s = "/exchange/json");

        
        $.ajax({method: "GET", url: s, data: {marketName: n, tickInterval: h}}).done(function (t) {
            var i = r(t.result);
            
            o({quotes: i, moreAvailable: !1});
        }).fail(function (n) {
            o(u(n))
        });
    };
    return f(n.symbol, n.startDate, n.endDate, n, t)
};
STXChart.prototype.prepend("headsUpHR", prependHeadsUpHR);
STXChart.prototype.append("draw", function () {

    function r(n, t) {

        return function (i) {
            
            STX.Studies.removeStudy(n, t);
            i.stopPropagation();
            STX.clearSafeClickTouches(i.target);
            i.target.style.display = ""
        }
    }

    var i, t, n;
    if (this.layout.studies)for (i in this.layout.studies)(t = this.layout.studies[i], t.libraryEntry.customRemoval) && (n = $$$("#studies #" + t.name.replace(" ", "-")), n && (n.style.display = "inline-block", n.safeClickTouchEvents || STX.safeClickTouch(n, r(this, t))))
});
window.onresize = resizeScreen;
STXChart.prototype.prepend("headsUpHR", prependHeadsUpHR);
$$("shareBtn") && typeof STXSocial != "undefined" && ($$("shareBtn").style.display = "", $$("shareBtn").onclick = function () {
    
    STXSocial.createImage(stxx, null, null, null, function (n) {
        var t = STX.uniqueID(), i = stxx.getStartDateOffset(), r = {
            layout: stxx.exportLayout(),
            drawings: stxx.serializeDrawings(),
            xOffset: i,
            startDate: stxx.chart.dataSegment[i].Date,
            endDate: stxx.chart.dataSegment[stxx.chart.dataSegment.length - 1].Date,
            id: t,
            symbol: stxx.chart.symbol
        }, u = {id: t, image: n, config: r};
        $.ajax({
            url: "/Market/UploadChart",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            data: u,
            cache: !1,
            success: function (n) {
                $$$("#shareLink").href = n;
                $$$("#shareCopyPaste").innerHTML = n;
                STX.DialogManager.displayDialog("sharedLinkDialog")
            },
            error: function (n) {
                STX.alert("err=" + n)
            }
        })
    })
});
STX.Studies.studyLibrary["vol undr"].seriesFN = function (n, t) {
    var i = [{
        field: "Volume",
        fill_color_up: n.canvasStyle("stx_volume_underlay_up").color,
        border_color_up: n.canvasStyle("stx_volume_underlay_up").borderLeftColor,
        opacity_up: n.canvasStyle("stx_volume_underlay_up").opacity,
        fill_color_down: n.canvasStyle("stx_volume_underlay_down").color,
        border_color_down: n.canvasStyle("stx_volume_underlay_down").borderLeftColor,
        opacity_down: n.canvasStyle("stx_volume_underlay_down").opacity
    }], r = {
        name: "Volume",
        type: "clustered",
        panel: t.panel,
        heightPercentage: t.inputs.HeightPercentage ? t.inputs.HeightPercentage : t.study.parameters.heightPercentage,
        widthFactor: 1
    };
    n.drawHistogram(r, i)
}