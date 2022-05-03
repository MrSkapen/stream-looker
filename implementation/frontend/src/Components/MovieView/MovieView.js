import './MovieView.css';
import {useEffect} from "react";

const MovieView = (props) => {

    const {movie} = props;

    const getYTLink = () => {
        fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=gBrmnB5aOSI&format=json")
            .then(data=>data.json())
            .then(res=>console.log(res))
    }
    useEffect(()=>{
        getYTLink();
    },[])
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
                    <span>{movie.tmdb_type}</span>
                    <span>Genres: {movie.genre_names.join(", ")}</span>
                    <div className="movie-element-ratings">
                        <div className="movie-rating">
                            <span>User rating: </span>
                            <div className="movie-element-rating-box">
                                {movie.user_rating}
                            </div>
                        </div>
                        <div className="movie-rating">
                            <span>Critics rating: </span>
                            <div className="movie-element-rating-box">
                                {movie.critic_score}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="network-list">
                <strong>Available at: {movie.network_names.join(", ")}</strong>
            </div>
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
        </div>
    );
}

export default MovieView;