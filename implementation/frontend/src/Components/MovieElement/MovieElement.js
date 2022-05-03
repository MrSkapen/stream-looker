import './MovieElement.css'
const MovieElement = (props) => {

    const {criticsRating, networks, onClick, poster, title, type, year, userRating} = props;

    const networksToString = () => {
        return networks.join(", ")
    }

    return (
        <button onClick={onClick}>
            <div className="movie-element">
                <div className="movie-element-poster">
                    <img src={poster} alt={"poster"}/>
                </div>
                <div className="movie-element-data">
                    <div className="movie-element-title">
                        <span>{title}</span>
                        <span>{year}</span>
                        <span>{type}</span>
                    </div>
                    <span>Available at: {networksToString()}</span>
                </div>
                <div className="movie-element-ratings">
                    <div className="movie-rating">
                        <span>User rating: </span>
                        <div className="movie-element-rating-box">
                            {userRating}
                        </div>
                    </div>
                    <div className="movie-rating">
                        <span>Critics rating: </span>
                        <div className="movie-element-rating-box">
                            {criticsRating}
                        </div>
                    </div>
                </div>
            </div>
        </button>

    )
}

export default MovieElement;