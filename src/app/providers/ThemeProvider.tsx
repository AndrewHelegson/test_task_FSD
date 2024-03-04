import { ConfigProvider } from "antd";
import Layout from "../Layout";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#232b45",
        },
      }}
    >
      <Layout />
    </ConfigProvider>
  );
}

export default App;
