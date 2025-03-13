import { Layout, Menu } from 'antd';
import { UnorderedListOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const { Header, Content, Sider } = Layout;

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 24px' }}>
        <div style={{ color: 'white', fontSize: '20px', width: '100%' }}>任务管理系统</div>
      </Header>
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: '#f5f5f5' }}
          trigger={null}
        >
          <div
            style={{
              padding: '16px',
              textAlign: 'right',
              borderBottom: '1px solid #e8e8e8',
              backgroundColor: '#f5f5f5'
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                style={{ fontSize: '16px', cursor: 'pointer' }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                style={{ fontSize: '16px', cursor: 'pointer' }}
              />
            )}
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0, background: '#f5f5f5' }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: <Link to="/">首页</Link>
              },
              {
                key: '2',
                icon: <UnorderedListOutlined />,
                label: <Link to="/todo">Todo 列表</Link>
              }
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              background: '#fff',
              width: '100%',
              height: '100%'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;