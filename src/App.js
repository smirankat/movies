import React, { useEffect, useState } from "react";
import "./App.css";
import MovieItem from "./components/MovieItem";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(100);

  useEffect(() => {
    if (fetching || (document.body.offsetHeight < window.innerHeight)) {
      console.log("fetching");
      fetch(
        `https://yts.mx/api/v2/list_movies.json?limit=50&page=${currentPage}`
      )
        .then((resp) => resp.json())
        .then((json) => {
          setMovies([...movies, ...json.data.movies]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(json.data.movie_count);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      movies.length < totalCount
    ) {
      setFetching(true);
    }
  };
  return (
    <div className="App">
      <h3>List of movies</h3>
      <div className="table">
        <div className="row">
          <div className="cell">Title</div>
          <div className="cell">Year</div>
          <div className="cell">Runtime</div>
          <div className="cell">Rating</div>
          <div className="cell">Comments</div>
        </div>
        {movies.map((obj, index) => (
          <MovieItem
            key={index}
            title={obj.title}
            year={obj.year}
            runtime={obj.runtime}
            rating={obj.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
