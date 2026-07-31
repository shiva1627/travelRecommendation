// Function to handle search (Tasks 7 & 8)
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    if (searchInput === '') {
        return; 
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let matchedResults = [];

            if (searchInput.includes('beach')) {
                matchedResults = data.beaches;
            } else if (searchInput.includes('temple')) {
                matchedResults = data.temples;
            } else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(searchInput) || searchInput.includes('country')) {
                        country.cities.forEach(city => {
                            matchedResults.push(city);
                        });
                    } else {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(searchInput)) {
                                matchedResults.push(city);
                            }
                        });
                    }
                });
            }

            // Display results in Grid format (Task 8)
            if (matchedResults.length > 0) {
                matchedResults.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('result-card');
                    
                    // Optional Task 10: Example of getting time for a recommendation
                    let timeString = '';
                    if (item.name.includes('Sydney')) {
                        const options = { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        timeString = `<p style="color: #2dd4bf; margin-top: 5px;">Current time: ${new Date().toLocaleTimeString('en-US', options)}</p>`;
                    } else if (item.name.includes('Tokyo')) {
                        const options = { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        timeString = `<p style="color: #2dd4bf; margin-top: 5px;">Current time: ${new Date().toLocaleTimeString('en-US', options)}</p>`;
                    }

                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        ${timeString}
                    `;
                    resultContainer.appendChild(card);
                });
            } else {
                resultContainer.innerHTML = '<p style="color: white; padding: 20px;">No matching recommendations found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function for Clear button (Task 9)
function handleClear() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultContainer').innerHTML = '';
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', handleClear);
    }
});