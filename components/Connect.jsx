'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';
import {useWindowSize} from '@utils/useWindowSize';

export function Connect() {
  const [wobble, setWobble] = useState(0);
  const [imageSize, setImageSize] = useState(256)
  const size = useWindowSize();

  useEffect(() => {
    if (wobble === 0) {
      let timeout = Math.random() * (8000 - 4000) + 4000;
      setTimeout(() => setWobble(1), timeout);
    }
  }, [wobble]);

  useEffect(() => {
    switch (true) {
      case (size.width < 800):
        setImageSize(256);
        break;
      default:
        setImageSize(512);
    }
  }, [size.width]);

  return (
    <section className="connect relative sm:px-10 px-5 bg-gray-100">
      <div
        id="connect"
        className="absolute 2xl:top-64 xl:top-32 lg:top-24 md:top-16 sm:top-13 top-2"
      ></div>
      <div className="my-32 w-full flex items-center justify-between">
        <div className="text-left">
          <h1 className="head_text">
            Lets Connect
          </h1>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/jorge-eslava-52730782/"
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL}/images/In-Blue-128.png`}
                alt="LinkedIn"
                className="mt-5 drop_shadow_on_hover"
                width={64}
                height={64}
              />
            </a>
            <a
              href="https://github.com/Jorge22f"
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL}/images/github.png`}
                alt="Github"
                className="mt-5 drop_shadow_on_hover"
                width={64}
                height={64}
              />
            </a>
          </div>
        </div>

        {size.width > 600 && <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/images/sms.png`}
          alt="Connect"
          width={imageSize}
          height={imageSize}
          draggable={false}
          loading="lazy"
          className="image_sm_wobble"
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
        />}
      </div>
    </section>
  );
}
