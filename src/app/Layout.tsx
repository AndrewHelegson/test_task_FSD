import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import Header from "~/widgets/header";
import Repo from "../entities/repo/ui/Repo";
import HomePage from "../pages/home/ui/HomePage";
import Results from "../pages/search/ui/Results";
import Footer from "../widgets/footer/ui/Footer";

export default function Layout1() {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={`/results/:value`} element={<Results />} />
          <Route path="/:id" element={<Repo />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}
