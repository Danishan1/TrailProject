import React from "react";
import style from "../css/SearchBox.module.css";
import Search from "./Search";

const SearchBox = () => {
  return (
    <div className={style.searchBox}>
      <Search />
    </div>
  );
};

export default SearchBox;
