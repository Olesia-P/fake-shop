import css from "../styles/pageStyles/catalog.module.scss";
import DropdownFilter from "../components/dropdownFilter/dropdownFilter";
import Products from "../components/products/products";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCatalogCategory,
  changeCatalogFiltersAlph,
  changeCatalogFiltersLimit,
} from "../store/modules/catalogSlice";

import { useRouter } from "next/router";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../store/modules/apiSlice";
import { changeLastOrderId } from "../store/modules/lastOrderIdSlice";

export default function Catalog() {
  const { catalogCategory, catalogFilters } = useSelector(
    ({ catalog }) => catalog
  );

  const params = {
    category: catalogCategory,
    filter: catalogFilters,
  };

  const { data: categories, isSuccess: categoriesSuccess } =
    useGetCategoriesQuery(params);

  const {
    data: productsData,
    isSuccess: productsDataSuccess,
    isFetching,
  } = useGetProductsQuery(params);

  const dispatch = useDispatch();
  const router = useRouter();

  const alphabetFilterOptionsList = [
    {
      name: "A-Z",
      onClickFunction: () => {
        setFilterAlphAccordion(false),
          dispatch(changeCatalogFiltersAlph("asc"));
      },
    },
    {
      name: "Z-A",
      onClickFunction: () => {
        setFilterAlphAccordion(false),
          dispatch(changeCatalogFiltersAlph("desc"));
      },
    },
  ];

  const alphabetFilterChosenOption = () => {
    if (catalogFilters.alphabet === "asc") {
      return "A-Z";
    }
    if (catalogFilters.alphabet === "desc") {
      return "Z-A";
    }
  };

  const limitFilterOptionsList = [
    {
      name: "5",
      onClickFunction: () => {
        setFilterLimitAccordion(false),
          dispatch(changeCatalogFiltersLimit("5"));
      },
    },
    {
      name: "10",
      onClickFunction: () => {
        setFilterLimitAccordion(false),
          dispatch(changeCatalogFiltersLimit("10"));
      },
    },
    {
      name: "20",
      onClickFunction: () => {
        setFilterLimitAccordion(false),
          dispatch(changeCatalogFiltersLimit("20"));
      },
    },
  ];

  const limitFilterChosenOption = () => {
    return catalogFilters.limit;
  };

  useEffect(() => {
    if (router.query.category && router.query.category !== "") {
      dispatch(changeCatalogCategory(router.query.category));
    }
    if (router.query.sort) {
      dispatch(changeCatalogFiltersAlph(router.query.sort));
    }
    if (router.query.limit) {
      dispatch(changeCatalogFiltersLimit(router.query.limit));
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
            limit: catalogFilters.limit,
          },
        },
        undefined,
        { shallow: true }
      );
  }, [catalogFilters, catalogCategory]);

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
        <div className={css.filters}>
          <DropdownFilter
            chosenOptionFunction={alphabetFilterChosenOption}
            optionsList={alphabetFilterOptionsList}
            filterName={"In order"}
          />
          <DropdownFilter
            chosenOptionFunction={limitFilterChosenOption}
            optionsList={limitFilterOptionsList}
            filterName={"Limit"}
          />
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
