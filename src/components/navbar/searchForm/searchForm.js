/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import css from "./searchForm.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { useGetProductsQuery } from "../../../store/modules/apiSlice";
import cx from "classnames";
import { useRouter } from "next/router";

export default function SearchForm() {
  const [inputData, setInputData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const router = useRouter();

  console.log("searchResults", searchResults);
  console.log("inputData", inputData);

  const { data: productsData, isSuccess } = useGetProductsQuery({
    category: "",
    filter: { alphabet: "asc", limit: "" },
  });

  const handleSearch = () => {
    if (isSuccess) {
      const filteredResults =
        inputData === ""
          ? []
          : productsData.filter((item) =>
              item.title.toLowerCase().includes(inputData.toLowerCase())
            );
      setSearchResults(filteredResults);
      console.log("filteredResults", filteredResults);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputData]);

  return (
    <>
      <div
        className={cx(css.overlay, isSearchListOpen && css.open)}
        onClick={() => setIsSearchListOpen(false)}
      ></div>
      <div className={css.searchFrom}>
        <div className={css.searchWrap}>
          <input
            type="search"
            placeholder="Search"
            value={inputData}
            onChange={(event) => {
              setInputData(event.target.value);
              setIsSearchListOpen(true);
            }}
            //   onKeyUp={(event) => {
            //     if (event.key === "Enter") {
            //       handleSearch();
            //     }
            //   }}
            // onClick={() => }
          />

          <div className={css.searchedList}>
            {isSearchListOpen &&
              searchResults.map((element) => (
                <div
                  key={element.id}
                  className={css.searchedItem}
                  onClick={() => {
                    router.push(`/products/${element.id}`);
                    setIsSearchListOpen(false);
                  }}
                >
                  {element.title}
                </div>
              ))}
          </div>
        </div>
        <div className={css.searchIcon}>
          <BiSearchAlt2 />
        </div>
      </div>
    </>
  );
}
