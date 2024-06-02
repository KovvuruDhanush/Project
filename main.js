// main.js

// Function to handle form submission for login
const handleLoginFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const username = document.querySelector('#username').value; // Get username input value
    const password = document.querySelector('#password').value; // Get password input value

    // Check if username and password match the predefined values
    if (username === 'user' && password === 'password') {
        alert('Login successful'); // Display success message
        loginContainer.style.display = 'none'; // Hide login container
        contentContainer.style.display = 'block'; // Show content container
    } else {
        alert('Invalid credentials'); // Display error message
    }
};

// Function to handle logout button click
const handleLogoutButtonClick = () => {
    alert('Logged out'); // Display logout message
    loginContainer.style.display = 'block'; // Show login container
    contentContainer.style.display = 'none'; // Hide content container
};

// Function to handle form submission for movie search
const handleSearchFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    let query = searchForm.querySelector('input').value; // Get search query from input field
    searchForm.querySelector('input').value = ''; // Clear input field after submission

    if (query == '') {
        query = 'nothing'; // Set default query if input is empty
    }

    // Call function to fetch data from TVMaze API and display results
    await tvMazeApi(query);
};

// Function to fetch data from TVMaze API
const tvMazeApi = async (query) => {
    try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`); // Fetch data from API
        const shows = await res.json(); // Extract JSON response

        makeImages(shows); // Call function to display search results
    } catch (error) {
        console.error('Error fetching data:', error); // Log any errors to console
    }
};

// Function to display search results as images
const makeImages = (shows) => {
    gallery.innerHTML = ''; // Clear previous search results
    for (let show of shows) {
        if (show.show.image) {
            const card = document.createElement('div'); // Create new div element for each result
            card.classList.add('movie-card'); // Add 'movie-card' class to each result card

            const img = document.createElement('img'); // Create new image element
            img.src = show.show.image.medium; // Set image source
            img.alt = show.show.name; // Set image alt text
            card.appendChild(img); // Append image to result card

            const info = document.createElement('div'); // Create new div element for additional info
            info.classList.add('info'); // Add 'info' class to additional info container

            const title = document.createElement('h3'); // Create new heading element for title
            title.textContent = show.show.name; // Set title text content
            info.appendChild(title); // Append title to additional info container

            const summary = document.createElement('p'); // Create new paragraph element for summary
            summary.textContent = show.show.summary ? show.show.summary.replace(/<[^>]+>/g, '') : 'No summary available'; // Set summary text content
            info.appendChild(summary); // Append summary to additional info container

            card.appendChild(info); // Append additional info container to result card

            gallery.appendChild(card); // Append result card to gallery container
        }
    }
};

// Get DOM elements
const loginForm = document.getElementById('login-form'); // Get login form
const loginContainer = document.getElementById('login-container'); // Get login container
const contentContainer = document.getElementById('content-container'); // Get content container
const logoutButton = document.getElementById('logout-button'); // Get logout button
const searchForm = document.getElementById('search-form'); // Get search form
const gallery = document.querySelector('.image-container'); // Get gallery container

// Event listeners
loginForm.addEventListener('submit', handleLoginFormSubmit); // Listen for form submission on login form
logoutButton.addEventListener('click', handleLogoutButtonClick); // Listen for click event on logout button
searchForm.addEventListener('submit', handleSearchFormSubmit); // Listen for form submission on search form
