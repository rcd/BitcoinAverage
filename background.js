var currency = 'USD';
var color_up = [255, 0, 0, 255];
var color_down = [0, 255, 0, 255];
var api_url_base = 'https://api.bitcoinaverage.com/ticker/';
var click_url_base = 'https://bitcoinaverage.com/#';

function updateTicker() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', api_url_base + currency, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var ticker = JSON.parse(xhr.responseText);
      chrome.browserAction.setBadgeText({ text: '' + Math.floor(ticker['last']) });
      var bg = color_up;
      if (ticker['last'] >= ticker['24h_avg'])
        bg = color_down;
      chrome.browserAction.setBadgeBackgroundColor({ color: bg });
    }
  }
  xhr.send();
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm)
    updateTicker();
});
chrome.alarms.create('update', { delayInMinutes: 0, periodInMinutes:1 });

updateTicker();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: click_url_base + currency });
});