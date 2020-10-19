import React from 'react';
import Header from 'component/Header';

type MainLayoutTypes = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutTypes) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
