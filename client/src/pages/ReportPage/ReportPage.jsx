import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  FileImageOutlined,
  FileTextOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Layout, Menu, ConfigProvider } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Overview from "./Sections/Overview";
import ImageAnalysis from "./Sections/ImageAnalysis";
import TextAnalysis from "./Sections/TextAnalysis";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  paddingTop: "20px",
  overflow: "auto",
  height: "calc(100vh - 70px)",
  position: "fixed",
  insetInlineStart: 0,
  background: "#000000",
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const menuStyle = {
  background: "#000000",
  color: "#ffffff",
};

const menuItemStyle = {
  marginBottom: "15px", // Adjust as needed
};

const sliderData = [
  {
    icon: DashboardOutlined,
    key: 1,
    label: "Overview",
  },
  {
    icon: FileImageOutlined,
    key: 2,
    label: "Image Analysis",
  },
  {
    icon: FileTextOutlined,
    key: 3,
    label: "Text Report",
  },
  {
    icon: InboxOutlined,
    key: 4,
    label: "Report Details",
  },
];

const items = sliderData.map((data, index) => ({
  key: String(index + 1),
  icon: React.createElement(data.icon),
  label: `${data.label}`,
}));

const ReportPage = ({ component }) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState("1"); // Default to "1" for Overview
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const { id } = useParams();

  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key);
  };

  const fetchReport = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reports/report/${id}`
      );
      await setReport(response.data);
    } catch (error) {
      toast.error("Failed to fetch report with id: " + id);
    } finally {
      setLoading(false); // Stop loading after data is fetched or failed
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

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
          <Menu
            theme="dark"
            mode="inline"
            style={menuStyle}
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            items={items.map((item) => ({ ...item, style: menuItemStyle }))}
          />
        </Sider>
        <Layout style={{ marginInlineStart: 250, background: "#212121" }}>
          <Header style={{ padding: 0 }} />
          <Content
            style={{
              margin: "24px 16px 0",
              marginBottom: 16,
              overflow: "initial",
              background: "#212121",
              minHeight: "85vh",
            }}
          >
            {selectedMenuKey === "1" && (
              <Overview report={report} loading={loading} />
            )}
            {selectedMenuKey === "2" && (
              <ImageAnalysis report={report} loading={loading} />
            )}
            {selectedMenuKey === "3" && (
              <TextAnalysis report={report} loading={loading} />
            )}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ReportPage;
