// Initialize global variables
const searchInput = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const searchResults = document.querySelector('.search-results');
const movieContainer = document.querySelector('.movie-container');
const loading = document.querySelector('.loading');
let selectedMovie;

// Show the loading animation
function showLoading() {
  loading.style.display = 'block';
}

// Hide the loading animation
function hideLoading() {
  loading.style.display = 'none';
}
// Display the search results in a dropdown menu
function displaySearchResults(movies) {
    // Clear any previous search results
    searchResults.innerHTML = '';
  
    // Loop through the movies and create a list item for each movie
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('search-result');
      li.innerHTML = `${movie.Title} (${movie.Year})`;
  
      // Store the imdbID of the movie in the dataset
      li.dataset.imdbID = movie.imdbID;
  
      // Add the list item to the search results
      searchResults.appendChild(li);
    });
  }
// Select a movie from the search results
function selectMovie(event) {
    // Get the selected list item
    const li = event.target;
  
    // Check if the target is a list item
    if (li.tagName === 'LI') {
      // Get the imdbID of the selected movie from the dataset
      selectedMovie = li.dataset.imdbID;
  
      // Remove the active class from all the search results
      searchResults.querySelectorAll('.search-result').forEach(result => {
        result.classList.remove('active');
      });
  
      // Add the active class to the selected search result
      li.classList.add('active');
  
      // Show the details of the selected movie
      showMovieDetails();
  
      // Hide the search results dropdown
      searchResults.style.display = 'none';
    }
  }
  
  
// Search for movies
function searchMovies(event) {
    // Get the search query
    const query = searchInput.value;
  
    // Check if the search query is not empty
    if (query) {
      // Show the loading animation
      showLoading();
  
      // Make the API call to search for movies
      axios
        .get('https://www.omdbapi.com/', {
          params: {
            apikey: '9969b9ec',
            s: query
          }
        })
        .then(response => {
          // Hide the loading animation
          hideLoading();
  
          // Get the search results from the response
          const movies = response.data.Search;
  
          // Check if there are any search results
          if (movies) {
            // Display the search results
            displaySearchResults(movies);
  
            // Show the search results dropdown
            searchResults.style.display = 'block';
          }
        })
        .catch(error => {
          // Hide the loading animation
          hideLoading();
  
          // Log the error to the console
          console.error(error);
        });
    }
  }
  
  // Show the details of the selected movie
function showMovieDetails() {
    // Check if a movie is selected
    if (selectedMovie) {
      // Show the loading animation
      showLoading();
  
      // Make the API call to get the detailed movie information
      axios
        .get('https://www.omdbapi.com/', {
          params: {
            apikey: '9969b9ec',
            i: selectedMovie
          }
        })
        .then(response => {
          // Hide the loading animation
          hideLoading();
  
          // Get the movie information from the response
          const movie = response.data;
  
          // Check if the movie exists
          if (movie) {
            // Create the HTML for the movie details
            const html = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-3by4">
                    <img src="${movie.Poster}" alt="Poster for ${movie.Title}" />
                  </figure>
                </div>
  
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="${movie.Poster}" alt="Poster for ${movie.Title}" />
                      </figure>
                    </div>
  
                    <div class="media-content">
                      <p class="title is-4">${movie.Title}</p>
                    </div>
                  </div>
  
                  <div class="content">
                    <p>IMDB Rating: ${movie.imdbRating}</p>
                    <p>Box Office: ${movie.BoxOffice}</p>
                    <p>Metascore: ${movie.Metascore}</p>
                  </div>
                </div>
              </div>
            `;
  
            // Show the movie details in the movie container
            movieContainer.innerHTML = html;
            movieContainer.style.display = 'block';
          }
        })
        .catch(error => {
          // Hide the loading animation
          hideLoading();
  
          // Log the error to the console
          console.error(error);
        });
    }
  }
  // Hide the movie details
function hideMovieDetails() {
    movieContainer.innerHTML = '';
    movieContainer.style.display = 'none';
  }
  // Search for movies when the user presses the Enter key
function searchMoviesOnEnter(event) {
    // Check if the key pressed is the Enter key
    if (event.keyCode === 13) {
      // Prevent the default action of the Enter key
      event.preventDefault();
  
      // Hide the movie details
      hideMovieDetails();
  
      // Search for movies
      searchMovies();
    }
  }

  // Add event listeners
searchInput.addEventListener('keydown', searchMoviesOnEnter);
searchButton.addEventListener('click', searchMovies);
searchResults.addEventListener('click', selectMovie);

  
  
