/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '024320aa736b897bed602052a4eae1f6&units=imperial';
let newDate = new Date().toLocaleDateString();

document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    try {
        const weatherData = await getWeather(zip);
        await postData('/add', 
        { 
            date: newDate,
            temp: weatherData.main.temp, 
            content: feelings 
        });
        updateUI();
    } catch (error) {
        console.error("ERR:", error);
    }
}

async function getWeather(zip) {
    const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
    if (!res.ok) {
        throw new Error(`ERR: ${res.status}`);
    }

    return await res.json();
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`ERR: ${response.status}`);
    }

    return await response.json();
}

async function updateUI() {
    try {
        const request = await fetch('/all');
        if (!request.ok) {
            throw new Error(`ERR: ${request.status}`);
        }

        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.error("ERR:", error);
    }
}
