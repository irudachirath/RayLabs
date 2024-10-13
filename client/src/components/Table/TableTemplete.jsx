import React, { useEffect, useState } from "react";
import { Table, ConfigProvider } from "antd";
import qs from "qs";
import styles from "./TableTemplete.module.css";
import { Image } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const TableTemplete = () => {
  const userId = "VIFU4wZqem8HJd9bAIlc";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReportRemove = async (id, userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/reports/${id}`
      );
      toast.success("Report removed successfully");
      fetchData();
    } catch (error) {
      toast.error("Error removing report");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "timeStamp",
      // sorter: true,
      render: (ts) => `${new Date(ts).toLocaleString()}`,
      width: "20%",
    },
    // {
    //   title: "Time Created",
    //   dataIndex: "timeStamp",
    //   // sorter: true,
    //   render: (ts) => `${new Date(ts).toLocaleTimeString()}`,
    //   width: "20%",
    // },
    {
      title: "Last Accessed",
      dataIndex: "accessedTimeStamp",
      // sorter: true,
      render: (ts) => `${new Date(ts).toLocaleString()}`,
      width: "20%",
    },
    {
      title: "Images",
      dataIndex: "data",
      render: (data) => (
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {data.map((d, index) => (
            <span
              key={index}
              className="-mr-3 transition-all ease-in-out duration-300 hover:mr-3"
            >
              <Image
                style={{ borderRadius: "50%", border: "2px solid #cccccc" }}
                width={60}
                src={d.image_url}
              />
            </span>
          ))}
        </Image.PreviewGroup>
      ),
      width: "20%",
    },
    {
      title: "Report",
      dataIndex: "id",
      render: (id) => (
        <a
          href={`/report/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f7bbfc] hover:text-[#fcdeff]"
        >
          View <ExportOutlined />
        </a>
      ),
      width: "15%",
    },
    {
      title: "Remove",
      dataIndex: "id",
      render: (id) => (
        <div
          onClick={() => {
            handleReportRemove(id, userId);
          }}
          className="text-[#ff0000d1] hover:text-[#ffa1a1]"
        >
          <DeleteOutlined style={{ fontSize: "20px" }} />
        </div>
      ),
      width: "7%",
    },
  ];

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // fetch data from this http://localhost:5000/api/v1/reports/user/VIFU4wZqem8HJd9bAIlc
  const fetchData = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/reports/user/VIFU4wZqem8HJd9bAIlc?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200, // Mock total count
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: sorter.order,
      sortField: sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: "#151515", // Background color of the table
            headerColor: "#ffffff", // Text color in the table header
            colorText: "#ffffff", // Text color in the table
            borderColor: "#555555", // Border color of the table
            headerBorderRadius: "0px", // Border radius of the table header
            rowHoverBg: "#903e97a7",
          },
        },
      }}
    >
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={{
          pageSize: tableParams.pagination.pageSize,
          total: data.length,
          current: tableParams.pagination.current,
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          y: 420,
        }}
        style={{
          backgroundColor: "#000000", // Background color of the table container
        }}
        rowClassName={() => styles.customRow}
      />
    </ConfigProvider>
  );
};

export default TableTemplete;
