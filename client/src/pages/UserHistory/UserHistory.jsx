import React from "react";
import {
  BarChartOutlined,
  UserOutlined,
  HistoryOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import TableTemplete from "../../components/Table/TableTemplete";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  paddingTop: "20px",
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

const menuItemStyle = {
  marginBottom: "15px", // Adjust as needed
};

const sliderData = [
  {
    icon: BarChartOutlined,
    lable: "User Dashboard",
  },
  {
    icon: HistoryOutlined,
    lable: "User History",
  },
  {
    icon: InboxOutlined,
    lable: "Past Reviews",
  },
  {
    icon: UserOutlined,
    lable: "User Profile",
  },
];

const items = sliderData.map((data, index) => ({
  key: String(index + 1),
  icon: React.createElement(data.icon),
  label: `${data.lable}`,
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
            items={items.map((item) => ({ ...item, style: menuItemStyle }))}
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
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default UserHistory;
