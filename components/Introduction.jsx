'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';

import IntroductionCard from './IntroductionCard';
import {useWindowSize} from '@utils/useWindowSize';

const ShowButton = ({less, showCount, updateShown}) => {
  return (
    <button
      type="button"
      className="outline_btn"
      onClick={() => updateShown(less)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_S3_URL}/images/arrow-up.png`}
        alt={`${less ? 'Less' : 'More'}1`}
        width={22}
        height={22}
        className={`mr-4 ${less ? '' : 'rotate-180'}`}
      />
      <span>Show {less ? 'Less' : 'More'}</span>
      <Image
        src={`${process.env.NEXT_PUBLIC_S3_URL}/images/arrow-up.png`}
        alt={`${less ? 'Less' : 'More'}2`}
        width={22}
        height={22}
        className={`ml-4 ${less ? '' : 'rotate-180'}`}
      />
    </button>
  )
}

export function Introduction(props) {
  const [introductions, setIntroductions] = useState([]);
  const [showCount, setShowCount] = useState(8);
  const size = useWindowSize();

  const updateShown = (less) => {
    if (!introductions.length) return;
    let imagesPerRow;
    switch (true) {
      case (size.width > 1179):
        imagesPerRow = 4;
        break;
      case (size.width > 899):
        imagesPerRow = 3;
        break;
      case (size.width > 639):
        imagesPerRow = 2;
        break;
      default:
        imagesPerRow = 2;
    }
    const newCount = showCount + (less ? -imagesPerRow : imagesPerRow);

    let newIntroductions = [];
    for (let i = 0; i < introductions.length; i++) {
      newIntroductions[i] = {...introductions[i], show: i < newCount};
    }
    setIntroductions(newIntroductions);
    setShowCount(newCount);

    let yOffset;
    switch (true) {
      case (size.width > 639):
        yOffset = 320;
        break;
      default:
        yOffset = 540;
    }
    window.scrollBy(0, less ? -yOffset : yOffset);
  }

  useEffect(() => {
    const fetchIntroductions = async () => {
      const response = await fetch('/api/introduction');
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        data[i] = {...data[i], show: i < showCount};
      }

      setIntroductions(data);
    }

    fetchIntroductions();
  }, []);

  return (
    <section className="introduction relative">
      <div
        id="introduction"
        className="absolute 2xl:top-14 xl:top-12 lg:top-10 md:top-7 sm:top-4 top-2"
      ></div>
      <div>
        <h1 className="head_text text-left">
          Introduction
        </h1>
      </div>
      <div className="w-full justify-start sm:mt-16">
        <p className="desc text-left">
          I'm a skilled Full Stack Web Developer with experience in multiple languages like HTML, CSS, Javascript, XML, PHP and more.
          I also have expertise in many frameworks and libraries like Next.js, React.js, Vue.js, Angular, Tailwind, Bootstrap, PhalconPHP and Laravel.
          I'm a quick learner and collaborate closely with teammates to create efficient, scalable, and user-friendly solutions that solve real-world problems.
        </p>
      </div>

      <div className="mt-16 flex flex-wrap gap-5 justify-center">
        {introductions.map((introduction) => (
          introduction.show && <IntroductionCard
            key={introduction._id}
            image={introduction.image}
            label={introduction.label}
          />
        ))}
      </div>

      <div className="flex flex-row justify-between gap-5 mt-8">
        {showCount > 8 &&
          <ShowButton less={true} showCount={showCount} updateShown={updateShown}/>
        }
        {showCount <= introductions.length &&
          <ShowButton less={false} showCount={showCount} updateShown={updateShown}/>
        }
      </div>
    </section>
  );
}
