import './App.css';
import SearchBox from "./Components/SearchBox/SearchBox";
import {useState} from "react";
import MovieElementList from "./Components/MovieElementList/MovieElementList";
import MovieView from "./Components/MovieView/MovieView";

const moviesMock = [
    {
        id: 1,
        title: "Title 1",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO"],
        tmdb_type: "tv show",
        year: "1892",
        genre_names: [
            "Action & Adventure",
            "Drama",
            "Sci-Fi & Fantasy"
        ],
        user_rating: 8.9,
        critic_score: 85,
        trailer: "https://www.youtube.com/watch?v=BpJYNVhGf1s",
        plot_overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    },
    {
        id: 2,
        title: "Title 2",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["Netflix", "Amazon", "HBO"],
        type: "movie"
    },
    {
        id: 3,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    },
    {
        id: 4,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    },
    {
        id: 5,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    },
    {
        id: 6,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    },
    {
        id: 7,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    },
    {
        id: 8,
        title: "Title 3",
        poster: "https://cdn.watchmode.com/posters/0345534_poster_w185.jpg",
        network_names: ["HBO", "Rakuten"]
    }
];

const App = () => {

    const [textFromSearch, setTextFromSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [titleForRequest, setTitleForRequest] = useState('');
    const [selectedMovie, selectMovie] = useState(null);

    const handleSearchInput = (text) => {
        setTextFromSearch(text);
        selectMovie(null);
        if (text.length > 2) {
            setMovies(moviesMock)
            setTitleForRequest(text)
        } else {
            setMovies([])
            setTitleForRequest('')
        }
    };

    const handleMovieClick = (id) => {
        const clickedMovie = movies.filter(movie => movie.id === id)[0];
        selectMovie(clickedMovie);
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
                    selectedMovie && <MovieView movie={selectedMovie}/>
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
