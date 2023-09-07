'use client';

import Image from 'next/image';
import {useState} from 'react';

function IntroductionCard({image, label}) {
  const [wobble, setWobble] = useState(0);

  return (
    <div className="introduction_card shadow_on_hover">
      <div className="flex justify-center items-center py-4 sm:w-[260px] w-full sm:h-[300px] h-[250px] rounded-xl backdrop-blur-sm bg-[#ffffff0a] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/images/${image}`}
          alt={label}
          width={200}
          height={200}
          draggable={false}
          loading="lazy"
          className="w-full h-full object-contain image_md_wobble cursor-pointer"
          onClick={() => setWobble(1)}
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
        />

        <div className="absolute bottom-5">
          {label}
        </div>
      </div>
    </div>
  );
}

export default IntroductionCard;