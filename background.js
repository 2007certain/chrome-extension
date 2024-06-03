chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.href && request.href.indexOf('in.tradingview') > -1) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let currentTab = tabs[0];
            if (currentTab) {
                chrome.tabs.update(currentTab.id, { url: request.href });
            }
        });
    }
});