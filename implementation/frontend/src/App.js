import './App.css';
import SearchBox from "./Components/SearchBox/SearchBox";
import {useCallback, useState} from "react";
import MovieElementList from "./Components/MovieElementList/MovieElementList";
import MovieView from "./Components/MovieView/MovieView";
import axios from "axios";
import useDebounce from "./useDebounce";

const App = () => {

    const [textFromSearch, setTextFromSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [titleForRequest, setTitleForRequest] = useState('');
    const [selectedMovie, selectMovie] = useState(null);

    const getResultsFromRequest = async (phrase) => {
        const res = await axios.get(`http://localhost:8080/suggestions/${phrase}`);
        const {data: {result}} = res;
        const mappedResults = result.map(movie => {
            return {
                id: movie.WatchmodeID,
                title: movie.Title,
                year: movie.Year,
                type: movie.TMDBType
            }
        })
        setMovies(mappedResults)
    }

    const getMovieFromRequest = async (id) => {
        const res = await axios.get(`http://localhost:8080/details/${id}`);
        const {data} = res;
        return data
    }

    const getSearchRequest = useCallback((phrase) => getResultsFromRequest(phrase), [])

    const debouncedRequest = useDebounce(getSearchRequest, 1500);

    const handleSearchInput = (text) => {
        setTextFromSearch(text);
        selectMovie(null);
        if (text.length > 2) {
            setTitleForRequest(text)
            debouncedRequest(text)
        } else {
            setMovies([])
            setTitleForRequest('')
        }
    };

    const handleMovieClick = (id) => {
        getMovieFromRequest(id).then(movie => selectMovie(movie))
    }

    return (
        <div className="App">
            {/*<div>*/}
            {/*    Some logo*/}
            {/*</div>*/}
            <div className="website-middle">
                <span className="entry-text">Welcome, let us find a movie for you!</span>
                <SearchBox
                    onChange={handleSearchInput}
                    placeholder="Enter movie title..."
                    value={textFromSearch}
                />
                {
                    selectedMovie && <MovieView movie={selectedMovie} onClick={handleMovieClick}/>
                }
                {
                    titleForRequest.length > 2 && !selectedMovie &&
                    <MovieElementList movieTitle={titleForRequest} movies={movies} onClick={handleMovieClick}/>
                }
            </div>
        </div>
    );
}

export default App;
