import './MovieView.css';
import MovieElementExtended from "../MovieElementExtended/MovieElementExtended";

const MovieView = (props) => {

    const {movie, onClick} = props;

    const renderSimilarTitles = () => {
        return movie.similar_titles && movie.similar_titles.slice(0,5).map(similarTitle => {
            return (<MovieElementExtended
                criticsRating={similarTitle.critic_score}
                userRating={similarTitle.user_rating}
                key={similarTitle.id}
                networks={similarTitle.network_names}
                poster={similarTitle.poster}
                title={similarTitle.title}
                type={similarTitle.type}
                year={similarTitle.year}
                id={similarTitle.id}
                onClick={onClick}
            />)
        })
    }
    return (
        <div className="movie-view">
            <div className="movie-view-top">
                <div className="movie-view-poster">
                    <img src={movie.poster} alt={"poster"}/>
                </div>
                <div className="movie-view-data">
                    <div className="movie-view-title">
                        {movie.title}
                    </div>
                    <div>
                        {movie.plot_overview}
                    </div>
                    <span>Year: {movie.year}</span>
                    <span>Type: {movie.tmdb_type}</span>
                    <span>Genres: {movie.genre_names.join(", ")}</span>
                    <div className="movie-element-ratings">
                        <div className="movie-rating">
                            <span>User rating: </span>
                            <div className="movie-element-rating-box">
                                {movie.user_rating ? movie.user_rating : "?"}
                            </div>
                        </div>
                        <div className="movie-rating">
                            <span>Critics rating: </span>
                            <div className="movie-element-rating-box">
                                {movie.critic_score ? movie.critic_score : "?"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="network-list">
                <strong>Available at: {movie.network_names.join(", ")}</strong>
            </div>
            {movie.trailer ?
                <div className="yt-video">
                    <iframe
                        width="512"
                        height="288"
                        src={movie.trailer.replace('/watch?v=', '/embed/')}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
                :
                <div>
                    <span>Trailer not available</span>
                </div>
            }
            <div className="similar-titles">
                <span>Similar titles: </span>
                {renderSimilarTitles()}
            </div>
        </div>
    );
}

export default MovieView;