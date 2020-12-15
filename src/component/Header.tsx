import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <NavbarLayout>
      <Navbar>
        <NavbarLeft>
          <Link to={'/'}>
            <BrandLogo src={'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/kaisa_logo_darknavy_text.svg'} alt={'logo'} />
          </Link>
          <GameLogoBox>
            <GameLogo src={'https://s3.ap-northeast-2.amazonaws.com/marcus.gg/leagueOfLegendIcon.png'} alt={'logo'} />
            <GameTitle>리그 오브 레전드</GameTitle>
          </GameLogoBox>
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
  color: ${props => props.theme.fontColor};
  font-size: 14px;
  letter-spacing: 0.35px;
  padding-top: 2px;
  margin-right: 8px;
  line-height: 1;
  visibility: visible;
  white-space: nowrap;
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
