// Client Side, if I have console.log the output show in Browser Console.
/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = "&appid=dd9ac0131ddd4de4a4a9018ccbd2b6f3&units=imperial";
const apiUrl = "http://localhost:8080/";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', Generate);

/** Post Data To API */
function Generate() {
    // take value User Enter
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    
    getData(baseURL, zip, apiKey).then(function(data){
        console.log(data);
        // 'data' is Api 'json file' then I can access it " data.co , data.massage" & "data.list[0].main.temp"
        // ex zip 10001 : http://api.openweathermap.org/data/2.5/forecast?zip=10001&appid=dd9ac0131ddd4de4a4a9018ccbd2b6f3&units=imperial
        // console.log(data.cod);
        if (data.cod != 200) {
             alert(data.message);
    } else {
        postDateToServer(`${apiUrl}postAllData`, {
            temp:data.list[0].main.temp,
            contant:feelings,
            date:newDate
        });
        // I take data so, Update UI Now
        updateUI(); 
    }
    }); 
};

// this link help me : https://forum.freecodecamp.org/t/using-async-await-along-with-fetch/188375/2
const getData = async (baseURL, zip, apiKey) => {
    // take data from Api
    const result = await fetch(baseURL+zip+apiKey);
    try {
         // Transform into JSON
        const data = await result.json();
        return data;
    }catch(error){
        console.log("error",error);
    }

}

// Async POST
// this link help me : https://stackoverflow.com/questions/29775797/fetch-post-json-data
const  postDateToServer = async (url = '', data = {}) => {
    console.log(data);
    //Do it from lesson
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',  // include, *same-origin, omit
        headers: { 
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json' 
        },
        // Body data type must match "Content-Type" header   
        body: JSON.stringify(data), 
    });

    try {
        //Do it from lesson
        const dataNew = await response.json();
        console.log(dataNew);
        return dataNew;
    } catch (error) {
        // appropriately handle the error
        console.log("error",error);
    }
}

/** Update UI - Async GET */
const updateUI = async () => {
    // Do it from lesson "Updating UI Elements"
    const response = await fetch(`${apiUrl}getAllData`);
    try {
        // Transform into JSON
        const All = await response.json();
        document.querySelector('#date').innerHTML = `Date : ${All.date}`;
        document.querySelector('#temp').innerHTML = `Temperature(°C) : ${All.temp}`;
        document.querySelector('#content').innerHTML = `Feelings : ${All.contant}`;
    } catch (error) {
        // appropriately handle the error
        console.log("error",error);
    }
}