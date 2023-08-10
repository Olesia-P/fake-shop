import css from "../styles/pageStyles/catalog.module.scss";
import cx from "classnames";
import Products from "../components/products/products";
import { useState } from "react";
import { categories } from "../utils/objects";
import { capitalizeFirstLetter } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeCatalogCategory } from "../store/modules/catalogSlice";
import { BiChevronDown } from "react-icons/bi";

export default function Catalog() {
  const { catalogCategory } = useSelector(({ catalog }) => catalog);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("A-Z");
  const [filterLink, setFilterLink] = useState("asc");
  const [filterAccordion, setFilterAccordion] = useState();

  const allFilters = { alphabet: filterLink, limit: "2" };

  return (
    <div className={css.container}>
      <div className={css.sideMenu}>
        <div className={css.list}>
          {categories.map((element) => (
            <label key={element.name} className={css.listItemSideMenu}>
              <input
                type="radio"
                name="productsType"
                onChange={() => {
                  dispatch(changeCatalogCategory(element.link));
                }}
                checked={catalogCategory === element.link}
              />
              {capitalizeFirstLetter(element.name)}
            </label>
          ))}
        </div>
        <div className={cx(css.filter, filterAccordion && css.open)}>
          <div className={css.filterHeader}>Filter:</div>
          <div className={css.filterListWrap}>
            <div className={css.filterChosen}>{filter}</div>
            <div className={css.filterAccordion}>
              <div
                className={css.filterOption}
                onClick={() => {
                  setFilterAccordion(false),
                    setFilter("A-Z"),
                    setFilterLink("asc");
                }}
              >
                A-Z
              </div>
              <div
                className={css.filterOption}
                onClick={() => {
                  setFilterAccordion(false),
                    setFilter("Z-A"),
                    setFilterLink("desc");
                }}
              >
                Z-A
              </div>
            </div>
          </div>
          <div
            className={css.chevron}
            onClick={() => setFilterAccordion(!filterAccordion)}
          >
            <BiChevronDown />
          </div>
        </div>
      </div>
      <div className={css.productsArea}>
        <Products category={catalogCategory} filter={allFilters} />
      </div>
    </div>
  );
}

//&apos;
