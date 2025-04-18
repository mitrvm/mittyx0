import { Layout, Menu, Flex, Switch, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import {
  MoonFilled,
  SunFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  ContainerOutlined,
  TagsOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useTheme } from '~entities/contexts/theme-context';
import { useSidebar } from '~entities/contexts/sidebar-context';

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
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();

  const siderStyle: React.CSSProperties = {
    backgroundColor: isDarkTheme ? '#141414' : 'white',
    borderRadius: 6,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
  };

  const getMenuItemStyle = (path: string) => ({
    backgroundColor: location.pathname === path ? '#67a654' : undefined,
  });

  const getLinkStyle = (path: string) => ({
    color: location.pathname === path ? 'white' : undefined,
  });

  const getIconStyle = (path: string) => ({
    color: location.pathname === path ? 'white' : undefined,
  });

  return (
    <Sider
      style={siderStyle}
      width={200}
      collapsed={isCollapsed}
      collapsible
      trigger={null}
      collapsedWidth={60}
    >
      <Flex vertical style={{ height: '100%' }} justify="space-between">
        <div>
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setIsCollapsed(!isCollapsed)}
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
              style={getMenuItemStyle(pathKeys.dashboard.home.root())}
              icon={
                <ShoppingCartOutlined
                  style={getIconStyle(pathKeys.dashboard.home.root())}
                />
              }
            >
              <Link
                rel="noopener"
                to={pathKeys.dashboard.home.root()}
                style={getLinkStyle(pathKeys.dashboard.home.root())}
              >
                Список покупок
              </Link>
            </Menu.Item>
            <Menu.Item
              key="1"
              style={getMenuItemStyle(pathKeys.dashboard.itemsAtHome.root())}
              icon={
                <ContainerOutlined
                  style={getIconStyle(pathKeys.dashboard.itemsAtHome.root())}
                />
              }
            >
              <Link
                rel="noopener"
                to={pathKeys.dashboard.itemsAtHome.root()}
                style={getLinkStyle(pathKeys.dashboard.itemsAtHome.root())}
              >
                Холодильник
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={getMenuItemStyle(
                pathKeys.dashboard.tagsAndCategories.root(),
              )}
              icon={
                <TagsOutlined
                  style={getIconStyle(
                    pathKeys.dashboard.tagsAndCategories.root(),
                  )}
                />
              }
            >
              <Link
                rel="noopener"
                to={pathKeys.dashboard.tagsAndCategories.root()}
              >
                Тэги, Категории
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              style={getMenuItemStyle(pathKeys.dashboard.stats.root())}
              icon={<BarChartOutlined />}
            >
              <Link rel="noopener" to={pathKeys.dashboard.stats.root()}>
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
            style={{ minWidth: isCollapsed ? '40px' : '70px' }}
            checked={isDarkTheme}
            onChange={toggleTheme}
            checkedChildren={<SunFilled />}
            unCheckedChildren={<MoonFilled />}
          />
          {!isCollapsed && (
            <div style={{ color: 'gray', fontSize: '12px' }}>
              by mittyx0(front) & nipl(back)
            </div>
          )}
        </Flex>
      </Flex>
    </Sider>
  );
}
