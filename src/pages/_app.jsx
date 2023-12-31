import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
import Meta from '../components/meta/meta';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Fake Shop</title>
        <Meta />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
