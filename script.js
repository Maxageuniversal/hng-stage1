// script.js

// Function to fetch data from API and update the page
async function fetchAndDisplayGreeting() {
    const url = 'https://hng-stage1-mu.vercel.app/api/hello?visitor_name=Mark';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const apiResponseElement = document.getElementById('apiResponse');
        apiResponseElement.innerHTML = `
            <p>Client IP: ${data.client_ip}</p>
            <p>Location: ${data.location}</p>
            <p>Greeting: ${data.greeting}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally handle error display
        const apiResponseElement = document.getElementById('apiResponse');
        apiResponseElement.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

// Call the function when the page loads
window.onload = fetchAndDisplayGreeting;
