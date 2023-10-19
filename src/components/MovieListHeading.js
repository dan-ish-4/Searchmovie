import React from 'react';
// MovieListHeading is a functional component that displays a heading for a movie list.
const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading