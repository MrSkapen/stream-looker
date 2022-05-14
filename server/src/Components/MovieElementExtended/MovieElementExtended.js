import './MovieElementExtended.css'

const MovieElementExtended = (props) => {

    const {criticsRating, id, networks, onClick, poster, title, type, year, userRating} = props;

    const networksToString = () => {
        return networks.join(", ")
    }

    return (
        <button onClick={()=>onClick(id)}>
            <div className="movie-element-extended">
                <div className="movie-element-extended-poster">
                    <img src={poster} alt={"poster"}/>
                </div>
                <div className="movie-element-extended-data">
                    <div className="movie-element-extended-title">
                        <span className="movie-element-extended-title-text">{title}</span>
                        <span>Year: {year}</span>
                        <span>Type: {type}</span>
                    </div>
                    <span>Available at: {networksToString()}</span>
                </div>
                <div className="movie-element-extended-ratings">
                    <div className="movie-rating">
                        <span>User rating: </span>
                        <div className="movie-element-extended-rating-box">
                            {userRating ? userRating : "?"}
                        </div>
                    </div>
                    <div className="movie-rating">
                        <span>Critics rating: </span>
                        <div className="movie-element-extended-rating-box">
                            {criticsRating ? criticsRating : "?"}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default MovieElementExtended;