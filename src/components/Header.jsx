import React, { useState, useEffect } from 'react';
import { MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Link as ReactLink } from 'react-scroll';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from 'context/StateProvider';
import { actionType } from 'context/reducer';
import { TbBasketHeart } from "react-icons/tb";
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';

const Header = () => {
  const location = useLocation();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const login = async () => {
    if (!user) {
      const result = await signInWithPopup(firebaseAuth, provider);
      const { refreshToken, providerData } = result.user;
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header
      className={`fixed z-50 w-screen p-3 px-10 shadow-lg md:px-16 lg:px-20 transition-all duration-300 ${isScrolled ? 'bg-[#471f578a]' : 'bg-transparent'}`}>
      <div className="items-center justify-between hidden w-full h-full max-w-6xl px-4 mx-auto md:flex md:px-0">
        <Link to={'/'} className="flex items-center gap-2 ">
          <img src={Logo} alt="logo" className="object-cover w-14" />
          <p className="text-lg font-bold text-mainColor">Aroma Haven</p>
        </Link>
        <div className="flex items-center gap-8 font-['BolkitRayek']">
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8">
            <Link
              to={'/'}
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-headingColor">
              Home
            </Link>
            <Link
              to={'/aboutUs'}
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-headingColor">
              About
            </Link>
            {location.pathname !== '/aboutUs' && (
                <ReactLink
                  to="menu"
                  spy={true}
                  smooth={true}
                  offset={-30}
                  duration={300}
                  className="text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-headingColor">
                  Menu
                </ReactLink>
              )}
          </motion.div>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}>
            <TbBasketHeart className={`text-3xl text-[#8C3BA0] `} />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-3 -right-3 bg-[#cb57e085]">
                <p className="text-xs font-semibold text-center text-mainColor">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user.photoURL : Avatar}
              alt="avatar"
              className="w-10 min-w-[50px] h-10  min-h-[50px] rounded-full drop-shadow-md cursor-pointer"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute right-0 w-40 rounded-lg shadow-xl bg-violet-50 flex-column top-12">
                <p
                  className="flex items-center px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer text-mainTextColor hover:bg-hoverColor hover:text-white "
                  onClick={logout}>
                  <MdLogout className="mr-4" /> Log out
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full h-full md:hidden">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}>
           <TbBasketHeart className={`text-3xl text-[#8C3BA0] `} />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-3 -right-3 bg-[#cb57e085]">
              <p className="text-xs font-semibold text-center text-white">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={'/'} className="flex items-center gap-2 drop-shadow-lg">
          <img src={Logo} alt="logo" className="object-cover w-14" />
          <p className="text-lg font-bold text-mainColor">Aroma</p>
        </Link>

        <div className="relative ">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user.photoURL : Avatar}
            alt="avatar"
            className="w-10 min-w-[40px] h-10  min-h-[40px] rounded-full drop-shadow-md cursor-pointer"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute right-0 w-40 rounded-lg shadow-xl bg-violet-50 flex-column top-12"
            >
              <div className="flex flex-col">
                <Link
                  to={'/'}
                  className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-white hover:bg-hoverColor"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </Link>
                <Link
                  to={'/aboutUs'}
                  className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-white hover:bg-hoverColor"
                  onClick={() => setIsMenu(false)}
                >
                  About us
                </Link>
                {location.pathname !== '/aboutUs' && (
                <ReactLink
                  to="menu"
                  spy={true}
                  smooth={true}
                  offset={-30}
                  duration={300}
                  className="text-base transition-all duration-100 ease-in-out cursor-pointer text-mainColor hover:text-headingColor">
                  Menu
                </ReactLink>
              )}
              </div>
              <p
                className="flex items-center justify-center p-2 m-2 text-base transition-all duration-100 ease-in-out bg-gray-200 rounded-md shadow-md cursor-pointer text-mainTextColor hover:bg-hoverColor hover:text-white"
                onClick={logout}
              >
                <MdLogout /> Log out
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
