'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {Connect} from '@components/Connect';
import {Introduction} from '@components/Introduction';
import {useWindowSize} from '@utils/useWindowSize';

const Home = () => {
  const size = useWindowSize();
  const today = new Date();

  const scrollToTop = () => {
    window.scrollTo({top: 0,behavior: "smooth"});
  };

  const [showToTop, setShowToTop] = useState(0);

  const handleScroll = () => {
    setShowToTop(window.scrollY > 0 ? 1 : 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showToTop]);

  return (
    <section id="home" className="w-full flex-center flex-col sm:pt-32 pt-16">
      <div
        className="w-full home_layout flex items-center justify-around overflow-clip">
        <div className="w-full flex flex-center absolute">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/images/home-bg.jpg`}
            alt="Home"
            width={3456}
            height={2304}
            className="opacity-[75%] absolute z-0 bg-center mb-32 overflow-clip w-[100%] max-w-[2000px]"
          />
        </div>
        <div
          className="sm:mx-5 mx-2.5 sm:py-5 py-2.5 sm:px-10 px-5 z-10 bg-white bg-opacity-80 rounded-full"
        >
          <h1 className="head_text text-left">
            Hi! I'm
            <span className="orange_gradient text-left"> Jorge</span>
          </h1>
          <p className="home-desc">
            Software Engineer
          </p>
        </div>
        {size.width > 700 && <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/images/home.jpg`}
          alt="Home"
          width={554}
          height={455}
          className="object-contain rounded-full float-right w-1/2 sm:px-10 px-5 z-10 max-w-[554px]"
        />}
      </div>

      <Introduction/>
      <Connect/>

      <div className="footer">
        © Copyright {today.getFullYear()}. Made by Jorge Eslava
      </div>

      <button
        className={`to_top ${showToTop ? 'show_fade drop_shadow_on_hover' : 'hide_fade'}`}
        onClick={scrollToTop}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/images/arrow-up.png`}
          alt="To Top"
          width={64}
          height={64}
        />
      </button>
    </section>
  )
}

export default Home;
