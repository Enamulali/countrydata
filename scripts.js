document.getElementById("fetchDataBtn").addEventListener("click", fetchCountryData);
document.getElementById("modeToggle").addEventListener("change", toggleDarkMode);
document.getElementById("searchBtn").addEventListener("click", searchCountryData);


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

function searchCountryData() {
    const countryName = document.getElementById("searchInput").value.trim().toLowerCase();

    if (countryName === "") {
        document.getElementById("dataDisplay").innerHTML = "Please enter a country name.";
        return;
    }

    // Encode the country name to handle spaces and special characters
    const apiURL = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Country not found');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            const country = data[0]; // Assuming the first result is correct.

            // Display the country data in the div
            document.getElementById("dataDisplay").innerHTML = `
                <h3>${country.name.common}</h3>
                <img src="${country.flags.png}" alt="${country.name.common} flag">
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            `;
        })
        .catch(error => {
            // Display the error in the div
            document.getElementById("dataDisplay").innerHTML = `Error: ${error.message}`;
            console.error("Error fetching data:", error);
        });
}
