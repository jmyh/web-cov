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
      console.log("Saved")
      console.log(localStorage.getItem("locators"))
  };
    reader.onerror = function() {
      console.log(reader.error);
  };

}

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
