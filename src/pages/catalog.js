import css from "../styles/pageStyles/catalog.module.scss";
import cx from "classnames";
import Products from "../components/products/products";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCatalogCategory,
  changeCatalogFiltersAlph,
} from "../store/modules/catalogSlice";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../store/modules/apiSlice";

export default function Catalog() {
  const [filter, setFilter] = useState("A-Z");
  const [filterAccordion, setFilterAccordion] = useState();
  const { catalogCategory, catalogFilters } = useSelector(
    ({ catalog }) => catalog
  );

  const params = {
    category: catalogCategory,
    filter: catalogFilters,
  };

  const {
    data: categories,
    error,
    isError,
    isLoading,
    isSuccess: categoriesSuccess,
  } = useGetCategoriesQuery(params);

  const {
    data: productsData,
    isSuccess: productsDataSuccess,
    isLoading: catalogLoading,
    isFetching,
  } = useGetProductsQuery(params);

  const dispatch = useDispatch();
  const router = useRouter();

  const changeFilterName = () => {
    if (catalogFilters.alphabet === "asc") {
      setFilter("A-Z");
    }
    if (catalogFilters.alphabet === "desc") {
      setFilter("Z-A");
    }
  };

  useEffect(() => {
    if (router.query.category && router.query.category !== "") {
      dispatch(changeCatalogCategory(router.query.category));
    }
    if (router.query.sort) {
      dispatch(changeCatalogFiltersAlph(router.query.sort));
    }
  }, [router.isReady]);

  useEffect(() => {
    router.isReady &&
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...(catalogCategory !== "" && { category: catalogCategory }),
            sort: catalogFilters.alphabet,
          },
        },
        undefined,
        { shallow: true }
      );
  }, [catalogFilters, catalogCategory]);

  useEffect(() => {
    changeFilterName();
  }, [catalogFilters.alphabet]);

  return (
    <div className={css.container}>
      <div className={css.sideMenu}>
        <div className={css.list}>
          {categoriesSuccess &&
            categories.map((element) => (
              <label key={element.name} className={css.listItemSideMenu}>
                <input
                  type="radio"
                  name="productsType"
                  onChange={() => {
                    dispatch(changeCatalogCategory(element.link));
                  }}
                  checked={
                    decodeURI(catalogCategory) === element.name ||
                    (catalogCategory === "" && element.name === "all products")
                  }
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
                    dispatch(changeCatalogFiltersAlph("asc"));
                }}
              >
                A-Z
              </div>
              <div
                className={css.filterOption}
                onClick={() => {
                  setFilterAccordion(false),
                    dispatch(changeCatalogFiltersAlph("desc"));
                  router.push(
                    {
                      pathname: router.pathname,
                      query: {
                        category: catalogCategory,
                        sort: "desc",
                      },
                    },
                    undefined,
                    { shallow: true }
                  );
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
        <Products
          productsData={productsData}
          isFetching={isFetching}
          productsDataSuccess={productsDataSuccess}
        />
      </div>
    </div>
  );
}
