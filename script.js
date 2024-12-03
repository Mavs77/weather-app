// document.getElementById('giph-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent the form from reloading the page

//     const searchTerm = document.getElementById('giph-search').value;
//     const weirdness = document.getElementById('weirdness-factor').value;

//     const apiURL = `https://api.giphy.com/v1/gifs/translate?api_key=As7G3HYSV6hAJPPw0QF0wUEMflrBXeFE&s=${searchTerm}&weirdness=${weirdness}`

//     try {
//         const response = await fetch(`${apiURL}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch the Giph');
//         }

//         const data = await response.json();
//         console.log(data)
//         const giphImage = document.getElementById('giph-image');
//         giphImage.src = data.data.images.original.url; // Update the image
//         giphImage.alt = `Giph for ${searchTerm}`;
//         giphImage.style.display = 'block'; // Show the image
//     } catch (error) {
//         console.error('Error fetching Giph:', error);
//     }
// });


document.getElementById('locationSearch').addEventListener('keydown', async (event) => { if (event.key === 'Enter') {
    
        const location = document.getElementById('locationSearch').value; 

        //test
        console.log(location); 

        const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QVXWFK8AMYT3AR5BL7TCBRRXW`

        try {
            const apiURL = await fetch (`${weatherAPI}`)
            
            if (!apiURL.ok) {
                throw new Error(`HTTP error! status: ${apiURL.status}`)}
                
            
            const data = await apiURL.json(); 
            console.log('Data fetched successfully', data); 

            
            const address = document.querySelector('h1'); 
            address.innerText = data.resolvedAddress; 

            // Converting the date format
            const rawDate = data.days[0].datetime;

            const [year, month, day] = rawDate.split("-"); // split into components 

            // the new Date() keyword is specifically designed to create Date objects in JS. These objects are part of JS's built-in Date class, which includes specialized methods for working with dates and times. 
            const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
                 weekday: "long",
                 month: "long",
                 day: "numeric",
                 year: "numeric",
                });

            const date = document.getElementById('currentDate'); 
            date.innerText = `${formattedDate}` 

            //temp DOM manipulation 

            const temperature = data.currentConditions.feelslike; 

            const currentTemp = document.getElementById('currentTemp'); 

            currentTemp.innerHTML = `Temp: ${temperature}&deg;F`

            //conditions DOM manipulation 
            const condition = data.currentConditions.conditions; 

            const currentCondition = document.getElementById('currentCondition'); 

            currentCondition.innerHTML = `Condition: ${condition}`

            //feel DOM manipulation 
            const otherMetrics = document.getElementById("otherMetrics");
            
            // Target specific spans using CSS selectors

            const feelsLikeSpan = otherMetrics.querySelector("div:nth-child(1) span");

            feelsLikeSpan.innerHTML = `Feels like: ${data.currentConditions.feelslike}&deg;F`

            const humiditySpan = otherMetrics.querySelector("div:nth-child(2) span");

            humiditySpan.innerHTML = `Humidity: ${data.currentConditions.humidity}%`

            const windSpan = document.getElementById("currentWind");

            windSpan.innerHTML = `Windspeed: ${data.currentConditions.windspeed} mph`

            const clearSpan = otherMetrics.querySelector("div:nth-child(4) span");

            clearSpan.innerHTML = `Condition: ${condition}`


            const forecastCards = document.querySelectorAll(".forecastCards .card1");

            // Assume 'days' is an array of forecast objects
            const forecasts = data.days;
            
            // Get today's date at midnight in UTC
            const today = new Date();
            const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
            
            // Filter forecasts to start from today
            const validForecasts = forecasts.filter(forecast => {
                const apiDate = new Date(forecast.datetime + "T00:00:00Z"); // Force UTC
                return apiDate >= todayUTC; // Only include forecasts for today and later
            });
            
            // Loop through each card and update its content
            forecastCards.forEach((card, index) => {
                if (validForecasts[index]) {
                    // Convert the API date string to a Date object
                    const apiDate = new Date(validForecasts[index].datetime + "T00:00:00Z"); // Force UTC
                    
                    // Format the date to "short day, short month date"
                    const formattedDate = new Intl.DateTimeFormat("en-US", {
                        weekday: "short", // Short day name
                        month: "short",   // Short month name
                        day: "numeric"    // Day of the month
                    }).format(apiDate);
            
                    // Populate card elements
                    card.querySelector(".cardDate").textContent = formattedDate;

            card.querySelector(".highTemp").innerHTML = `H: ${parseFloat(forecasts[index].tempmax.toFixed(0))}&deg;F`

            card.querySelector(".lowTemp").innerHTML = `L: ${parseFloat(forecasts[index].tempmin.toFixed(0))}&deg;F`

            card.querySelector(".cardCondition").innerHTML = `${forecasts[index].conditions}`
            } else {
             // Clear card content if no data available
        card.innerHTML = `<p>No data available</p>`;
        }
        });
    
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }
}
}); 


