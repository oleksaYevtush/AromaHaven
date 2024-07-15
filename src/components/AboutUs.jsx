import React from 'react';
import HeroBg from '../img/444.jpg';

const AboutUs = () => {
  // useEffect(() => {
  //   // Set overflow to hidden when the component mounts
  //   document.body.style.overflow = 'hidden';

  //   // Cleanup: set overflow back to default when the component unmounts
  //   return () => {
  //     document.body.style.overflow = 'visible';
  //   };
  // }, []);
  return (
    <section
      className="w-full h-auto min-h-screen scroll-x-none"
      id="home"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="flex flex-col items-center justify-between w-full h-full px-4 mx-auto md:px-0 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 w-full min-h-screen h-auto mt-17 md:mt-[30px] p-6 px-10 md:px-16 py-4">
          <div className="flex flex-col items-start justify-start flex-1 gap-6 py-2 mt-16 xl:justify-center md:mt-18 xl:mt-0">
            <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-logoColor">
              <p className="text-base font-semibold text-center text-mainColor">
                Best choice
              </p>
            </div>
            <p className="lg:text-[4.0rem] text-[2.5rem] font-bold tracking-wide text-mainColor mb-[20px]">
                Expression through Aroma
              <span className="text-logoColor text-[3rem] lg:text-[4.5rem]">
                Light
              </span>
            </p>
          </div>
          <div className="relative flex items-center flex-1 lg:justify-center">
            <div
              className="flex flex-col items-center justify-center w-full p-2 md:p-6 md:w-510 rounded-2xl backdrop-filter backdrop-blur-md"
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(90, 72, 72, 0.3)',
                boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 15px',
              }}>
              <p className="font-['Qilona-Regular'] text-base text-[#fdfdfdbf] text-center md:text-center md:w-[80%]">
              Welcome to Aroma Haven, your sanctuary for holistic well-being and tranquility. Founded with a passion for natural wellness, we are dedicated to bringing you the finest aromatherapy products that nurture your mind, body, and spirit.From essential oils and diffusers to candles and bath salts, our range of products is designed to meet all your aromatherapy needs. <br></br>Whether you are looking to unwind after a long day, boost your energy, or create a soothing atmosphere at home, Aroma Haven has something for everyone. Our essential oils are 100% pure and free from synthetic additives, ensuring that you receive the most authentic aromatherapy experience.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
