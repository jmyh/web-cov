document.getElementById('showLocators').onclick = function () {
    showData()
};

document.getElementById('save').onclick = function () {
    downloadData();
};

function downloadData() {

  const fileInputEl = document.getElementById('dataSource');
  let locatorFile = fileInputEl.files[0]
  console.log(fileInputEl)
  const reader = new FileReader();
  reader.readAsText(locatorFile);

  reader.onload = function() {
      const result = reader.result
      console.log(result);
      localStorage.setItem("locators", JSON.stringify(result))
  };
    reader.onerror = function() {
      console.log(reader.error);
  };

}

function showData() {
    const locatorsStr = localStorage.getItem("locators")
    if (locatorsStr != null) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.insertCSS(tabs[0].id, {
                file : "onpage/main.css"
            });
            chrome.tabs.executeScript(tabs[0].id, { file: "onpage/split-page.js" }, function() {
                chrome.tabs.executeScript(tabs[0].id, { file: "onpage/show-locators.js" }, function() {
                    chrome.tabs.executeScript(tabs[0].id, { file: "onpage/show-info.js" })
                })
            });
        });
    }
}
