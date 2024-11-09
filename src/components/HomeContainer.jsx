import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../utils/data';
import CloudsVideo from '../img/video/clouds.mp4';
import HeroBg from '../img/44.jpg';

const HomeContainer = () => {
  return (
    <section
      className="w-full h-auto drop-shadow-xl"
      id="home"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="flex flex-col items-center justify-between w-full h-full px-4 mx-auto md:px-0 max-w-7xl">
        <div className='absolute bottom-0 left-0 overflow-hidden z-2 w-full mix-blend-screen mt-[-50vw] md:block hidden'>
          <video
            className={`w-full h-full object-cover border-none`}
            src={CloudsVideo}
            autoPlay
            muted
            loop
            preload="metadata"
          ></video>
        </div>
        <div className="grid w-full h-auto grid-cols-1 gap-6 p-6 px-10 py-4 md:min-h-screen md:grid-cols-1 md:gap-[5px] md:px-16 ">
          <div className="flex flex-col items-center flex-1 gap-4 py-2 mt-[90px] sml:mt-[70px]">
            <p className="font-['Mirra'] text-center font-medium lg:text-[50px] text-[30px] tracking-wider text-[#eedfe7d5] sm:text-[50px] md:text-[50px]">
              Expression through Aroma
              <span className="text-[#68337beb] text-[50px] lg:text-[50px] sml:text-[40px] font-bold sm:text-[50px] md:text-[50px]">
                Light
              </span>
            </p>
            <p className="font-['Mirra'] font-light text-textGrey text-center md:text-center md:w-[70%] sm:text-[50px] md:text-[50px]">
              Our goal is to make the world a better</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
