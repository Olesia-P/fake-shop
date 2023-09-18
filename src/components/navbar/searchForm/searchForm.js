import { useState, useEffect, useRef } from "react";
import css from "./searchForm.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { useGetProductsQuery } from "../../../store/modules/apiSlice";
import cx from "classnames";
import { useRouter } from "next/router";
import useClickOutsideClose from "../../../hooks/useClickOutsideClose";

export default function SearchForm() {
  const [inputData, setInputData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const router = useRouter();
  const searchListRef = useRef();

  useClickOutsideClose(searchListRef, setIsSearchListOpen, isSearchListOpen);

  // const handleOutsideClick = (event) => {
  //   if (searchListRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setIsSearchListOpen(false);
  // };

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
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputData]);

  // useEffect(() => {
  //   if (isSearchListOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isSearchListOpen]);

  return (
    <>
      <div className={css.searchFrom} ref={searchListRef}>
        <div className={css.searchWrap}>
          <input
            type="search"
            placeholder="Search"
            value={inputData}
            onChange={(event) => {
              setInputData(event.target.value);
              setIsSearchListOpen(true);
            }}
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
                    setInputData("");
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

//   onKeyUp={(event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   }}
// onClick={() => }
