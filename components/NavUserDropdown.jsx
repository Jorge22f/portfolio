import Link from 'next/link';
import {signOut} from "next-auth/react";

export const NavUserDropdown = ({setToggleDropdown}) => {
  return (
    <div className="dropdown">
      <Link
        href="/profile"
        className="dropdown_link"
        onClick={() => setToggleDropdown(false)}
      >
        My Profile
      </Link>
      <button
        type="button"
        onClick={() => {
          setToggleDropdown(false);
          signOut({callbackUrl: `${window.location.origin}/`});
        }}
        className="mt-5 w-full black_btn"
      >
        Sign Out
      </button>
    </div>
  )
}
