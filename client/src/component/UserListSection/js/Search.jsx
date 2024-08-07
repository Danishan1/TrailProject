import React, { useState } from "react";
import style from "../css/Search.module.css"; // Import the CSS module

const Search = ({ suggestions, tab }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([{}]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [isDropDownClicked, setDropDownClicked] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      const filtered = suggestions
        .filter((suggestion) =>
          suggestion.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((suggestion) => ({
          code: suggestion.code,
          name: suggestion.name,
        }));
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputBlur = () => {
    setInputValue("");
    // if (!isDropDownClicked) setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion, tab) => {
    // setInputValue(suggestion.name);
    tab(suggestion.code);
    setShowSuggestions(false);
    // setDropDownClicked(true);
  };

  return (
    <div className={style.search}>
      <input
        type="text"
        value={inputValue}
        // onChange={handleInputChange}
        onChange={() => {}}
        onBlur={handleInputBlur}
        placeholder="Search..."
        className={style.input}
      />
      {showSuggestions && (
        <ul className={style.suggestionsList}>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSuggestionClick(suggestion, tab);
                }}
                className={style.suggestionItem}
              >
                {suggestion.name}
              </li>
            ))
          ) : (
            <li className={style.suggestionItem}>Not Matched</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
