import { useDispatch, useSelector } from "react-redux";
import css from "../styles/pageStyles/finishedOrder.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/button/button";

export default function FinishedOrder() {
  const { lastOrderId } = useSelector(({ lastOrderId }) => lastOrderId);
  const router = useRouter();
  console.log("lastOrderId", lastOrderId);

  useEffect(() => {
    if (lastOrderId === "") {
      router.push("/catalog");
    }
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
        <div className={css.btn}>
          <Button // onSubmit={null}
            // isFetching={isLoading}
            // isDisabled={isLoading}
            width={"widthL"}
            // isWide={false}
            type={"submit"}
            onClick={() => {
              router.push("/catalog");
            }}
            text={"Back to shopping"}
            fontSize={"fontP"}
          />
        </div>
      </div>
    </div>
  );
}
