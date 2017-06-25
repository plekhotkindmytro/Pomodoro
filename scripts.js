var CLOCK_ON = false;
var INTERVAL_ID;
var WORK_TIME_LEFT_MS;
var BREAK_TIME_LEFT_MS;
var IS_WORK = true;
var AUDIO = new Audio('audio/1.mp3');

$(document).ready(function () {
    WORK_TIME_LEFT_MS = Number($("#work-value").text()) * 60 * 1000;
    BREAK_TIME_LEFT_MS = Number($("#break-value").text()) * 60 * 1000;

    $("#work-minus").on("click", update("#work-value", decrease))
    $("#work-plus").on("click", update("#work-value", increase))
    $("#break-minus").on("click", update("#break-value", decrease))
    $("#break-plus").on("click", update("#break-value", increase))

    $("#timer").on("click", timer);

});

function timer() {
    CLOCK_ON ? stopTimer() : startTimer();
}

function stopTimer() {
    // clearInterval(INTERVAL_ID);
    CLOCK_ON = false;
}

function startTimer() {
    if (IS_WORK) {
        if (WORK_TIME_LEFT_MS === Number($("#work-value").text()) * 60 * 1000) {
            clearInterval(INTERVAL_ID);
            INTERVAL_ID = setInterval(updateTimer, 1000);
        }
    } else {
        if (BREAK_TIME_LEFT_MS === Number($("#break-value").text()) * 60 * 1000) {
            clearInterval(INTERVAL_ID);
            INTERVAL_ID = setInterval(updateTimer, 1000);
        }
    }
    CLOCK_ON = true;
}

function updateTimer() {
    if (!CLOCK_ON) {
        return;
    }

    if (WORK_TIME_LEFT_MS > 0) {
        IS_WORK = true;
        WORK_TIME_LEFT_MS -= 1000;
        setTimerText(WORK_TIME_LEFT_MS);
    } else if (BREAK_TIME_LEFT_MS > 0) {
        IS_WORK = false;
        if (Number($("#break-value").text()) * 60 * 1000 === BREAK_TIME_LEFT_MS) {
            AUDIO.play();
        }
        BREAK_TIME_LEFT_MS -= 1000;
        setTimerText(BREAK_TIME_LEFT_MS, false);
    } else {
        WORK_TIME_LEFT_MS = Number($("#work-value").text()) * 60 * 1000;
        BREAK_TIME_LEFT_MS = Number($("#break-value").text()) * 60 * 1000;
        AUDIO.play();
    }
}

function setTimerText(ms, isWork) {
    var time = new Date(ms);
    var hours = time.getUTCHours();
    var minutes = time.getUTCMinutes();
    var seconds = time.getUTCSeconds();
    var text = IS_WORK ? "Work: " : "Break: ";
    text += (hours === 0 ? "" : hours + " : ");
    text += minutes + " : " + seconds;
    $("#timer").text(text);
}

function update(selector, updater) {
    return function () {
        var oldValue, newValue;
        if (!CLOCK_ON) {
            oldValue = Number($(selector).text());
            if (oldValue !== 0) {
                newValue = oldValue + updater();
                if (valid(newValue)) {
                    $(selector).text(newValue);

                    if (IS_WORK) {
                        $("#timer-wrapper").removeClass("timer-break");
                        $("#timer-wrapper").addClass("timer-work");
                        $("#timer-title").text("Session");
                    } else {
                        $("#timer-wrapper").removeClass("timer-work");
                        $("#timer-wrapper").addClass("timer-break");
                        $("#timer-title").text("Break!");
                    }

                    WORK_TIME_LEFT_MS = Number($("#work-value").text()) * 60 * 1000;
                    BREAK_TIME_LEFT_MS = Number($("#break-value").text()) * 60 * 1000;
                }
            } else {
                // refresh the page if you want to clear Pomodoro
            }
        }
    }
}


function valid(minutes) {
    return minutes >= 1 && minutes <= 60 * 24;
}

function increase() {
    return +1;
}

function decrease() {
    return -1;
}
