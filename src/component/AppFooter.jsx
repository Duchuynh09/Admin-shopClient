import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="#">+123123</Typography.Link>
      <Typography.Link href="#" target={"_blank"}>
        Some thing
      </Typography.Link>
      <Typography.Link href="#" target={"_blank"}>
        Some thing
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
