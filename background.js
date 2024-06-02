chrome.runtime.onInstalled.addListener(function () {
    // Do any setup here if needed
});

// Listen for a click on the extension icon
chrome.action.onClicked.addListener(function (tab) {
    // Execute content script in the current tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function () {
            document.addEventListener('click', function (event) {
                if (event.target.tagName === 'a') {
                    event.preventDefault();

                    // Get the link URL
                    var linkUrl = event.target.href;

                    // Update the browser history with the link URL
                    chrome.history.addUrl({ url: linkUrl });

                    // Navigate to the link URL
                    window.location.href = linkUrl;
                }
            });
        }
    });
});
