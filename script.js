//hyphen is not allowed to use in naming of js variables
const searchForm = document.querySelector('form') ;
const movieContainer = document.querySelector('.movie-container') ;
const inputBox = document.querySelector('.input-box') ;

//function to fetch movie details using api
const getMovieInfo = async (movie) => {
    try {
        const myapiKey = 'd547a6f' ;
        const url = `http://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}` ;

        const response = await fetch(url) ;

        if(!response.ok) {
            throw new Error("Unable to fetch movie data.") ;
        }
        const data = await response.json() ;

        //console.log(data) ;
        showMovieData(data) ;
    } catch (error) {
        showErrorMessage("No Movie Found !!") ;
    }
    
}

//func to display error msg
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>` ;
    movieContainer.classList.add('noBackground') ;
}

//func to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "" ;
    movieContainer.classList.remove('noBackground') ;

    //use destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, BoxOffice } = data ;

    const movieElement = document.createElement('div') ; //syntax to create a div tab in js
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: </strong>${imdbRating}<strong> &#11088;</strong></p>` ;

    const movieGenreElement = document.createElement('div') ;
    movieGenreElement.classList.add('movie-genre') ;
    movieElement.classList.add('movie-info') ;

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element ;
        movieGenreElement.appendChild(p) ;
    }) ;

    movieElement.appendChild(movieGenreElement) ;

    movieElement.innerHTML += `<p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Release Date: </strong>${Released}
                              <p><strong>Duration: </strong>${Runtime}
                              <p><strong>Plot: </strong>${Plot}
                              <p><strong>Box-Office: </strong>${BoxOffice}` ;

    //creating a div for image
    const moviePosterElement = document.createElement('div') ;
    moviePosterElement.classList.add('movie-poster') ;
    moviePosterElement.innerHTML = `<img src="${Poster}"/>` ;

    movieContainer.appendChild(moviePosterElement) ;
    movieContainer.appendChild(movieElement) ;
}

//adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault() ;
    const movieName = inputBox.value.trim() ; //trims the spaces before and after movie name
    if(movieName !== '') {
        showErrorMessage("Fetching Movie Information...") ;
        getMovieInfo(movieName) ;
    } else {
        showErrorMessage("Enter Movie Name to get information") ;
    }
});