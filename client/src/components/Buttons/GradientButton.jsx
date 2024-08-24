import React, { useContext } from "react";
import { Button, ConfigProvider } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";

const GradientButton = ({
  text,
  onClick,
  color1 = "#8F3E97",
  color2 = "#af4583",
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;
      overflow: hidden;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, ${color1}, ${color2});
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s ease-in-out;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.8;
      }
    }
  `;
  return (
    <ConfigProvider
      button={{
        className: linearGradientButton,
      }}
    >
      <Button
        onClick={onClick}
        type="primary"
        size="large"
        icon={<LoginOutlined />}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};
export default GradientButton;
