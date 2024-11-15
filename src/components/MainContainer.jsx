import React, { useEffect, useState } from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useStateValue } from 'context/StateProvider';
import RowContainer from './RowContainer';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const [{ aromaItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [defaultCategory] = useState('gift');

  useEffect(() => {}, [scrollValue, cartShow]);

  const filteredItems = aromaItems?.filter(n => n.category === defaultCategory);

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />
      <section className="relative w-full p-6 px-10 py-6 mt-16 sm:px-4 sml:px-4 md:px-16 lg:px-20 before:w-full before:left-0 before:top-0 before:bg-textGrey before:content before:absolute after:w-full after:left-0 after:bottom-0 after:bg-textGrey after:content after:absolute">
        <div className="flex flex-col items-center justify-between w-full h-full max-w-6xl px-4 mx-auto md:px-0">
        <p className="relative mb-12 text-4xl md:text-[40px] sml:text-[23px] font-semibold transition-all duration-100 ease-in-out before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-hoverColor to-[#cb57e085] text-mainColor text-center hover:before:w-full hover:before:transition-all">
          Best Selling &{' '}
          <span className="text-[#cb57e085] md:text-[40px] sml:text-[23px]">Best Choice</span>
        </p>
          <div className="flex items-center justify-center w-full gap-3 sml:mb-[10px]">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out rounded-lg cursor-pointer bg-itemBg hover:bg-[#cb57e085] hover:shadow-lg"
              onClick={() => setScrollValue(-1200)}>
              <MdKeyboardDoubleArrowLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer bg-itemBg hover:bg-[#cb57e085] hover:shadow-lg"
              onClick={() => setScrollValue(1200)}>
              <MdKeyboardDoubleArrowRight className="text-lg text-white" />
            </motion.div>
          </div>
          <RowContainer
            scrollValue={scrollValue}
            flag={true}
            data={filteredItems}
          />
        </div>
      </section>
      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
