import css from "./CountOrder.module.scss";
import { countOrderCost } from "../../../utils/functions";
import { useGetCartQuery } from "../../../store/modules/localApiSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeIsCartOpen } from "../../../store/modules/openingsSlice";
import Button from "../../button/button";

export default function CountOrder() {
  const dispatch = useDispatch();

  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetCartQuery();

  const router = useRouter();

  const sum = countOrderCost(localApiCartData);
  return (
    <>
      {localApiCartData?.length > 0 && (
        <div className={css.containerCount}>
          <div className={css.card}>
            <div className={css.receiptSum}>
              <div className={css.title}>Final cost</div>
              <div className={css.sum}>{sum}₴</div>
            </div>
            <div className={css.submitBtnContainer}>
              <Button
                clickHandler={() => {
                  router.push("/checkout"), dispatch(changeIsCartOpen(false));
                }}
                isFetching={false}
                isDisabled={false}
                fontSize={"fontP"}
                isWide={true}
                type={"button"}
                onSubmit={null}
                text={"Go to checkout"}
              />
            </div>
          </div>
        </div>
      )}
      {localApiCartData?.length === 0 && <p>Cart is empty!</p>}
    </>
  );
}
