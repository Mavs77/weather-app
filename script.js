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

    // //api url 
    // const apiURL = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QVXWFK8AMYT3AR5BL7TCBRRXW`); 

        try {
            const apiURL = await fetch (`${weatherAPI}`)
            
            if (!apiURL.ok) {
                throw new Error(`HTTP error! status: ${apiURL.status}`)}

        const data = await apiURL.json(); 
        console.log('Data fetched successfully', data); 
        console.log('Address:', data.resolvedAddress); 
        console.log('Conditions:', data.currentConditions.conditions); 
        console.log('Feels like:', `${data.currentConditions.feelslike} degrees`); 
        // Converting the date format
        const rawDate = data.days[0].datetime;
        // the new Date() keyword is specifically designed to create Date objects in JS. These ojbects are part of JS's built-in Date class, which includes specialized methods for working with dates and times. 
        const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        });
        console.log('Date:', formattedDate);
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }

}
}); 


