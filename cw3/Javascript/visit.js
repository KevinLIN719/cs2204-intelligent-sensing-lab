document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("visitForm");
    const dateInput = document.getElementById("visit-date");
    const timeInput = document.getElementById("visit-time");
    const visitorsInput = document.getElementById("visitor-count");
    const messageArea = document.getElementById("message-area");
    const resetBtn = document.getElementById("resetBtn");

    function reserve(date, time, numVisitors) {
        const today = new Date();
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) return false;
        if (numVisitors > 10) return false;
        if (time === "09:00-10:00") return false;
        
        return true;
    }

    function showMessage(msg, isError = true) {
    if (isError) {
        alert(msg);
    } else {
        confirm(msg + "\nClick OK to confirm.");
    }
    messageArea.innerHTML = msg;
    messageArea.style.color = isError ? "red" : "blue";
    }

    function clearMessage() {
        messageArea.innerHTML = "";
        messageArea.style = "";
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        clearMessage();
        
        const dateVal = dateInput.value.trim();
        const timeVal = timeInput.value.trim();
        const visitorsVal = visitorsInput.value.trim();

        if (dateVal === "" || timeVal === "" || visitorsVal === "") {
            showMessage("Data not completed; please re-enter");
            return false;
        }

        const visitorsNum = Number(visitorsVal);
        if (!Number.isInteger(visitorsNum) || visitorsNum < 1 || visitorsNum > 20) {
            showMessage("Please enter a valid number of people (1-20)!");
            return false;
        }

        const isSuccess = reserve(dateVal, timeVal, visitorsNum);

        if (isSuccess) {
            showMessage("Your reservation is successful!", false); 
        } else {
            showMessage("Sorry, the reservation is full!");
        }

        return false; 
    };

    resetBtn.onclick = function() {
        clearMessage(); 
    };
});