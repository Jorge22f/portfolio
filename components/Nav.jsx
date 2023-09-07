'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {signIn, useSession, getProviders} from 'next-auth/react';
import {useState, useEffect} from 'react';
import {NavDropdown} from '@components/NavDropdown';
import {NavUserDropdown} from '@components/NavUserDropdown';

function Nav(props) {
  const router = useRouter();
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);

  const navStyles = {
    opacity: 1,
    transform: 'translate(0, 0%, 0px)'
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  const scrollTo = (id) => {
    router.push(
      `/#${id}`,
      {scroll: true}
    );
  }

  return (
    <nav className="fixed flex-between w-full top-0 px-3 py-3 backdrop-blur-sm z-40"
         style={navStyles}>
      <Link href="/#home" className="flex gap-2 flex-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/images/profile.jpg`}
          alt="Logo"
          width={37}
          height={37}
          className="object-contain rounded-full mx-2"
        />
        <p className="logo_text">Jorge Eslava</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="mx-5 flex-center text-2xl font-bold">
          <button className="py-2 px-4" onClick={() => scrollTo('introduction')}>
            Introduction
          </button>
          <button className="py-2 px-4" onClick={() => scrollTo('connect')}>
            Connect
          </button>
        </div>

        {session?.user ? (
          <div className="flex flex-center gap-3 md:gap-5">
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (<NavUserDropdown
              setToggleDropdown={setToggleDropdown}
            />)}
          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id, {
                    callbackUrl: `${window.location.origin}/profile`
                  })}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex gap-4 relative">
        <Image
          src="/assets/icons/hamburger.png"
          alt="Hamburger"
          width={37}
          height={37}
          onClick={() => setNavDropdown((prev) => !prev)}
        />

        {navDropdown && (<NavDropdown
          scrollTo={scrollTo}
        />)}

        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (<NavUserDropdown
              setToggleDropdown={setToggleDropdown}
            />)}
          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id, {
                    callbackUrl: `${window.location.origin}/profile`
                  })}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;