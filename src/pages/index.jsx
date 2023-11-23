import React from 'react';
import css from '../styles/pageStyles/index.module.scss';

export default function Home() {
  const features = [
    'Navigate the catalog using filters (category, name, limit) or type the product’s name in the “search” field;',
    'Click on a product to read the full description;',
    'Add products to the cart. In the cart you can delete them, increase or decrease the amount (the final cost will be calculated accordingly);',
    'Click “Go to checkout”, fill in the delivery information and submit the order;',
    'The project has responsive layout (available for devices ranging from smartphones to large desktop screens);',
    'All UI components are custom-made.',
  ];

  const learned = [
    'Comprehensive processing of external API data;',
    'Building a small local Next.js API;',
    'Using Redux Toolkit for queries and data management;',
    'Implementing a simple search engine;',
    'Creating and managing URL hierarchy using React Router;',
    'Building input forms with thorough validation; ',
    'Configuring ESlint ruleset; ',
    'Implementing ‘Husky’ pre-commit check.',
  ];
  return (
    <div className={css.wrapper}>
      <div className={css.header}>Pet project: Fake-shop</div>

      <div className={css.container}>
        <div className={css.title}>Description</div>
        <div className={css.text}>
          This fake shop imitates real online shopping experience. You don’t
          pay, and you will never get your order, but all other things look and
          function quite the way they are supposed to.
        </div>
        <div className={css.text}>
          <strong>Product objects are received from the external API.</strong>
        </div>
        <div className={css.text}>
          <strong>
            Cart and order logic is implemented using custom-built local Next.js
            API.
          </strong>
        </div>
      </div>

      <div className={css.container}>
        <div className={css.title}>Features</div>
        <ul className={css.list}>
          {features.map((element) => (
            <li className={css.listItem} key={element}>
              {element}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.container}>
        <div className={css.title}>What did I learn?</div>
        <ul className={css.list}>
          {learned.map((element) => (
            <li className={css.listItem} key={element}>
              {element}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
