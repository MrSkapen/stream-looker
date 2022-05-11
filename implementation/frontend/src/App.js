import './App.css';
import SearchBox from "./Components/SearchBox/SearchBox";
import {useState} from "react";
import MovieElementList from "./Components/MovieElementList/MovieElementList";
import MovieView from "./Components/MovieView/MovieView";
import axios from "axios";

const App = () => {

    const [textFromSearch, setTextFromSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [titleForRequest, setTitleForRequest] = useState('');
    const [selectedMovie, selectMovie] = useState(null);

    const getResultsFromRequest = async (phrase) => {
        const res = await axios.get(`http://localhost:8088/suggestions/${phrase}`);
        const {data: {result}} = res;
        return result
    }

    const getMovieFromRequest = async (id) => {
        const res = await axios.get(`http://localhost:8088/details/${id}`);
        const {data} = res;
        return data
    }

    const handleSearchInput = (text) => {
        setTextFromSearch(text);
        selectMovie(null);
        if (text.length > 2) {
            getResultsFromRequest(text).then(data => {
                const mappedResults = data.map(movie => {
                    return {
                        id: movie.WatchmodeID,
                        title: movie.Title,
                        year: movie.Year,
                        type: movie.TMDBType
                    }
                })
                setMovies(mappedResults)
            });
            setTitleForRequest(text)
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
            <div>
                Some logo
            </div>
            <div className="website-middle">
                <span>Welcome, let us find a movie for you!</span>
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
