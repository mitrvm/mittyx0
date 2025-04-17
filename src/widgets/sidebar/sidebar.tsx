import { Layout, Menu, Flex, Switch, Button } from 'antd';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import {
  MoonFilled,
  SunFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  ContainerOutlined,
  AppstoreOutlined,
  TagsOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useTheme } from '~entities/contexts/theme-context';
import { useState, useEffect } from 'react';

const { Sider } = Layout;

// const logoContainerStyle: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
// };

// const logoStyle: React.CSSProperties = {
//   width: '32px',
//   height: '32px',
//   objectFit: 'contain',
// };

// const titleStyle: React.CSSProperties = {
//   fontSize: '28px',
// };

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const { isDarkTheme, toggleTheme } = useTheme();

  const siderStyle: React.CSSProperties = {
    backgroundColor: isDarkTheme ? 'black' : 'white',
    borderRadius: 6,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sider
      style={siderStyle}
      width={200}
      collapsed={collapsed}
      collapsible
      trigger={null}
      collapsedWidth={60}
    >
      <Flex vertical style={{ height: '100%' }} justify="space-between">
        <div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              margin: '16px',
              fontSize: '16px',
              width: 32,
              height: 32,
            }}
          />
          <Menu
            mode="vertical"
            forceSubMenuRender
            disabledOverflow
            selectable={false}
            style={{
              width: '100%',
              padding: '0 8px 16px',
            }}
          >
            <Menu.Item
              key="0"
              style={{ backgroundColor: '#67a654' }}
              icon={<ShoppingCartOutlined style={{ color: 'white' }} />}
            >
              <Link
                rel="noopener"
                to={pathKeys.dashboard.home.root()}
                style={{ color: 'white' }}
              >
                Список покупок
              </Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<ContainerOutlined />}>
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                Холодильник
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                Категории
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TagsOutlined />}>
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                Тэги
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              <Link rel="noopener" to={pathKeys.dashboard.home.root()}>
                Статистика
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <Flex
          vertical
          justify="center"
          align="center"
          style={{ padding: '0 20px 10px' }}
          gap="8"
        >
          <Switch
            style={{ minWidth: collapsed ? '40px' : '70px' }}
            checked={isDarkTheme}
            onChange={toggleTheme}
            checkedChildren={<SunFilled />}
            unCheckedChildren={<MoonFilled />}
          />
          {!collapsed && (
            <div style={{ color: 'gray', fontSize: '12px' }}>
              by mittyx0(front) & nipl(back)
            </div>
          )}
        </Flex>
      </Flex>
    </Sider>
  );
}
