import React from 'react';
// import { motion } from 'framer-motion';
import {
  BsFillTelephoneInboundFill,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
} from 'react-icons/bs';
import { MdMarkEmailRead } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-[#160c16]">
      <section
        className="relative w-full p-6 px-10 py-4 mt-8 mb-8 md:px-16 lg:px-20 before:w-full before:left-0 before:top-0 before:bg-mainTextGrey before:content before:absolute after:w-full after:left-0 after:bottom-0 after:bg-mainTextGrey after:content after:absolute ">
        <div className="flex flex-col items-center justify-between w-full h-full max-w-6xl px-4 mx-auto md:px-0">
          <div className="flex items-center justify-center w-full">
            <p className="relative mb-12 text-2xl font-semibold transition-all duration-100 ease-in-out before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-11 before:bg-gradient-to-br from-hoverColor to-[#cb57e085] text-mainColor">
              Our <span className="text-[#cb57e085] ">contacts</span>
            </p>
          </div>
          <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
            <div className="flex items-center justify-center w-full py-2 cursor-pointer group">
              <BsFillTelephoneInboundFill className="text-base md:text-lg text-mainColor group-hover:text-[#cb57e085]" />
              <p className="px-2 text-base md:text-lg text-mainColor group-hover:text-[#cb57e085]">
                +38 077 777 77 77{' '}
              </p>
            </div>
            <div className="flex items-center justify-center w-full py-2 cursor-pointer group">
              <MdMarkEmailRead className="text-base md:text-lg text-mainColor group-hover:text-[#cb57e085]" />
              <p className="px-2 text-base md:text-lg text-mainColor group-hover:text-[#cb57e085]">
                olexaevtushdev@gmail.com
              </p>
            </div>
            <div className="flex items-center justify-center w-full gap-4 py-2">
              <BsLinkedin className="text-lg transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-[#cb57e085]" />
              <BsFacebook className="text-lg transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-[#cb57e085]" />
              <BsInstagram className="text-lg transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-[#cb57e085]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
