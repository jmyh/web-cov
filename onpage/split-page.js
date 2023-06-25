var arr1 = JSON.parse(localStorage.getItem('locators'));

var barText = "";
var barTests = "";
var indent = 1;

const wrapAll = (target, wrapper = document.createElement('div')) => {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper
};

function setBarText(arr) {
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
    console.log("Tests: "+ arr[0].tests);
    console.log("Keys: "+ Object.keys(arr[0].tests));

    for (let i in arr) {
        console.log("arr[i]: "+JSON.stringify(arr[i]))
        if (arr[i].fullPath !== null) {
            const keys = Object.keys(arr[i].tests)
            for (let k in keys) {
                barTests = barTests + Array(indent).join('--') + keys[k] + "<br>";
            }
        }
        if((arr.length - 1) === Number(i)) {
            indent--;
        }
        barTests = barTests + '<br/>'
    }
    return barText;
}

function barTabs() {
    var info = document.createElement("div");
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

    let button = document.createElement("button");
    button.innerHTML = "Reset"
    button.onclick = function () {
        showElements(arr1);
        let section1 = document.getElementById("section1");
        section1.innerHTML = barText;

        let section2 = document.getElementById("section2");
        section2.innerHTML = barTests;
    };
    toolbar.appendChild(button)

    return toolbar;
}

function splitAndShowInfo() {
    const bodyWrapper = wrapAll(document.body);
    bodyWrapper.classList.add("bodyWrapper")

    var bar = document.createElement("div");
    bar.classList.add("infoBar");
    bar.appendChild(createToolBar())
    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");
    row.appendChild(bodyWrapper);
    row.appendChild(bar);

    document.body.appendChild(row);

    setBarText(arr1);
    var section1 = document.getElementById("section1");
    section1.innerHTML = barText;

    setBarTests(arr1);
    var section2 = document.getElementById("section2");
    section2.innerHTML = barTests;
}

splitAndShowInfo();
