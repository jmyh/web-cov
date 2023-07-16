document.querySelector(".toggle-checkbox").addEventListener('change', function() {
    (this.checked) ? showData() : hideData();
});

function showData() {
    const locatorsStr = localStorage.getItem("locators")
    if (locatorsStr != null) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.scripting.insertCSS({
                target: {tabId: tabs[0].id},
                files: ["onpage/main.css"]
            });
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['onpage/split-page.js', "onpage/show-locators.js", "onpage/show-info.js"]
            });
        });
    }
}

function hideData() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['onpage/rollback-page.js']
        });
    });
}
