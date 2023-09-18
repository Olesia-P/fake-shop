import { useDispatch, useSelector } from "react-redux";
import css from "../styles/pageStyles/finishedOrder.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePostCartMutation } from "../store/modules/localApiSlice";

export default function FinishedOrder() {
  // const dispatch = useDispatch();
  // const {
  //   data: localApiCartData,
  //   error,
  //   isError,
  //   isLoading,
  //   isSuccess,
  // } = useGetCartQuery();

  const [postCart] = usePostCartMutation();
  const { lastOrderId } = useSelector(({ lastOrderId }) => lastOrderId);
  const router = useRouter();

  useEffect(() => {
    postCart("clean-cart");
  }, []);
  return (
    <div className={css.container}>
      <div className={css.messageWrap}>
        <div className={css.message}>
          <div>Thank you for your order!</div>
          <div>Your order id: {lastOrderId} </div>
          <div>But we will never send it to you.</div>
          <div>It&apos;s a fake shop after all!</div>
        </div>
      </div>
    </div>
  );
}
