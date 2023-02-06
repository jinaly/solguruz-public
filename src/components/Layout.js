import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logoutAction } from "../redux/actions/user.action";
import { useDispatch } from "react-redux";
const { Header, Content, Sider } = Layout;

const items2 = [UserOutlined].map((icon) => {
  return {
    key: `sub`,
    icon: React.createElement(icon),
    label: `Artist`,
  };
});
const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();


  const onLogout = ()=>{
    dispatch(logoutAction());
  }

  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal">
        <div>
            <Button type="primary" htmlType="submit" onClick={onLogout}>
              Logout
            </Button>
        </div>
        </Menu>
      </Header>
      <Layout style={{ height: "100vh", maxHeight: "87vh", marginTop: "2rem" }}>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              maxHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
