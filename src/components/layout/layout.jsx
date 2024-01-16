/* eslint-disable no-console */
import { React, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/navbar';
import MobileMenu from '../mobile-menu/mobile-menu';
import Footer from './footer/footer';
import css from './layout.module.scss';
import {
  changeLastOrderId,
  changeUserId,
  changeIsCartCreated,
  changeOrderId,
} from '../../store/modules/mixed-purpose-slice';
import { getCookie, setCookie } from '../../utils/cookie';
import { useCreateEmptyCartMutation } from '../../store/modules/local-api-slice';
import useMediaQuery from '../../hooks/use-media-query';

export default function Layout({ children }) {
  const [createEmptyCart] = useCreateEmptyCartMutation();
  const { isCartOpen } = useSelector(({ openings }) => openings);
  const isLowTablet = useMediaQuery(787);

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.path !== '/finished-order') {
      dispatch(changeLastOrderId(''));
    }
    if (router.path !== '/orders') {
      dispatch(changeOrderId(''));
    }
  }, [router.path]);

  useEffect(() => {
    const newUserId = (Math.random() * 100000000000).toFixed(0);
    const storedUserId = getCookie('userId');

    if (storedUserId) {
      console.log(`id was stored ${storedUserId}`);
      dispatch(changeUserId(storedUserId));
      createEmptyCart({ userId: storedUserId }).then(() => {
        dispatch(changeIsCartCreated(true));
      });
    }
    if (!storedUserId) {
      console.log('id was not stored');
      setCookie('userId', newUserId, 30);
      dispatch(changeUserId(newUserId));
      createEmptyCart({ userId: newUserId }).then(() => {
        dispatch(changeIsCartCreated(true));
      });
    }
  }, []);

  return (
    <>
      {isCartOpen && isLowTablet && (
        // eslint-disable-next-line react/no-unknown-property
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )}
      <Navbar />
      <MobileMenu />
      <div className={css.mainContent}>{children}</div>
      <Footer />
    </>
  );
}
