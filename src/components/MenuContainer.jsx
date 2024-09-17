import React, { useState } from 'react';
import { useStateValue } from 'context/StateProvider';
import { RiCandleFill } from "react-icons/ri";
import { categories } from 'utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';

const MenuContainer = () => {
  const [filter, setFilter] = useState('candle');
  const [{ aromaItems }] = useStateValue();

  return (
    <section
      id="menu"
      className="w-full my-6 mb-0 p-6 px-10 md:mt-8 md:px-16 lg:px-20 py-4 sxl:py-2 drop-shadow-xl">
      <div className="flex flex-col w-full h-full justify-between px-4 md:px-0 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="relative items-center text-4xl font-semibold text-white transition-all duration-100 ease-in-out before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-hoverColor to-[#cb57e085]">
            FEATURED <span className="text-[#cb57e085]">PRODUCTS</span>
          </p>
          <div className="flex items-center justify-start w-full gap-6 sxl:gap-3 mt-12 mb-12 sxl:mb-3 overflow-x-scroll lg:justify-center scrollbar-none">
            {categories &&
              categories.map(category => (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  key={category.id}
                  onClick={() => setFilter(category.urlParamName)}
                  className={`group ${
                    filter === category.urlParamName
                      ? 'bg-[#cb57e085]'
                      : 'bg-itemBg'
                  } w-[150px] sml:w-[90px] sxl:w-[90px] h-28 sxl:h-[83px] cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center  hover:bg-[#cb57e085]`}>
                  <div
                    className={`w-10 h-10 rounded-full bg-[#cb57e085] shadow-lg group-hover:bg-itemBg flex items-center justify-center ${
                      filter === category.urlParamName
                        ? 'bg-itemBg'
                        : 'bg-[#cb57e085]'
                    }`}>
                    <RiCandleFill
                      className={` group-hover:text-[#cb57e085] text-xl  ${
                        filter === category.urlParamName
                          ? 'text-[#cb57e085]'
                          : 'text-white'}`}
                    />
                  </div>
                  <p
                    className={` group-hover:text-white text-base sml:text-[13px] sxl:text-[13px] ${
                      filter === category.urlParamName
                        ? 'text-white'
                        : 'text-mainColor'}`}>
                    {category.name}
                  </p>
                </motion.div>
              ))}
          </div>
          <div className="w-full">
            <RowContainer
              flag={false}
              data={aromaItems?.filter(n => n.category === filter)}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
