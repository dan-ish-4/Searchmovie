import React from 'react';
// MovieList is a functional component that displays a list of movies.
const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
// The FavouriteComponent is a component provided as a prop.
	return (
		<>
          
			{props.movies?.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
	  </>
	);
};

export default MovieList;