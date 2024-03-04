import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/ui/HomePage";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Footer from "../widgets/footer/ui/Footer";
import Header from "../widgets/header/ui/Header";
import Results from "../pages/search/ui/Results";
import Repo from "../entities/repo/ui/Repo";

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
