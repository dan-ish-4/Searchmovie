import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {


	// State variables for managing movies, favourites, and search value
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');


    // Function to fetch movie data based on the search value
	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5697be49`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};


	// useEffect to fetch movies when the searchValue changes
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


	// useEffect to retrieve and set favourites from local storage
	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		setFavourites(movieFavourites);
	}, []);


	// Function to save favourites to local storage
	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};
  

	// Function to add a movie to the favourites
	const addFavouriteMovie = (movie) => {
		const newFavouriteList =Array.isArray(favourites)? [...favourites, movie]:[movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	// Function to remove a movie to the favourites

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};


	//this is going to render the UI 
	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourite}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;