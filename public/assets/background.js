var tabMap = {};

function extractDomain(url) {
  if (!url) {
    return;
  }

  var domain;

  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  domain = domain.split(':')[0];
  domain = domain.replace('www.', '');

  return domain;
}

chrome.tabs.onUpdated.addListener(function(tabId, _info, tab) {
  tabMap[tab.id] = tab.url;
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  var tabURL = tabMap[tabId];
  console.log('closed tab', tabURL);

  chrome.cookies.getAll({ name: 'katzbill_pay' }, function(cookies) {
    console.log('cookies', cookies);

    if (cookies.length > 0) {
      var cookieValue = cookies[0].value;
      var parts = cookieValue.split('::::');
      var paymentId = parts[0];
      var paymentURL = parts[1];

      var paymentDomain = extractDomain(paymentURL);
      var tabDomain = extractDomain(tabURL);

      console.log('found payment', paymentId, paymentDomain, tabDomain);

      if (paymentDomain === tabDomain) {
        console.log('trying to open window');
        chrome.windows.create({
          url: chrome.extension.getURL('index.html?#/pay/' + paymentId),
          type: 'panel',
          width: 500,
          height: 200
        });
      }
    }
  });

  delete tabMap[tabId];
});
