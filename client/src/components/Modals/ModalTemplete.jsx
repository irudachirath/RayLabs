import React, { useState } from "react";
import { Modal } from "antd";
import GradientButton from "../Buttons/GradientButton";

const ModalTemplete = ({
  text,
  content,
  close = false,
  button = <GradientButton text={text} />,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (close) {
    setIsModalOpen(false);
  }
  return (
    <>
      <div onClick={showModal}>{button}</div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        closeIcon={null}
        width={450}
        styles={{
          content: { backgroundColor: "#1a1a1a" }, // turns the Modal red
        }}
      >
        {content}
      </Modal>
    </>
  );
};
export default ModalTemplete;
