import { FileDoneOutlined } from "@ant-design/icons";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const ViewReport = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <PrimaryButton className="rounded-md" icon={<FileDoneOutlined />} />
    </div>
  );
};

export default ViewReport;
