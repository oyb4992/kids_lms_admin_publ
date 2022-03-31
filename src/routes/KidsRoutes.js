import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPetSetting from "../pages/MyPetSetting";
import SampleTab from "../pages/SampleTab";
import Sidebar from "../components/sidebar/Sidebar";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import CurriculumOrg from "../pages/CurriculumOrg";
import Banners from "../pages/Banners";
import PetList from "../pages/PetList";
import CurriculumSetting from "../pages/CurriculumSetting";
import SampleInfo from "../pages/SampleInfo";
import Phrases from "../pages/Phrases";
const KidsRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<SampleTab />} />
          <Route path="/curr/org" element={<CurriculumOrg />} />
          <Route path="/curr/setting" element={<CurriculumSetting />} />
          <Route path="/pet/petlist" element={<PetList />} />
          <Route path="/pet/petsetting" element={<MyPetSetting />} />
          <Route path="/parents/banners" element={<Banners />} />
          <Route path="/phrase/setting" element={<Phrases />} />
          <Route path="/sample/info" element={<SampleInfo />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default KidsRoutes;
