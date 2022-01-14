import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../app.css";
import MovieList from "./MovieList";
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import AddRate from "./AddRate";
import GetRecommendation from "./GetRecommendation";
import NullComponent from "./NullComponent";
import Button from "@material-ui/core/Button";
import RatingMovieList from "./RatingMovieList";
import { useNavigate } from "react-router-dom";
import MoreAbout from "./MoreAbout";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [movierecommend, setMovierecommend] = useState([]);
  const [clickedtorate, setClickedtorate] = useState("");
  const [clickedsimilar, setClickedsimilar] = useState("");
  const [ratingvalue, setRatingvalue] = useState({});
  const [imdb_id, setImdb_id] = useState("");
  const [rating, setRating] = useState(0);
  const u_id = localStorage.userId;
  console.log(u_id);
  let navigate = useNavigate();

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    console.log(movie);
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    setClickedtorate("Items to rate");
  };

  const getratingvalue = async (value) => {
    console.log(value);
    const newRatingvalue = value;
    var gotimdb_id = value.imdbId;
    var gotrating = value.rating;
    console.log(gotimdb_id);
    console.log(gotrating);
    var imdb_new = gotimdb_id;
    var rate = gotrating;
    console.log("IMDB", imdb_new);
    imdb_new = imdb_new.replaceAll("tt0", "");
    imdb_new = imdb_new.replaceAll("tt", "");
    console.log("new", imdb_new);
    if (u_id) {
      var content_recommendation_url = `http://127.0.0.1:8000/adduser/${u_id}/${imdb_new}/${rate}`;
      var content_recommendation_response = await fetch(
        content_recommendation_url
      );
      const content_recommendation_responseJson =
        await content_recommendation_response.json();
      console.log(content_recommendation_responseJson);
    }
  };
  const getimdbpage = (movie) => {
    const imdb = movie.imdbID;
    console.log(imdb);
    window.open(`https://www.imdb.com/title/${imdb}/`, "_blank");
  };
  const addrating = async () => {
    var imdb_new = imdb_id;
    var rate = rating;
    console.log(typeof imdb_new);
    console.log("IMDB", imdb_new);
    imdb_new = imdb_new.replaceAll("tt0", "");
    imdb_new = imdb_new.replaceAll("tt", "");
    console.log("new", imdb_new);
    if (u_id) {
      var content_recommendation_url = `http://127.0.0.1:8000/adduser/${u_id}/${imdb_new}/${rate}`;
      var content_recommendation_response = await fetch(
        content_recommendation_url
      );
      const content_recommendation_responseJson =
        await content_recommendation_response.json();
      console.log(content_recommendation_responseJson);
    }
  };
  const getRecommend = async (movie) => {
    var convertimdb = movie.imdbID;
    console.log(convertimdb);
    convertimdb = convertimdb.replaceAll("tt0", "");
    convertimdb = convertimdb.replaceAll("tt", "");
    var content_recommendation_url = `http://127.0.0.1:8000/predict/${convertimdb}`;
    var content_recommendation_response = await fetch(
      content_recommendation_url
    );
    const content_recommendation_responseJson =
      await content_recommendation_response.json();
    var result = content_recommendation_responseJson.movieId;
    const newRecommendedList = new Array();
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
      if (result[i] < 100000) {
        result[i] = "00" + result[i];
      }
      if (result[i] < 1000000) {
        result[i] = "0" + result[i];
      }
      const url = `http://www.omdbapi.com/?i=tt${result[i]}&apikey=263d22d8`;
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      newRecommendedList.push(responseJson);
      console.log(newRecommendedList);
      setClickedsimilar("Similar movies");
    }
    setMovierecommend(newRecommendedList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="mt-4 text-center ">
        <Button variant="outlined" color="primary" href="/recommendation">
          Get Personalized Recommendation
        </Button>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Searched Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          favouriteComponent={AddRate}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={clickedtorate} />
      </div>
      <div className="row">
        <RatingMovieList
          movies={favourites}
          favouriteComponent={GetRecommendation}
          handleFavouritesClick={getRecommend}
          setRatingValue={getratingvalue}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={clickedsimilar} />
      </div>
      <div className="row">
        <MovieList
          movies={movierecommend}
          favouriteComponent={MoreAbout}
          handleFavouritesClick={getimdbpage}
        />
      </div>
    </div>
  );
};
export default Home;
