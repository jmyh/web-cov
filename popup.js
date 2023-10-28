function showData() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['onpage/content-check.js'],
        }).then(function(results) {
            if (chrome.runtime.lastError || !results || !results.length) {
                return;  // Permission error, tab closed, etc.
            }
            if (results[0].result !== true) {
                // Not already inserted before, do your thing, e.g. add your CSS:
                chrome.scripting.insertCSS({target: {tabId: tabs[0].id}, files: ["onpage/main.css"]});
                console.log("File was upload"+ results);
            }
        });

        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['onpage/split-page.js', "onpage/show-locators.js", "onpage/show-info.js"]
        });
    });
}

function hideData() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['onpage/rollback-page.js']
        });
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    chrome.storage.local.get('toggle', function(data) {
        if (data.toggle === true)
            document.querySelector(".toggle-checkbox").checked = data.toggle;
    });

    chrome.storage.onChanged.addListener(function(changes, areaName){
        if(areaName === "local" && changes.toggle) {
            if(changes.toggle.newValue)
                showData()
            else
                hideData()
        }
    });
});

document.querySelector(".toggle-checkbox").addEventListener('change', function() {
    chrome.storage.local.set({"toggle": this.checked})
});
