'use strict';

(() => {

    document.getElementById('movieReviewForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        const movieTitle = document.getElementById('movieTitle').value; // Get movie title from the form
        const criticName = document.getElementById('criticName').value; // Get critic name from the form
    
        const apiKey = 't28EXFijY2DhnGbGaXbW7575R2gBDNMN'; // Provided API key
    
        let apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:"Movies" AND type_of_material:"Review"&api-key=${apiKey}`;
    
        // Constructing the URL based on search criteria
        if (movieTitle && criticName) {
            apiUrl += `&q=${encodeURIComponent(movieTitle)}+${encodeURIComponent(criticName)}`;
        } else if (movieTitle) {
            apiUrl += `&q=${encodeURIComponent(movieTitle)}`;
        } else if (criticName) {
            apiUrl += `&q=${encodeURIComponent(criticName)}`;
        }
    
        // Fetch data from the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Filter the reviews based on the search criteria
                const filteredReviews = data.response.docs.filter(review => {
                    // Customize this condition based on how the movie title and critic's name are represented in the review data
                    // Example: checking if the title exists in the headline or abstract, and if the critic's name exists in the byline
                    return (review.headline.main.toLowerCase().includes(movieTitle.toLowerCase()));
                });
    
                // Display filtered reviews
                displaySearchResults(filteredReviews);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
    
   function displaySearchResults(filteredReviews) {
    const searchResultsDiv = document.getElementById('searchResults');
    // Clear previous search results
    searchResultsDiv.innerHTML = '';

    if (filteredReviews.length > 0) {
        filteredReviews.forEach(review => {
            // Extract review information
            const abstract = review.abstract;
            const title = review.headline.main;
            const author = review.byline.original;

            // Create elements to display review info
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');

            // Apply inline styles
            reviewElement.style.border = '1px solid #ccc';
            reviewElement.style.borderRadius = '5px';
            reviewElement.style.padding = '10px';
            reviewElement.style.marginBottom = '20px';

            const titleElement = document.createElement('h3');
            titleElement.textContent = `Title: ${title}`;
            titleElement.style.fontSize = '18px';
            titleElement.style.marginBottom = '5px';

            const abstractElement = document.createElement('p');
            abstractElement.textContent = `Review Abstract: ${abstract}`;
            abstractElement.style.margin = '5px 0';

            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${author}`;
            authorElement.style.margin = '5px 0';

            // Append elements to the review container
            reviewElement.appendChild(titleElement);
            reviewElement.appendChild(abstractElement);
            reviewElement.appendChild(authorElement);

            // Append the review element to the search results div
            searchResultsDiv.appendChild(reviewElement);
        });
    } else {
        searchResultsDiv.textContent = 'No reviews found for this search criteria.';
    }
}

    
    

})();

