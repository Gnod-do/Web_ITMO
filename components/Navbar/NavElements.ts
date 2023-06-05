import Link from 'next/link';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';

export const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25);
    height: 5vh;
    position: sticky;
    top: 0px;
    z-index: 10;

`;

// background: #1E1E1E;
export const LogoContainer = styled.div`
    padding-left: 1rem;
`;

export const NavLinkContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const WelcomeContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const DropdownContainer = styled.div`
    .dropdown-menu {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu__toggle {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #333;
        cursor: pointer;
        font-size: 16px;
        padding: 10px;
        width: 200px;
    }

    .dropdown-menu__toggle:hover {
        background-color: #f5f5f5;
    }

    .dropdown-menu__options {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        list-style: none;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 100%;
        width: 200px;
        z-index: 1;
    }

    .dropdown-menu__options li {
        cursor: pointer;
        font-size: 16px;
        padding: 10px;
    }

    .dropdown-menu__options li:hover {
        background-color: #f5f5f5;
    }
`;

export const NavLink = styled(Link)<{ large?: boolean }>`
    padding: 1rem;
    margin-left: 1rem;
    font-size: ${(props) => (props.large ? '1.5rem' : '1rem')};
    color: ${(props) => props.color || '#132424'};

    &:hover {
        color: #a6a2a2;
    }

    &.active {
        color: #03a062;
    }
`;

export const MenuIcon = styled(GiHamburgerMenu)`
    cursor: pointer;
    margin: 0 1rem;
`;

export const CloseIcon = styled(AiFillCloseCircle)`
    cursor: pointer;
`;

export const OverlayMenu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #132424;

    @media (min-width: 768px) {
        display: none;
    }
`;

export const MenuLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const CloseButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 1.5rem;
    position: absolute;
`;
