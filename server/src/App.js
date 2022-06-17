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
    const [loading, setLoading] = useState(false);

    const getResultsFromRequest = async (phrase) => {
        setLoading(true);
        const res = await axios.get(`/suggestions/${phrase}`);
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
        setLoading(false);
    }

    const getMovieFromRequest = async (id) => {
        const res = await axios.get(`/details/${id}`);
        const {data} = res;
        if (data.error){
            alert('Sorry, error from database')
            return;
        }
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

    const backToSearch = () => {
        selectMovie(null);
    }

    return (
        <div className="App">
            {/*<div>*/}
            {/*    Some logo*/}
            {/*</div>*/}
            <div className="website-middle">
                <span className="entry-text">Welcome, let us find a movie for you!</span>
                <div className="search-line">
                    <SearchBox
                        onChange={handleSearchInput}
                        placeholder="Enter movie title..."
                        value={textFromSearch}
                    />
                    {selectedMovie && <button className="back-to-search" onClick={backToSearch}>Back to search</button>}
                </div>
                {
                    selectedMovie && <MovieView movie={selectedMovie} onClick={handleMovieClick}/>
                }
                {
                loading && <div className="spinner_wrapper"><Spinner/></div>
                }

                {
                    !loading && titleForRequest.length > 2 && !selectedMovie &&
                    <MovieElementList movieTitle={titleForRequest} movies={movies} onClick={handleMovieClick}/>
                }
            </div>
        </div>
    );
}

const Spinner = () => <div className="loader"></div>;

export default App;
