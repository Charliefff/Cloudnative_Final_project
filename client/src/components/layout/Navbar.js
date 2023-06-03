import { Menu, Search, Dropdown } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const onLogout = () => {
    logout(authDispatch);
  };

  return (
    <Menu style={{ backgroundColor: 'black', color: 'white' }}>
      <Menu.Menu position='left'>
        <Menu.Item as={Link} to='/' style={{ color: 'white' }}>
          共享文件
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Item
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
        }}
      >
        <h2> TSMC Document</h2>
      </Menu.Item>

      <Menu.Menu position='right'>
        {isAuthenticated ? (
          <>
            <Menu.Item as={Link} to='/new' style={{ color: 'white' }}>
              發表文章
            </Menu.Item>{' '}
            <Menu.Item as={Link} to='/deleteHistory' style={{ color: 'white' }}>
              歷史紀錄
            </Menu.Item>{' '}
            <Menu.Item as={Link} to='/userProfile' style={{ color: 'white' }}>
              使用者檔案
            </Menu.Item>{' '}
            <Dropdown item text={user && user.name} style={{ color: 'white' }}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={onLogout}
                  style={{ color: 'white' }}
                  as={Link}
                  to='/login'
                >
                  Logout
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to='/'>
                  Main page
                </Dropdown.Item>
                <Dropdown.Item>想到在加</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to='/login' style={{ color: 'white' }}>
              Sign in
            </Menu.Item>{' '}
            <Menu.Item as={Link} to='/register' style={{ color: 'white' }}>
              Register
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
