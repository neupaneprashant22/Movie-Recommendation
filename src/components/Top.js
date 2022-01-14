import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./MovieList";
import "./../app.css";
import NullComponent from "./NullComponent";
// import { makeStyles } from "@material-ui/core/styles";
import MovieListHeading from "./MovieListHeading";
import MoreAbout from "./MoreAbout";
// const useStyles = makeStyles((theme) => ({
//   ourchoices: {
//     marginTop: "10px",
//   },
// }));
const Top = () => {
  const [movies, setMovies] = useState([
    {
      Title: "The Dark Knight",
      Year: "2008",
      Rated: "PG-13",
      Released: "18 Jul 2008",
      Runtime: "152 min",
      Genre: "Action, Crime, Drama",
      Director: "Christopher Nolan",
      Writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
      Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
      Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Language: "English, Mandarin",
      Country: "United States, United Kingdom",
      Awards: "Won 2 Oscars. 159 wins & 163 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "9.0/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "94%",
        },
        {
          Source: "Metacritic",
          Value: "84/100",
        },
      ],
      Metascore: "84",
      imdbRating: "9.0",
      imdbVotes: "2,443,960",
      imdbID: "tt0468569",
      Type: "movie",
      DVD: "09 Dec 2008",
      BoxOffice: "$534,858,444",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
    {
      Title: "The Matrix",
      Year: "1999",
      Rated: "R",
      Released: "31 Mar 1999",
      Runtime: "136 min",
      Genre: "Action, Sci-Fi",
      Director: "Lana Wachowski, Lilly Wachowski",
      Writer: "Lilly Wachowski, Lana Wachowski",
      Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
      Language: "English",
      Country: "United States, Australia",
      Awards: "Won 4 Oscars. 42 wins & 51 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.7/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "88%",
        },
        {
          Source: "Metacritic",
          Value: "73/100",
        },
      ],
      Metascore: "73",
      imdbRating: "8.7",
      imdbVotes: "1,775,697",
      imdbID: "tt0133093",
      Type: "movie",
      DVD: "15 May 2007",
      BoxOffice: "$171,479,930",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
    {
      Title: "Interstellar",
      Year: "2014",
      Rated: "PG-13",
      Released: "07 Nov 2014",
      Runtime: "169 min",
      Genre: "Adventure, Drama, Sci-Fi",
      Director: "Christopher Nolan",
      Writer: "Jonathan Nolan, Christopher Nolan",
      Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Language: "English",
      Country: "United Kingdom, Canada, United States",
      Awards: "Won 1 Oscar. 44 wins & 148 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.6/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "72%",
        },
        {
          Source: "Metacritic",
          Value: "74/100",
        },
      ],
      Metascore: "74",
      imdbRating: "8.6",
      imdbVotes: "1,641,725",
      imdbID: "tt0816692",
      Type: "movie",
      DVD: "31 Mar 2015",
      BoxOffice: "$188,020,017",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
    {
      Title: "Parasite",
      Year: "2019",
      Rated: "R",
      Released: "08 Nov 2019",
      Runtime: "132 min",
      Genre: "Comedy, Drama, Thriller",
      Director: "Bong Joon Ho",
      Writer: "Bong Joon Ho, Jin-won Han",
      Actors: "Kang-ho Song, Sun-kyun Lee, Yeo-jeong Cho",
      Plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      Language: "Korean, English",
      Country: "South Korea",
      Awards: "Won 4 Oscars. 306 wins & 271 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.6/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "98%",
        },
        {
          Source: "Metacritic",
          Value: "96/100",
        },
      ],
      Metascore: "96",
      imdbRating: "8.6",
      imdbVotes: "682,502",
      imdbID: "tt6751668",
      Type: "movie",
      DVD: "11 Oct 2019",
      BoxOffice: "$53,369,749",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },

    {
      Title: "The Godfather",
      Year: "1972",
      Rated: "R",
      Released: "24 Mar 1972",
      Runtime: "175 min",
      Genre: "Crime, Drama",
      Director: "Francis Ford Coppola",
      Writer: "Mario Puzo, Francis Ford Coppola",
      Actors: "Marlon Brando, Al Pacino, James Caan",
      Plot: "The Godfather follows Vito Corleone Don of the Corleone family as he passes the mantel to his son Michael",
      Language: "English, Italian, Latin",
      Country: "United States",
      Awards: "Won 3 Oscars. 31 wins & 30 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "9.2/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "97%",
        },
        {
          Source: "Metacritic",
          Value: "100/100",
        },
      ],
      Metascore: "100",
      imdbRating: "9.2",
      imdbVotes: "1,719,632",
      imdbID: "tt0068646",
      Type: "movie",
      DVD: "11 May 2004",
      BoxOffice: "$134,966,411",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
    {
      Title: "The Shawshank Redemption",
      Year: "1994",
      Rated: "R",
      Released: "14 Oct 1994",
      Runtime: "142 min",
      Genre: "Drama",
      Director: "Frank Darabont",
      Writer: "Stephen King, Frank Darabont",
      Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
      Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Language: "English",
      Country: "United States",
      Awards: "Nominated for 7 Oscars. 21 wins & 43 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "9.3/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "91%",
        },
        {
          Source: "Metacritic",
          Value: "80/100",
        },
      ],
      Metascore: "80",
      imdbRating: "9.3",
      imdbVotes: "2,485,751",
      imdbID: "tt0111161",
      Type: "movie",
      DVD: "21 Dec 1999",
      BoxOffice: "$28,699,976",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
  ]);

  // const buttonClicked = () => {
  //   console.log("Clicked");
  // };
  const getimdbpage = (movie) => {
    const imdb = movie.imdbID;
    console.log(imdb);
    window.open(`https://www.imdb.com/title/${imdb}/`, "_blank");
  };

  return (
    <div className="appbody">
      <h1 style={{ paddingTop: "10px" }}>
        <MovieListHeading heading="Our Choices" />
      </h1>
      <div className="container-fluid movie-app" id="top">
        <div className="row">
          <MovieList
            movies={movies}
            favouriteComponent={MoreAbout}
            handleFavouritesClick={getimdbpage}
          />
        </div>
      </div>
    </div>
  );
};

export default Top;
