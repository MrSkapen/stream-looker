import './MovieElement.css'

const MovieElement = (props) => {

    const {onClick, title, type, year} = props;

    return (
        <button onClick={onClick}>
            <div className="movie-element">
                <div className="movie-element-data">
                    <span className="movie-element-title">{title}</span>
                    <span>Year: {year}</span>
                    <span>Type: {type}</span>
                </div>
            </div>
        </button>

    )
}

export default MovieElement;