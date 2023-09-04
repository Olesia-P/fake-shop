/* eslint-disable jsx-a11y/alt-text */
import Button from "../components/button/button";
import { useEffect, useState } from "react";
import css from "../styles/pageStyles/checkout.module.scss";
import CheckoutInput from "../components/checkoutInput/checkoutInput";
import { useGetCartQuery } from "../store/modules/localApiSlice";
import { countProductsQuantity, countOrderCost } from "../utils/functions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { usePostOrderMutation } from "../store/modules/localApiSlice";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    deliveryAddress: "",
    phoneNumber: "",
    comment: "",
  });
  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetCartQuery();
  const { catalogFilters } = useSelector(({ catalog }) => catalog);
  const router = useRouter();

  const numberPattern = /^[0-9[\-\(\)\s+]]*$/;
  const mamePattern = /^[a-zA-Z.[\-]\s]*$/;
  const emailPattern = /^[a-zA-Z0-9.[_+\-]]+@[a-zA-Z0-9.[\-]]+\.[a-zA-Z]{2,}$/;

  const formFields = [
    {
      lable: "First name*",
      type: "text",
      state: formData.firstName,
      name: "firstName",
      required: true,
      errorMessage: "Use letters, hyphens, spaces and dots only.",
      pattern: `${mamePattern.source}`,
    },
    {
      lable: "Last name*",
      type: "text",
      state: formData.lastname,
      name: "lastname",
      required: true,
      errorMessage: "Use letters, hyphens, spaces and dots only.",
      pattern: `${mamePattern.source}`,
    },
    {
      lable: "Email*",
      type: "text",
      state: formData.email,
      name: "email",
      required: true,
      errorMessage: "Use a valid email.",
      pattern: `${emailPattern.source}`,
    },
    {
      lable: "Delivery address*",
      type: "text",
      state: formData.deliveryAddress,
      name: "deliveryAddress",
      required: true,
      errorMessage: "This field is required.",
    },
    {
      lable: "Phone number*",
      type: "text",
      state: formData.phoneNumber,
      name: "phoneNumber",
      required: true,
      errorMessage: "Use a valid phone number.",
      pattern: `${numberPattern.source}`,
    },
    {
      lable: "Comment",
      type: "text",
      state: formData.comment,
      name: "comment",
      required: false,
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const productsQuantity = countProductsQuantity(localApiCartData);
  const total = countOrderCost(localApiCartData);

  useEffect(() => {
    if (
      localApiCartData?.length === 0 ||
      localApiCartData?.length === undefined
    ) {
      router.push(`catalog/?sort=${catalogFilters.alphabet}`);
    }
  }, []);

  const [postOrder] = usePostOrderMutation();

  return (
    <>
      <div className={css.title}>Checkout</div>
      <form className={css.container}>
        {/*  */}
        <div className={css.orderForm}>
          <div className={css.personalInfoHeader}>Delivery information:</div>
          <div className={css.personalInfo}>
            {formFields.map((element) => (
              <div className={css.inputWrap} key={element.lable}>
                <CheckoutInput {...element} onChange={handleInputChange} />
              </div>
            ))}
          </div>
          <div className={css.productsList}>
            <div className={css.productListHeader}>In your order:</div>
            {localApiCartData?.map((element) => (
              <div
                key={element.product.id}
                className={css.product}
                onClick={() => router.push(`/products/${element.product.id}`)}
              >
                <div className={css.img}>
                  <img src={element.product.image} />
                </div>
                <div className={css.productName}>{element.product.title}</div>
                <div className={css.productInfo}>
                  <div className={css.counter}>
                    Quantity: {element.quantity}
                  </div>

                  <div className={css.price}>
                    Price: {element.product.price}$
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*  */}
        <div className={css.orderFinalInfo}>
          <div className={css.productsQuantity}>
            Products quantity: <strong>{productsQuantity}</strong>.
          </div>
          <div className={css.total}>
            Total: <strong>{total}$</strong>
          </div>

          <Button
            onSubmit={(event) => {
              event.preventDefault();

              const fullOrderInfo = {
                cart: localApiCartData,
                id: Date.now(),
                personalData: formData,
              };
              postOrder(fullOrderInfo);
            }}
            isFetching={false}
            isDisabled={false}
            width={"widthL"}
            wide={false}
            type={"sumbit"}
            onClick={null}
            text={"Submit order"}
            fontSize={"fontP"}
          />
        </div>
      </form>
    </>
  );
}
