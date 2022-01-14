import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Typography } from "@material-ui/core";

const RatingMovieList = (props) => {
  const AddrateComponent = props.favouriteComponent;
  const [ratingValue, setRatingValue] = React.useState(0);
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <div>
            <img src={movie.Poster} alt="movie"></img>
            <Rating
              className="d-flex flex-row align-items-center justify-content-start"
              name={movie.imdbID}
              value={movie.rating}
              precision={0.5}
              disabled={movie.disabled}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
                movie.rating = newValue;
                var Movie = { imdbId: movie.imdbID, rating: newValue };
                movie.disabled = true;
                props.setRatingValue(Movie);
              }}
            />

            <div className="d-flex flex-row align-items-center justify-content-center">
              <div onClick={() => props.handleFavouritesClick(movie)}>
                <AddrateComponent />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RatingMovieList;
