// Wrapping in a function to not leak/modify variables if the script
// was already inserted before.
(function() {
    if (window.hasRun === true)
        return true;  // Will ultimately be passed back to executeScript
    window.hasRun = true;
    // rest of code ...
    // No return value here, so the return value is "undefined" (without quotes).
})(); // <-- Invoke function. The return value is passed back to executeScript
