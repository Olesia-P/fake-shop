import React from 'react';
import css from '../styles/pageStyles/index.module.scss';

export default function Home() {
  return (
    <div className={css.wrapper}>
      <div className={css.header}>Pet project: Fake Shop</div>

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
            API, that is connected to Mongo Database.
          </strong>
        </div>
      </div>

      <div className={css.container}>
        <div className={css.title}>Features</div>
        <ul className={css.list}>
          <li className={css.listItem}>
            <strong> Navigate the catalog</strong> using{' '}
            <strong>filters</strong> (category, name, limit) or type the
            product’s name in the <strong>“search” field</strong>;
          </li>
          <li className={css.listItem}>
            Click on a product to read the <strong>full description</strong>;
          </li>
          <li className={css.listItem}>
            <strong>Add products</strong> to the <strong>cart</strong>. In the
            cart you can{' '}
            <strong>delete them, increase or decrease the amount</strong> (the
            final <strong>cost will be calculated</strong> accordingly);
          </li>
          <li className={css.listItem}>
            Click “Go to checkout”,{' '}
            <strong>fill in the delivery information</strong> and{' '}
            <strong>submit the order</strong>;
          </li>
          <li className={css.listItem}>
            The project has <strong>responsive layout</strong> (available for
            devices ranging from <strong>smartphones to large desktop</strong>{' '}
            screens);
          </li>
          <li className={css.listItem}>
            All <strong>UI</strong> components are <strong>custom-made</strong>.
          </li>
        </ul>
      </div>

      <div className={css.container}>
        <div className={css.title}>What did I learn?</div>
        <ul className={css.list}>
          <li className={css.listItem}>
            <strong>Comprehensive</strong> processing of{' '}
            <strong>external API data</strong>;
          </li>
          <li className={css.listItem}>
            Building a <strong>local Next.js API</strong>, that is connected to{' '}
            <strong>MongoDB</strong>;
          </li>
          <li className={css.listItem}>
            Organizing the <strong>data exchange </strong>
            between <strong>the app </strong> and <strong>the database</strong>;
          </li>
          <li className={css.listItem}>
            Using <strong>Redux Toolkit</strong> for <strong>queries</strong>{' '}
            and <strong>data management</strong>;
          </li>
          <li className={css.listItem}>
            Implementing a simple <strong>search engine</strong>;
          </li>
          <li className={css.listItem}>
            Creating and managing{' '}
            <strong>URL hierarchy using Next Router</strong>;
          </li>
          <li className={css.listItem}>
            Implementing <strong>query-based catalog filtering</strong>;
          </li>
          <li className={css.listItem}>
            Building <strong>input forms</strong> with thorough{' '}
            <strong>validation</strong>;
          </li>
          <li className={css.listItem}>
            {' '}
            Configuring <strong>ESlint ruleset</strong>;
          </li>
          <li className={css.listItem}>
            Implementing <strong>‘Husky’ pre-commit check</strong>.
          </li>
          <li className={css.listItem}>
            Using <strong>cookies</strong>.
          </li>
        </ul>
      </div>
    </div>
  );
}
