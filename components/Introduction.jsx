'use client';

import {useState, useEffect} from 'react';

import IntroductionCard from './IntroductionCard';

const IntroductionList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 flex flex-wrap gap-5 justify-center">
      {data.map((introduction) => (
        <IntroductionCard
          key={introduction._id}
          image={introduction.image}
          label={introduction.label}
        />
      ))}
    </div>
  )
}

export function Introduction(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchIntroductions = async () => {
      const response = await fetch('/api/introduction');
      const data = await response.json();

      setPosts(data);
    }

    fetchIntroductions();
  }, []);

  return (
    <section className="introduction relative">
      <div
        id="introduction"
        className="absolute 2xl:top-64 xl:top-32 lg:top-24 md:top-16 sm:top-13 top-2"
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
      <IntroductionList
        data={posts}
        handleTagLogic={() => {}}
      />
    </section>
  );
}
