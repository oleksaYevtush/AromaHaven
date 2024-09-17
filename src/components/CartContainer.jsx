import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { actionType } from 'context/reducer';
import { useStateValue } from 'context/StateProvider';
import EmptyCart from '../img/emptyCart.png';
import CartItem from './CartItem';

import { motion } from 'framer-motion';

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    if (cartItems.length === 0) {
      setTot(0);
    }
     console.log(tot);

  }, [tot, flag, cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  const handleCheckout = () => {
    clearCart();
    setCheckoutMessage('Thank you for your order!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[375px] h-screen bg-[#151a1d] flex flex-col z-[101]"
    >
      <div className="flex items-center justify-between w-full p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-mainColor" />
        </motion.div>
        <p className="text-lg font-semibold text-mainColor">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          onClick={clearCart}
          className="flex items-center gap-[5px] p-1 px-2 my-2 text-base bg-[#cb57e085] rounded-md cursor-pointer hover:shadow-md text-[#c3c5c9]">
          Clear <RiRefreshFill />{' '}
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-[#151a1d] rounded-t-[2rem] flex flex-col justify-between items-center">
          <div className="flex flex-col w-full gap-2 px-6 overflow-y-scroll h-[270px] scrollbar-none">
          {cartItems &&
            cartItems.map((item, index) => (
              <CartItem key={item.id || index} item={item} setFlag={setFlag} flag={flag} />
            ))
            }
          </div>
          <div className="w-full flex-1 bg-[#3e1d3b] rounded-t-[2rem] flex flex-col items-center p-[16px]">
            <div className="flex items-center justify-between w-full">
              <p className="ml-[15px] text-lg sml:text-[14px] text-mainColor">Sub Total</p>
              <p className="mr-[15px] text-lg sml:text-[14px] text-mainColor">$ {tot.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="ml-[15px] text-lg sml:text-[14px] text-mainColor ">Delivery</p>
              <p className=" text-lg sml:text-[14px] text-mainColor mr-[20px]">$ 1.5</p>
            </div>
            <div className="w-full my-2 border-b border-mainColor"></div>
            <div className="flex items-center justify-between w-full">
              <p className="ml-[15px] text-xl sml:text-[14px] font-semibold text-mainColor">Total</p>
              <p className="text-xl sml:text-[14px] font-semibold text-mainColor mr-[15px]">
                $ {(tot + 2.5).toFixed(2)}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={handleCheckout}
                className="w-full p-2 my-2 text-lg rounded-full bg-[#cb57e085] text-gray-50 hover:shadow-lg sml:text-[14px]">
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={handleCheckout}
                className="w-full p-2 my-2 text-lg rounded-full bg-[#cb57e085] text-gray-50 hover:shadow-lg sml:text-[14px]">
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
          <img src={EmptyCart} className="w-[300px]" alt="" />
          {checkoutMessage ? (
            <p className="text-xl font-semibold text-[#cb57e085]">
              {checkoutMessage}
            </p>
          ) : (
            <p className="text-xl font-semibold text-[#cb57e085]">
              Add product to your cart
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
