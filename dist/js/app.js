var coinMarketCapPolling = function(){
$.get(" http://electroneum.pw/cmc/ ", function(data){
data = data[0];
$("#etnToUSDText").html(data.price_usd);
$("#etnToBTCText").html(data.price_btc);
$("#etnChange1HText").html(data.percent_change_1h);
$("#etnChange24HText").html(data.percent_change_24h);
$("#etnChange7DText").html(data.percent_change_7d);
document.title = (data.price_usd);
$("span:contains('-')").css( "color", "#c93736" );
});
};
$(document).ready( function () {
  coinMarketCapPolling();
});
setInterval(coinMarketCapPolling, 10000);