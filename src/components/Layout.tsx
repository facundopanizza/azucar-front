import React from 'react';
import Nav from './Nav';

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};
export default Layout;
