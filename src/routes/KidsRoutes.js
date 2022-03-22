import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPetSetting from "../pages/MyPetSetting";

import Pet from "../pages/Pet";
import SampleTab from "../pages/SampleTab";
import Sidebar from "../components/sidebar/Sidebar";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import CurriculumOrg from "../pages/CurriculumOrg";
import Banners from "../pages/Banners";
const KidsRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<SampleTab />} />
          <Route path="/curr/org" element={<CurriculumOrg />} />
          <Route path="/pet/petlist" element={<Pet />} />
          <Route path="/pet/petsetting" element={<MyPetSetting />} />
          <Route path="/parents/banners" element={<Banners />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default KidsRoutes;
