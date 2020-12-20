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
  background: #5383e8;
`;

const Navbar = styled.div`
  display: flex;
  height: 6vh;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #4171d6;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const GameTitle = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.35px;
  padding-left: 20px;
`;
