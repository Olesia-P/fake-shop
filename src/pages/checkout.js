/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import css from "../styles/pageStyles/checkout.module.scss";
import CheckoutInput from "../components/checkoutInput/checkoutInput";
import { useGetCartQuery } from "../store/modules/localApiSlice";
import { countProductsQuantity, countOrderCost } from "../utils/functions";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    deliveryAddress: "",
    phoneNumber: "",
    comment: "",
  });

  // const numbersPattern = /^[0-9]+[\-]*$/i;
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
      // ``,
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
  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetCartQuery();

  const productsQuantity = countProductsQuantity(localApiCartData);
  const total = countOrderCost(localApiCartData);

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
              <div key={element.product.id} className={css.product}>
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

          <button
            type="submit"
            className={css.submit}
            onSubmit={(event) => {
              event.preventDefault();
              {
                console.log("submitted");
              }
            }}
          >
            Place order
          </button>
        </div>
      </form>
    </>
  );
}