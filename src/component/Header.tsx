import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <NavbarLayout>
      <Navbar>
        <NavbarLeft>
          <Link to={'/'}>
            {/* <GameLogo src={'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/leagueOfLegendIcon.png'} alt={'logo'} /> */}
            <GameTitle>KH.GG</GameTitle>
          </Link>
        </NavbarLeft>
      </Navbar>
    </NavbarLayout>
  );
};

export default Header;

const NavbarLayout = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 4;
  justify-content: center;
  padding: 0 1rem;
  background-color: skyblue;
`;

const Navbar = styled.div`
  display: flex;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavbarLeft = styled.div`
  display: flex;
  height: 100%;
`;

const BrandLogo = styled.img`
  width: 90px;
  height: 100%;
  margin-right: 2rem;
`;

const GameLogoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 8px 0px 12px;
  height: 100%;
`;

const GameLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const GameTitle = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.35px;
  line-height: 55px;
`;
const NavbarRight = styled.div``;

const LoginBtn = styled.button`
  //color: ${props => props.theme.redColor};
  color: #b1b7e5;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 15px;
  cursor: pointer;
`;
