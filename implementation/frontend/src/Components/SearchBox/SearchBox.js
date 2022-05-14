import './SearchBox.css'

const SearchBox = (props) => {

    const {onChange, placeholder, value} = props;


    const handleOnChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <div className="search-box">
            <div className="search-box-input">
                <input onChange={handleOnChange} type="text" placeholder={placeholder} value={value}/>
                <div className="search-box-icon"/>
            </div>
        </div>
    );
}

export default SearchBox;