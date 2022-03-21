import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPetSetting from "../pages/MyPetSetting";
import Pet from "../pages/Pet";
import SampleTab from "../pages/SampleTab";
import Sidebar from "../components/sidebar/Sidebar";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import CurriculumOrg from "../pages/CurriculumOrg";
const KidsRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<SampleTab />} />
          <Route path="/currorg" element={<CurriculumOrg />} />
          <Route path="/pet" element={<Pet />} />
          <Route path="/mypetsetting" element={<MyPetSetting />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default KidsRoutes;
