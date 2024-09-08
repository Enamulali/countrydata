document.getElementById("fetchDataBtn").addEventListener("click", fetchCountryData);
document.getElementById("modeToggle").addEventListener("change", toggleDarkMode);

// Function to fetch country data from REST Countries API
function fetchCountryData() {
    const apiURL = `https://restcountries.com/v3.1/all`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Pick a random country from the list
            const randomCountry = data[Math.floor(Math.random() * data.length)];

            // Display country data in the div
            document.getElementById("dataDisplay").innerHTML = `
                <h3>${randomCountry.name.common}</h3>
                <img src="${randomCountry.flags.png}" alt="${randomCountry.name.common} flag">
                <p><strong>Capital:</strong> ${randomCountry.capital ? randomCountry.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> ${randomCountry.region}</p>
                <p><strong>Population:</strong> ${randomCountry.population.toLocaleString()}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("dataDisplay").innerHTML = "Error fetching data.";
        });
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
