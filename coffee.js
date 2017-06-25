function drink() {
    var drinked = 100 - Math.round(BREAK_TIME_LEFT_MS / (Number($("#break-value").text()) * 60 * 1000) * 100);
    $(".filled").css("background-image", "linear-gradient(to bottom, #ecf0f1 " + drinked + "%, #643001 0%, #643001 50%, #532700 50%, #532700 75%, #3a1c00 75%)");

}

function fillCoffee() {
    var filled = Math.round(WORK_TIME_LEFT_MS / (Number($("#work-value").text()) * 60 * 1000) * 100);
    $(".filled").css("background-image", "linear-gradient(to bottom, #ecf0f1 " + filled + "%, #643001 0%, #643001 50%, #532700 50%, #532700 75%, #3a1c00 75%)");
}
