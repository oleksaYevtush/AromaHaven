import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.png';
import { useStateValue } from 'context/StateProvider';
import { actionType } from 'context/reducer';
import { TbShoppingCartStar } from "react-icons/tb";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();
  const [clickedItems, setClickedItems] = useState([]);

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

    if (clickedItems.includes(newItem.id)) {
      setClickedItems(clickedItems.filter(id => id !== newItem.id));
    } else {
      setClickedItems([...clickedItems, newItem.id]);
    }
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div>
      <div
        ref={rowContainer}
        className={`w-full flex items-center gap-[20px] scroll-smooth ${
          flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
        }`}>
        {data && data.length > 0 ? (
          data.map(item => (
            <div
              key={item?.id}
              className="min-w-[220px] w-[275px] h-[235px] md:w-[300px] md:min-w-[300px] sxl:w-[245px] sxl:h-[205px] backdrop-blur-xl mt-10 lg:mt-[48px] mb-4 lg:mb-12 border-none rounded-lg p-2 cursor-pointer flex flex-col items-center justify-between bg-itemBg">
              <div className="flex items-center justify-between w-full ">
                <motion.img
                  whileHover={{ scale: 0.75 }}
                  src={item?.imageURL ? item.imageURL : NotFound}
                  alt="image"
                  className="w-[155px] h-[165px] sxl:w-[135px] sxl:h-[145px] -mt-12"
                />
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => addItems(item)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
                    clickedItems.includes(item.id) ? 'bg-[#452345]  shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]' : 'bg-[#cb57e085]'
                  } group`}>
                  <TbShoppingCartStar className={`text-2xl text-mainColor`} />
                </motion.div>
              </div>
              <div className="flex flex-col justify-end items-end w-full gap-[5px]">
                <p className="mt-1 text-[18px] lg:text-[16px] sml:text-[13px] sxl:text-[13px] tracking-wider text-[#ae76a2]">
                  {item?.base}
                </p>
                <p className="text-[20px] lg:text-[19px] sml:text-[15px] sxl:text-[15px] tracking-wider font-semibold text-mainColor sm:text-[12px] md:text-[12px]">
                  {item?.title}
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-[20px] font-semibold text-mainColor">
                    <span className="text-sm lg:text-[12px] text-mainColor">$</span> {item?.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full mb-12">
            <p className="my-10 text-xl font-semibold text-mainColor">Product Not Found</p>
            <img src={NotFound} alt="notFound" className="h-[340px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RowContainer;
