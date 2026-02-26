import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/layout";
import Index from "../pages";
import OfficeDetailsPage from "../pages/offices";
import IndexOffices from "../pages/indexOffices";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/offices" element={<IndexOffices />} />
        <Route path="/offices/:id" element={<OfficeDetailsPage />} />

      </Route>
    </Routes>
  );
}
