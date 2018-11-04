$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAf8JGFAG6H49utBS5fWSc8Wxje2m2LVrM",
        authDomain: "trainscheduler-4bd24.firebaseapp.com",
        databaseURL: "https://trainscheduler-4bd24.firebaseio.com",
        projectId: "trainscheduler-4bd24",
        storageBucket: "trainscheduler-4bd24.appspot.com",
        messagingSenderId: "89456537553"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    let trainTime = 0;
    let frequency;
    let nextTrainTime;
    let nextTrainMins;

    function getTimes () {

        
 
    }

    // Populates table with new or old data.
    // function popTable() {

    //     console.log(trainName)
    //     console.log(destination)
    //     console.log(trainTime)
    //     console.log(frequency)

    //     let tableRow = $("<tr>");
    //     let tableTrainName = $("<td>").text(trainName);
    //     let tableDestination = $("<td>").text(destination);
    //     let tableFrequency = $("<td>").text(frequency);
    //     let tableNext = $("<td>");
    //     let tableMinsAway = $("<td>");

    //     tableRow.append([tableTrainName, tableDestination, tableFrequency, tableNext, tableMinsAway]);
    //     $("#tableBody").append(tableRow);

    // }

    database.ref().on("child_added", function (snapshot) {

        let data = snapshot.val();
        let tableRow = $("<tr>");
        let tableTrainName = $("<td>").text(data.trainName);
        let tableDestination = $("<td>").text(data.destination);
        let tableFrequency = $("<td>").text(data.frequency);

        let currentTime = moment();
        let timeDiff = moment().diff(moment.unix(data.trainTime), "minutes");
        let remainingTime = timeDiff % data.frequency;
        let minsTillTrain = data.frequency - remainingTime;
        let nextTrainTime = moment().add(minsTillTrain, "minutes");
        let nextTrainTimeFormatted = moment(nextTrainTime).format("hh:mm");

        let tableNext = $("<td>").text(nextTrainTimeFormatted);
        let tableMinsAway = $("<td>").text(minsTillTrain);

        tableRow.append([tableTrainName, tableDestination, tableFrequency, tableNext, tableMinsAway]);
        $("#tableBody").append(tableRow);


    })


    // Click handler for submit button, sets data within fields and then clears them.
    $("#submitBtn").on("click", function (event) {

        event.preventDefault();

        let trainName = $("#trainNameInput").val().trim();
        let destination = $("#destinationInput").val().trim();
            trainTime = moment($("#timeInput").val(), "hh:mm").format("X");
        let frequency = $("#frequencyInput").val().trim();
        

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");

        // Pushes data into firbase.
        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        })
    });
});