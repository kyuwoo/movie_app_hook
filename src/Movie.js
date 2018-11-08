import React from 'react';
import PropTypes from 'prop-types';
//import './Movies.css';

function Movie ({title, poster, genres, synopsis}) {
    return (
        <div className="Movie">
            <div className="Movie_Columns">
                <MoviePoster poster={poster} alt={title} />
            </div>
            <span>{title}</span>
            <div className="Movie_Genres">
                { genres ?
                    genres.map((genre, index) => (
                        <MovieGenre genre={genre} key={index} />
                    )) : 'none'
                }
            </div>
            <p className="Movie_Synopsis">
                {synopsis}
            </p>
        </div>
    )
}

function MoviePoster ({poster, alt}) {
    return (
        <img src={poster} alt={alt} className="Movie_Poster" />
    )
}

MoviePoster.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

function MovieGenre({genre}) {
    return (
        <span className="Movie_Genre">{genre} </span>
    )
}

export default Movie;
