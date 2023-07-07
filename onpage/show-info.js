
document.onmouseover = function (event) {

    let section1 = document.getElementById("section1");
    let section2 = document.getElementById("section2");
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (!isTooltip) {
        return;
    }

    let title = target.getAttribute("title");
    console.log("Title: "+title)
    console.log("Section 1: "+section1)
    section1.innerHTML = title;

    let tests = target.getAttribute("data-tests");
    section2.innerHTML = tests;
};

