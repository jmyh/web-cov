
function setBarText(arr) {
    let barText = "";
    let indent = 1;

    for (let i in arr) {
        barText = barText + Array(indent).join('--') + arr[i].fullPath + "<br>";
        if((arr.length - 1) === Number(i)) {
            indent--;
        }
        barText = barText + '<br/>'
    }
    return barText;
}

function setBarTests(arr) {
    let barTests = "";
    let uniqueTests = new Map();
    for (let i in arr) {
        if (arr[i].fullPath !== null) {
            const keys = Object.keys(arr[i].testNames)
            for (let k in keys) {
                if (!uniqueTests.has(keys[k]))
                    uniqueTests.set(keys[k], arr[i].testNames[keys[k]])
            }
        }
    }

    return Array.from(uniqueTests.values()).join("<br>") + '<br>'
}

function createTabs() {
    let info = document.createElement("div");
    info.id = "coverageInfoBar";


    info.innerHTML =
        '<div class="coverageInfoBar">' +
            '<input id="tab1" type="radio" name="tabs" checked>' +
            '<label for="tab1" title="locators">Locators</label>' +
            '<input id="tab2" type="radio" name="tabs">' +
            '<label for="tab2" title="tests">Tests</label>' +
            '<section id="section1"></section>' +
            '<section id="section2"></section>' +
        '</div>';
    return info;
}

function createToolBar() {
    let toolbar = document.createElement("div");
    toolbar.classList.add("toolbar")

    let locatorInput = document.createElement("input");
    locatorInput.type = "file"
    locatorInput.id = "locatorInput"
    toolbar.appendChild(locatorInput)

    let updateLocatorsBtn = document.createElement("button");
    updateLocatorsBtn.innerHTML = "Update"
    updateLocatorsBtn.onclick = function () {
        let locatorFile = locatorInput.files[0]
        const reader = new FileReader();
        reader.onload = function() {
            let resultStr = reader.result;
            let result = JSON.parse(resultStr)
            localStorage.setItem("locators", JSON.stringify(result))
            arr1 = readDataFromStorage();

            if (!isTabsCreated()) {
                let parent = document.getElementsByClassName("infoBar")[0];
                let warningMessage = document.getElementById("warningMessage")
                parent.replaceChild(createTabs(), warningMessage)
            }
            displayCoverageInfo(arr1);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
        reader.readAsText(locatorFile);
    };
    toolbar.appendChild(updateLocatorsBtn)

    let button = document.createElement("button");
    button.innerHTML = "Reset"
    button.onclick = function () {
        arr1 = readDataFromStorage()
        showElements(arr1);
        let barText = setBarText(arr1);
        let section1 = document.getElementById("section1");
        section1.innerHTML = barText;

        let barTests = setBarTests(arr1);
        let section2 = document.getElementById("section2");
        section2.innerHTML = barTests;
    };
    toolbar.appendChild(button)

    return toolbar;
}

function displayCoverageInfo(arr) {
    let barText = setBarText(arr);
    let section1 = document.getElementById("section1");
    section1.innerHTML = barText;

    let barTests = setBarTests(arr);
    let section2 = document.getElementById("section2");
    section2.innerHTML = barTests;
}

function isTabsCreated() {
    return document.getElementById("coverageInfoBar") !== null;
}

function readDataFromStorage() {
    return JSON.parse(localStorage.getItem('locators'));
}

function splitAndShowInfo() {
    const wrapAll = (target, wrapper = document.createElement('div')) => {
        [...target.childNodes].forEach(child => wrapper.appendChild(child));
        target.appendChild(wrapper);
        return wrapper
    };

    const arr1 = readDataFromStorage();

    let row = document.createElement("div");
    row.classList.add("pageContainer");

    let bodyWrapper = wrapAll(document.body);
    bodyWrapper.classList.add("bodyWrapper")
    row.appendChild(bodyWrapper);

    const bar = document.createElement("div");
    bar.classList.add("infoBar");
    bar.appendChild(createToolBar())

    if (arr1 !== null) {
        bar.appendChild(createTabs());
    } else {
        let message = document.createElement("label");
        message.id = "warningMessage";
        message.innerHTML = "Sorry, you don't have any locators yet. Upload at least one to see your coverage.";
        bar.appendChild(message)
    }

    row.appendChild(bar);
    document.body.appendChild(row);

    if (arr1 !== null) {
        displayCoverageInfo(arr1);
    }
}

splitAndShowInfo();
