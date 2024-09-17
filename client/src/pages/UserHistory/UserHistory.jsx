import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import TableTemplete from "../../components/Table/TableTemplete";

const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "calc(100vh - 70px)",
  position: "fixed",
  insetInlineStart: 0,
  background: "#111111",
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const menuStyle = {
  background: "#111111",
  color: "#ffffff",
  // make the selected item bg color red
};

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const UserHistory = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: { darkItemSelectedBg: "#8F3E97" },
        },
      }}
    >
      <Navbar isBlured={false} />
      <Layout hasSider>
        <Sider style={siderStyle} width={250}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            style={menuStyle}
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            marginInlineStart: 250,
            background: "black",
            // backgroundImage,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: "24px 16px 0",
              marginBottom: 16,
              overflow: "initial",
              background: "black",
              minHeight: "85vh",
            }}
          >
            <h1 className="text-3xl text-start pb-4 font-semibold text-white">
              User History
            </h1>
            <TableTemplete />
            {/* <div className="my-2 bg-white rounded-xl border-[2px] border-[#903e97a7] shadow-[0_0_15px_4px_rgba(143,62,151,0.5)]">
              <TableTemplete />
            </div> */}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default UserHistory;
