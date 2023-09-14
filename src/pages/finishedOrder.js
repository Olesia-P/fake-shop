import { useSelector } from "react-redux";
import css from "../styles/pageStyles/finishedOrder.module.scss";

export default function FinishedOrder() {
  const { lastOrderId } = useSelector(({ cart }) => cart);
  //   const existinglastOrderId = () => {
  //     if (lastOrderId) {
  //       return lastOrderId;
  //     }
  //   };
  console.log("lastOrderId", lastOrderId);
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
