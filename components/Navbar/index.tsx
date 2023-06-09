import Image from "next/image";
import React, { useState } from "react";
import { useWindowSize } from "../../hooks";
import LogoImage from "../../public/assets/images/logo.png";
import { WindowSize } from "../../types";
import {
  CloseButtonContainer,
  CloseIcon,
  DropdownContainer,
  LogoContainer,
  MenuIcon,
  MenuLinkContainer,
  Nav,
  NavLinkContainer,
  OverlayMenu,
  WelcomeContainer,
} from "./NavElements";
import { Option } from "./DropdownMenu";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const size: WindowSize = useWindowSize();
  const [showMenu, setShowMenu] = useState(false);
  const [curTest, setCurTest] = useState("Welcome!");
  const { data: session } = useSession();

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  const onSelect = (option: Option) => {
    // console.log(option.label);
    setCurTest(option.value);
  };
  return (
    <Nav style={{ backgroundColor: "white" }}>
      <LogoContainer>
        <NavLink route="/">
          <Image src={LogoImage} alt="logo" width={80} height={50} />
        </NavLink>
      </LogoContainer>
      <DropdownContainer>
        <DropdownMenu
          options={[
            {
              label: "lightTest",
              value: "lightTest",
            },
            {
              label: "analogStalking",
              value: "analogStalking",
            },
            {
              label: "analogTracking",
              value: "analogTracking",
            },
            {
              label: "attention",
              value: "attention",
            },
            {
              label: "thinking",
              value: "thinking",
            },
            {
              label: "memory",
              value: "memory",
            },
            {
              label: "thePursuit",
              value: "thePursuit",
            },
            {
              label: "tracking",
              value: "tracking",
            },
            {
              label: "additionInTheMind",
              value: "additionInTheMind",
            },
            {
              label: "AdditionInTheMindSound",
              value: "AdditionInTheMindSound",
            },
            {
              label: "soundTest",
              value: "soundTest",
            },
            {
              label: "colorTest",
              value: "colorTest",
            },
          ]}
          onSelect={onSelect}
        />
      </DropdownContainer>
      <WelcomeContainer>{curTest}</WelcomeContainer>
      <NavLinkContainer>
        {size.width > 768 ? (
          <>
            <NavLink route="/">Home</NavLink>
            <NavLink route="/grade">Grade</NavLink>

            {session ? (
              <NavLink route="/profile">
                <BsFillPersonFill size={30} />
              </NavLink>
            ) : (
              <NavLink route="/login">Login</NavLink>
            )}
          </>
        ) : (
          <MenuIcon size={30} onClick={openMenu} />
        )}
      </NavLinkContainer>

      {showMenu && (
        <OverlayMenu>
          <CloseButtonContainer>
            <CloseIcon size={40} color={"white"} onClick={closeMenu} />
          </CloseButtonContainer>
          <MenuLinkContainer>
            <NavLink route="/" large color="white" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink route="/grade" large color="white" onClick={closeMenu}>
              grade
            </NavLink>
            <NavLink route="/login" large color="white" onClick={closeMenu}>
              Login
            </NavLink>
          </MenuLinkContainer>
        </OverlayMenu>
      )}
    </Nav>
  );
};

export default Navbar;
