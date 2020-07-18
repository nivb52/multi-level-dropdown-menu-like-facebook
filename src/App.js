import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import profileImage from './icons/img_avatar2.png';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<BellIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  const NavItemRef = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    const domNode = NavItemRef.current;

    if (!domNode || !domNode.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <li className="nav-item" ref={NavItemRef}>
      <a href="#" className="icon-button" onClick={() => setIsOpen(!isOpen)}>
        {props.icon}
      </a>

      {isOpen && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState('auto');

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  /* item */
  function DropdownItem(props) {
    return (
      /*Todo: use navigation hook instead of href if user choose, ex. props[define_link] = {props.link}*/
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.leftImage && (
          <img
            src={props.leftImage}
            className="menu-item-avatar"
            style={props.leftImageStyle}
            alt="profile image"
          />
        )}

        {props.leftIcon && (
          <span className="icon-button">{props.leftIcon}</span>
        )}

        {props.children}

        {props.rightIcon && (
          <span className="icon-button">{props.rightIcon}</span>
        )}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        onEnter={calcHeight}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem leftImage={profileImage}> My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            // rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Go back</h2>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
