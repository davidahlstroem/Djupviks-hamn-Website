import { getInfo } from "./fetchInfo.js";

createApi();

function createApi() {
    getInfo().then(insertInfo);
}

function insertInfo(result) {
    //console.dir(result);
    var currentdate = getCurrentDate();
    var temp = 0;
    for (var i = 0; i < result.timeSeries.length; i++) {
        
        for (var j = 0; j < result.timeSeries[i].parameters.length; j++) {
            
            if (result.timeSeries[i].validTime === currentdate && result.timeSeries[i].parameters[j].name === "t") {
                temp = result.timeSeries[i].parameters[j].values[0];

            }
        } 
    }
    writeWeather(temp);
}

function writeWeather(temp) {
    return document.getElementById("temp").innerHTML = `I Djupvikshamn är det under nästkommande timme ${temp} grader varmt.`;
}

function getCurrentDate() {
    var ct = new Date();
    var utc = new Date(ct.getTime() + ct.getTimezoneOffset());
    utc.setUTCHours(utc.getUTCHours() + 3); // enkel fix
    const datetime = utc.toISOString().split(':')[0] + ":00:00Z"; 
    return datetime;
}
