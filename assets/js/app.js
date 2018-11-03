$(document).ready(function () {
    
    $("#submitBtn").on("click", function (event) {
        
        event.preventDefault();

        let trainName = $("#trainNameInput").val();
        let destination = $("#destinationInput").val();
        let trainTime = $("#timeInput").val();
        let frequency = $("#frequencyInput").val();

        console.log(trainName)
        console.log(destination)
        console.log(trainTime)
        console.log(frequency)
    });




});