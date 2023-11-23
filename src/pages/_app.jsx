import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
import IndexPage from '../components/layout/head/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <IndexPage />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
