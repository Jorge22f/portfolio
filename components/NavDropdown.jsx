export const NavDropdown = ({innerRef, scrollTo}) => {
  return (
    <div className="dropdown" ref={innerRef}>
      <div className="mx-5 text-xl font-bold">
        <button className="py-4 px-8" onClick={() => scrollTo('introduction')}>
          Introduction
        </button>
        <button className="py-4 px-8" onClick={() => scrollTo('connect')}>
          Connect
        </button>
      </div>
    </div>
  )
}
