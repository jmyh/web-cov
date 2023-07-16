
function rollback() {

    stopShowingLocators();
    // remove page container
    const pageContainer = document.getElementsByClassName('pageContainer')[0];
    pageContainer.replaceWith(...pageContainer.childNodes);

    // removing all pins
    document.querySelectorAll(".coveragePin").forEach(el => el.remove());

    // removing right panel
    document.querySelector(".infoBar").remove();

    // remove wrapper
    const parent = document.getElementsByClassName('bodyWrapper')[0];
    parent.replaceWith(...parent.childNodes);
}

console.log("Rollback")
rollback()
