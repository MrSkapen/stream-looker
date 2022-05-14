import MovieElement from "../MovieElement/MovieElement";
import './MovieElementList.css';

const MovieElementList = (props) => {
    const {movieTitle, movies, onClick} = props;

    const renderMoviesComponents = () => {
        return movies.map(movie => {
            return (
                <MovieElement
                    key={movie.id}
                    onClick={() => onClick(movie.id)}
                    poster={movie.poster}
                    title={movie.title}
                    type={movie.type}
                    year={movie.year}
                />
            )
        })
    }

    return (
        <div className="movie-element-list">
            <span>Results for: {movieTitle}</span>
            {renderMoviesComponents()}
        </div>
    )
};

export default MovieElementList;