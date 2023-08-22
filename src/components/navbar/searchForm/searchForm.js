import React from "react";
import css from "./searchForm.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";

export default function SearchForm() {
  return (
    <div className={css.searchFrom}>
      <input type="search" placeholder="Search" />
      <div className={css.searchIcon}>
        <BiSearchAlt2 />
      </div>
    </div>
  );
}
