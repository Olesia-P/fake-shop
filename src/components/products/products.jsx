import { useState, React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// import { BiLoaderAlt } from 'react-icons/bi';
import { useAddProductToCartMutation } from '../../store/modules/local-api-slice';
import Button from '../button/button';
import { changeIsCartOpen } from '../../store/modules/openings-slice';
import { changeSearchResults } from '../../store/modules/mixed-purpose-slice';
import css from './products.module.scss';
import Loading from '../loading/loading';

export default function Products({
  productsData,
  isFetching,
  productsDataSuccess,
  productsError,
}) {
  const router = useRouter();
  const [addProductToCart] = useAddProductToCartMutation();
  const [specificProductLoading, setSpecificProductLoading] = useState(null);
  const [buttonDisabled, setButtondisabled] = useState(false);
  const { searchResults } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const [productsToRender, setProductsToRender] = useState([]);

  const dispatch = useDispatch();

  const addToCart = async (product) => {
    setSpecificProductLoading(product.id);
    setButtondisabled(true);
    const params = {
      userId,
      item: { info: product, quantity: 1 },
    };

    try {
      await addProductToCart(params); // Wait for the cart mutation to finish
      setSpecificProductLoading(null); // Reset loading product after the mutation is complete
      setButtondisabled(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'An error occurred while adding the product to the cart:',
        error,
      );
    }
  };

  const chooseDataForProducts = () => {
    if (productsDataSuccess && !isFetching) {
      if (searchResults.length !== 0) {
        setProductsToRender(searchResults);
      } else {
        setProductsToRender(productsData);
      }
    }
  };

  useEffect(() => {
    chooseDataForProducts();
    dispatch(changeSearchResults([]));
  }, [productsData]);

  useEffect(() => {
    chooseDataForProducts();
  }, [searchResults]);

  return (
    <div className={css.container}>
      {productsDataSuccess && !isFetching ? (
        productsToRender.map((element) => (
          <div key={element.id} className={css.productContainer}>
            <div
              className={css.img}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              <img src={element.image} alt={element.title} />
            </div>
            <div
              className={css.title}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              {element.title}
              {/* {element.title} */}
            </div>
            <div
              className={css.price}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              {element.price}$
            </div>
            <Button
              onClick={() => {
                addToCart(element);
              }}
              isFetching={specificProductLoading === element.id}
              isDisabled={buttonDisabled}
              width="widthM"
              fontSize="fontP"
              text="Add to cart"
            />
          </div>
        ))
      ) : (
        <div className={css.loadingWrap}>
          {isFetching && !productsError && <Loading />}
        </div>
      )}
      {productsError &&
      productsError.originalStatus.toString().startsWith('5') ? (
        <div className={css.errorWrap}>
          <div className={css.errorMessage}>Error: {productsError.error}</div>
          <div className={css.errorMessageSpecial}>
            I am using a free external api for this project
            (https://fakestoreapi.com/docs). Unfortunately it stops working from
            time to time and returns Internal Server Error instead of data.
          </div>
          <div className={css.errorMessageSpecial}>
            The api usually resumes work after a few minutes.
          </div>
          <div className={css.errorMessageSpecial}>
            I learned about its instability in a hard way, but hey, at least I
            learned how to handle the errors :) (and how relying on free API
            comes back at you)
          </div>
        </div>
      ) : (
        productsError && (
          <div className={css.errorWrap}>
            <div className={css.errorMessage}>Error: {productsError.error}</div>
          </div>
        )
      )}
    </div>
  );
}
