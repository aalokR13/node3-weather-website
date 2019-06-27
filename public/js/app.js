console.log('get it from public/js/app.js');

const weather = document.querySelector('form');
const address = document.querySelector('input');
//consr res = document.getElementById('weather_result_p');
//consr err = document.getElementById('weather_result_error');
weather.addEventListener('submit', (e) => {
    const addr = address.value;
    document.getElementById('weather_result_p').innerHTML = 'Loading...............';
    e.preventDefault();
    if (addr) {
        fetch('/weather?address=' + addr).then((response) => {
            response.json().then((data) => {
                console.log(data);
                document.getElementById('weather_result_p').innerHTML = data.forecastdata;

            })
        })
    } else {
        document.getElementById('weather_result_p').innerHTML = '';
        document.getElementById('weather_result_error').innerHTML = 'Please provide valid value';
        console.log('Please provide valid value');
    }

    console.log(addr);
});