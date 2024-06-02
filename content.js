document.addEventListener('click', function (event) {
    let target = event.target;

    while (target && target.tagName !== 'A') {
        target = target.parentNode;
    }

    if (target && target.tagName === 'A' && target.href) {
        event.preventDefault();

        chrome.runtime.sendMessage({ href: target.href });
    }
});
