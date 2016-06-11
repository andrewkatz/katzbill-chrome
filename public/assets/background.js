chrome.tabs.onRemoved.addListener(function(tabId) {
  console.log('closed tab', tabId);

  chrome.cookies.getAll({ name: 'katzbill_pay' }, function(cookies) {
    console.log('cookies', cookies);

    if (cookies.length > 0) {
      var cookieValue = cookies[0].value;
      var parts = cookieValue.split('::::');
      var paymentId = parts[0];
      var paymentTabId = parseInt(parts[1]);

      console.log('found payment', paymentId, paymentTabId);

      if (paymentTabId === tabId) {
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
});
