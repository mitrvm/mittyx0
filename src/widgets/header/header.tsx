import { Layout, Menu, Flex, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const { Header: HeaderAntd } = Layout;

const headerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 6,
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const logoStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  objectFit: 'contain',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
};

export function Header() {
  const location = useLocation();
  return (
    <HeaderAntd style={headerStyle}>
      <Flex justify="space-between">
        <Flex style={logoContainerStyle}>
          <img
            className="logo-header"
            alt="logo"
            src="/assets/logo.svg"
            style={logoStyle}
          />
          <div style={titleStyle}>mittyx0</div>
        </Flex>
        <Flex>
          <Menu
            mode="horizontal"
            forceSubMenuRender
            disabledOverflow
            selectable={false}
            inlineCollapsed={false}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Menu.Item key="0">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  Главная
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  2
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  3
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  4
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  5
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                <Button
                  type={
                    location.pathname === pathKeys.dashboard.home.root()
                      ? 'primary'
                      : undefined
                  }
                >
                  6
                </Button>
              </Link>
            </Menu.Item>
          </Menu>
        </Flex>
      </Flex>
    </HeaderAntd>
  );
}
