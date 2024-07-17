import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.png';
import { useStateValue } from 'context/StateProvider';
import { actionType } from 'context/reducer';
import { TbShoppingCartStar } from "react-icons/tb";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  const addItems = newItem => {
    const itemIndex = cartItems.findIndex(({ id }) => newItem.id === id);
    let updatedItems = [];
    if (itemIndex === -1) {
      updatedItems = [...cartItems, newItem];
    } else {
      const incrementedItem = {
        ...cartItems[itemIndex],
        qty: cartItems[itemIndex].qty + 1,
      };
      updatedItems = [...cartItems];
      updatedItems.splice(itemIndex, 1, incrementedItem);
    }
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedItems,
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-4 scroll-smooth ${
        flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
      }`}>
      {data && data.length > 0 ? (
        data.map(item => (
          <div
            key={item?.id}
            className="min-w-[120px] w-275 h-[230px] md:w-300 md:min-w-[300px] backdrop-blur-xl mt-8 lg:mt-8 mb-4 lg:mb-4 border-none rounded-lg p-4 cursor-pointer flex flex-col items-center justify-between bg-itemBg">
            <div className="flex items-center justify-between w-full ">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL ? item.imageURL : NotFound}
                alt="image"
                className="w-[147px] h-[165px] -mt-12"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => addItems(item)}
                className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-[#cb57e085] group">
                <TbShoppingCartStar className={`text-2xl text-mainColor `} />
              </motion.div>
            </div>
            <div className="flex flex-col items-end justify-end w-full gap-2">
              <p className="mt-1 text-[14px] tracking-wider text-[#ae76a2]">
                {item?.base}
              </p>
              <p className="text-[16px] tracking-wider font-semibold text-mainColor md:text-[18px] tracking-wider">
                {item?.title}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold text-mainColor">
                  <span className="text-sm text-mainColor">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full mb-12">
          <p className="my-10 text-xl font-semibold text-mainColor">Product Not Found</p>
          <img src={NotFound} alt="notFound" className="h-340" />
        </div>
      )}
    </div>
  );
};

export default RowContainer;
