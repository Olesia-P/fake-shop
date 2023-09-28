import { useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { BiLoaderAlt } from 'react-icons/bi';
import {
  usePostCartMutation,
  useGetCartQuery,
} from '../../store/modules/local-api-slice';
import Button from '../button/button';
import { changeIsCartOpen } from '../../store/modules/openings-slice';
import css from './products.module.scss';

export default function Products({
  productsData,
  isFetching,
  productsDataSuccess,
}) {
  const router = useRouter();
  const [postCart] = usePostCartMutation();
  const [specificProductLoading, setSpecificProductLoading] = useState(null);
  const [buttonDisabled, setButtondisabled] = useState(false);

  const { data: localApiCartData, isSuccess: localApiCartDataSuccess } =
    useGetCartQuery();

  const dispatch = useDispatch();

  const addToCart = async (product) => {
    setSpecificProductLoading(product.id);
    setButtondisabled(true);
    if (localApiCartDataSuccess) {
      const identicalObject = localApiCartData.find(
        (it) => it.product.id === product.id,
      );
      const finalQuantity =
        product.id === identicalObject?.product.id
          ? identicalObject.quantity + 1
          : 1;
      const params = { id: product.id, quantity: finalQuantity };

      try {
        await postCart(params); // Wait for the cart mutation to finish
        setSpecificProductLoading(null); // Reset loading product after the mutation is complete
        setButtondisabled(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'An error occurred while adding the product to the cart:',
          error,
        );
      }
    }
  };

  return (
    <div className={css.container}>
      {productsDataSuccess && !isFetching ? (
        productsData.map((element) => (
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
        <div>
          {isFetching && <BiLoaderAlt className={css.loadingGlobal} />}
          <div className={css.loadingCaption}>Loading...</div>
        </div>
      )}
    </div>
  );
}
