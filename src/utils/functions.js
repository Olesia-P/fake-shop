export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const countOrderCost = (cart) => {
  const initialValue = 0;
  const sum = cart?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    initialValue
  );
  const roundedSum = sum?.toFixed(2);

  return roundedSum;
};
export const countProductsQuantity = (cart) => {
  const initialValue = 0;
  const sum = cart?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    initialValue
  );

  return sum;
};
