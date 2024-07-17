import React, { useEffect, useState } from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useStateValue } from 'context/StateProvider';
import RowContainer from './RowContainer';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ aromaItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />
      <section
        className="relative w-full p-6 px-10 py-6 mt-16 md:px-16 lg:px-20 before:w-full before:left-0 before:top-0 before:bg-mainTextGrey before:content before:absolute after:w-full after:left-0 after:bottom-0 after:bg-mainTextGrey after:content after:absolute">
        <div className="flex flex-col items-center justify-between w-full h-full max-w-6xl px-4 mx-auto md:px-0">
          <p className="relative mb-12 text-2xl font-semibold transition-all duration-100 ease-in-out before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-hoverColor to-[#cb57e085] text-mainColor text-center">
            Best Selling &{' '}
            <span className="text-[#cb57e085]">Best Choice</span>
          </p>
          <div className="flex items-center justify-center w-full gap-3">
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
            data={aromaItems?.filter(n => n.category === 'gift')}
          />
        </div>
      </section>
      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
