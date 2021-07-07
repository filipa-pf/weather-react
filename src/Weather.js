import axios from 'axios';

export default function Weather() {

    function handleResponse(response) {
        alert(response.data.main.temp)
    }
    let apiKey = "bcd6bffb67c533bc97521b927a7799b4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(handleResponse);

    return <h2>Helloooo</h2>;
}