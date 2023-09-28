/* eslint-disable consistent-return */
import { useEffect, React } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCatalogCategory,
  // changeCatalogFiltersAlph,
  // changeCatalogFiltersLimit,
  changeCatalogFilters,
} from '../store/modules/catalog-slice';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../store/modules/api-slice';
import css from '../styles/pageStyles/catalog.module.scss';
import DropdownFilter from '../components/dropdown-filter/dropdown-filter';
import Products from '../components/products/products';
import { capitalizeFirstLetter } from '../utils/functions';

export default function Catalog() {
  const { catalogCategory, catalogFilters } = useSelector(
    ({ catalog }) => catalog,
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

  const alphabetFilterChosenOption = () => {
    if (catalogFilters.alphabet === 'asc') {
      return 'A-Z';
    }
    if (catalogFilters.alphabet === 'desc') {
      return 'Z-A';
    }
    // return '';
  };

  const handleFilterChange = (filterName, value) => {
    dispatch(changeCatalogFilters({ ...catalogFilters, [filterName]: value }));
  };

  const alphabetFilterOptionsList = [
    {
      // name: 'A-Z',
      // onClickFunction: () => {
      //   handleFilterChange('alphabet', 'asc');
      // },
      value: 'asc',
      render: 'A-Z',
    },
    {
      // name: 'Z-A',
      // onClickFunction: () => {
      //   dispatch(changeCatalogFilters('asc', catalogFilters.limit));
      // },
      value: 'desc',
      render: 'Z-A',
    },
  ];

  const limitFilterOptionsList = [
    {
      // name: '5',
      // onClickFunction: () => {
      //   dispatch(changeCatalogFiltersLimit('5'));
      // },
      value: '5',
      render: '5',
    },
    {
      // name: '10',
      // onClickFunction: () => {
      //   dispatch(changeCatalogFiltersLimit('10'));
      // },
      value: '10',
      render: '10',
    },
    {
      // name: '20',
      // onClickFunction: () => {
      //   dispatch(changeCatalogFiltersLimit('20'));
      // },
      value: '20',
      render: '20',
    },
  ];

  const limitFilterChosenOption = () => {
    return catalogFilters.limit;
  };

  useEffect(() => {
    if (router.query.category && router.query.category !== '') {
      dispatch(changeCatalogCategory(router.query.category));
    }
    if (router.query.sort) {
      handleFilterChange('alphabet', router.query.sort);
    }
    if (router.query.limit) {
      handleFilterChange('limit', router.query.limit);
    }
  }, [router.isReady]);

  useEffect(() => {
    router.isReady &&
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...(catalogCategory !== '' && { category: catalogCategory }),
            sort: catalogFilters.alphabet,
            limit: catalogFilters.limit,
          },
        },
        undefined,
        { shallow: true },
      );
  }, [catalogFilters, catalogCategory]);

  return (
    <div className={css.container}>
      <div className={css.sideMenu}>
        <div className={css.list}>
          {categoriesSuccess &&
            categories.map((element) => (
              <label
                htmlFor={`catalogRadioInput${element.name}`}
                key={element.name}
                className={css.listItemSideMenu}
              >
                <input
                  id={`catalogRadioInput${element.name}`}
                  type="radio"
                  name="productsType"
                  onChange={() => {
                    dispatch(changeCatalogCategory(element.link));
                  }}
                  checked={
                    decodeURI(catalogCategory) === element.name ||
                    (catalogCategory === '' && element.name === 'all products')
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
            filterTitle="In order"
            onClick={handleFilterChange}
            filterName="alphabet"
          />
          <DropdownFilter
            chosenOptionFunction={limitFilterChosenOption}
            optionsList={limitFilterOptionsList}
            filterTitle="Limit"
            onClick={handleFilterChange}
            filterName="limit"
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
